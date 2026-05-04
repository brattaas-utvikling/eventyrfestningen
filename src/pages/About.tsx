// src/pages/About.tsx
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Timeline } from "@/components/sections/Timeline";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import type {
  Milestone,
  Person,
  PortableText as PortableTextValue,
  PortableText as PortableTextType,
} from "@/types/sanity";
import { SEOHead } from "@/components/SEOHead";
// import { CurtainSection } from "@/components/layout/CurtainSection";
import { useMemo } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { useScrollDepthTracking } from "@/lib/analytics";

// ---- Types ----
type Organization = {
  _id: string;
  title?: string;
  body?: PortableTextValue;
  volunteering?: PortableTextValue;
};

// ---- Lokal Portable Text-renderer ----
function RenderPortableText({ value }: { value?: PortableTextType }) {
  if (!value) return null;

  return (
    <>
      {value.map((block) => {
        if (block._type !== "block") return null;

        const text =
          block.children?.map((child) => child.text).join("") ?? "";

        switch (block.style) {
          case "h2":
            return (
              <h2
                key={block._key}
                className="h2 text-white mt-6 mb-3"
              >
                {text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={block._key}
                className="h3 text-white mt-5 mb-2"
              >
                {text}
              </h3>
            );
          default:
            return (
              <p
                key={block._key}
                className="lead text-white/70 mb-4"
              >
                {text}
              </p>
            );
        }
      })}
    </>
  );
}

export function About() {
  const { data: milestones, isLoading: milestonesLoading } =
    useSanityQuery<Milestone[]>("milestones", queries.milestones);

  const { data: boardMembers, isLoading: boardLoading } =
    useSanityQuery<Person[]>("board-members", queries.boardMembers);

  const { data: organization, isLoading: organizationLoading } =
    useSanityQuery<Organization>("organization", queries.organization);

    useScrollDepthTracking("om-oss");

  // Filter for kun styremedlemmer
  const filteredBoardMembers = useMemo(() => {
    if (!boardMembers) return [];
    
    return boardMembers.filter((member) => {
      if (!member.role) return false;
      
      const roleLower = member.role.toLowerCase();
      
      // Sjekk om rollen inneholder "styre" eller er en av de spesifikke rollene
      return (
        roleLower.includes("styre") ||
        roleLower.includes("nestleder") ||
        roleLower.includes("kontaktperson") ||
        roleLower.includes("styreleder") ||
        roleLower.includes("styremedlem") ||
        roleLower.includes("dagligleder") ||
        roleLower.includes("daglig leder")
      );
    });
  }, [boardMembers]);

  return (
    <>
      <SEOHead
        title="Om oss"
        description="Lær om Eventyrfestningen - vår historie, visjon og de menneskene som gjør magien mulig."
      />


<PageHero
        eyebrow="Om foreningen"
        title="Vår historie"
        subtitle="Fra en liten gruppe entusiaster samlet i Kongsvinger til å øke ambisjonene og skape store familieforestillinger for hele Kongsvingerregionen. Dette er historien om hvordan vi bringer liv til Kongsvinger Festning."
        backgroundImageUrl="/assets/landing/plakat_bakgrunn.png"
        backgroundImageAlt="Kongsvinger festning i kveldssol"
        align="left"
      />


      {/* Om foreningen / frivillighet – sentrert tekst + polaroid-bilder */}
      <Section background="cynical">
        <Container>
        {organizationLoading ? (
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-5/6 mx-auto" />
          </div>
        ) : organization ? (
          <div className="relative max-w-4xl mx-auto">
            {/* SECTION LABEL */}
            <p className="eyebrow text-torch-300/80 text-xs text-center mb-3">
              Foreningen & frivilligheten
            </p>

            {/* OM FORENINGEN */}
            <div className="relative mb-20">
              {/* Sentrert tittel */}
              <div className="text-center mb-8">
                <h2 className="h2 text-white">
                  {organization.title ?? "Om Eventyrfestningen"}
                </h2>
              </div>

              {/* Venstrestilt tekst, sentrert på skjermen */}
              <div className="max-w-2xl mx-auto">
                {organization.body ? (
                  <div className="prose prose-lg prose-invert max-w-none">
                    <RenderPortableText value={organization.body} />
                  </div>
                ) : (
                  <p className="lead text-white/70">
                    Eventyrfestningen er en frivillig teaterforening som
                    skaper familieforestillinger på Kongsvinger Festning.
                  </p>
                )}

                {/* MOBIL: Horisontal scroll-galleri */}
                <div className="mt-8 md:hidden">
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
                    {[
                      { src: "/media/festningslandsbyen1.jpg", caption: "Sommerkveld i Festningslandsbyen" },
                      { src: "/media/frivillig3.jpg", caption: "Frivillige i sving" },
                      { src: "/media/frivillig2.jpg", caption: "Moro bak kulissene" }
                    ].map((img, index) => (
                      <div 
                        key={index} 
                        className="shrink-0 w-[70vw] max-w-[280px] snap-center"
                      >
                        <div 
                          className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105" 
                          style={{ rotate: `${[-2, 2, -1][index]}deg` }}
                        >
                          <div className="aspect-4/5">
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="w-full h-full object-cover sepia-[0.15] brightness-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="px-4 py-3">
                            <p className="text-xs font-sans text-cynical-900 tracking-wide">
                              {img.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gold-300/70 text-center mt-2">
                    Sveip for å se flere bilder
                  </p>
                </div>
              </div>

              {/* DESKTOP: Polaroid-bilder rundt OM FORENINGEN */}
              <div className="pointer-events-none hidden md:block">
                {/* Høyre øverst */}
                <div className="absolute -right-24 top-3/12 w-40 lg:w-48 rotate-10">
                  <div className="bg-white rounded-[18px] shadow-xl border border-cynical-100 overflow-hidden">
                    <div className="aspect-4/5 bg-cynical-900/5">
                      <img
                        src="/media/festningslandsbyen1.jpg"
                        alt="Stemning på festningen"
                        className="w-full h-full object-cover sepia-50 brightness-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-sans text-cynical-900 tracking-wide">
                        Sommerkveld i Festningslandsbyen
                      </p>
                    </div>
                  </div>
                </div>

                {/* Høyre litt lenger ned */}
                <div className="absolute -right-32 top-9/12 w-36 lg:w-44 rotate-25">
                  <div className="bg-white rounded-[18px] shadow-xl border border-cynical-100 overflow-hidden">
                    <div className="aspect-4/5 bg-cynical-900/5">
                      <img
                        src="/media/frivillig3.jpg"
                        alt="Frivillige i arbeid"
                        className="w-full h-full object-cover sepia-50 brightness-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-sans text-cynical-900 tracking-wide">
                        Frivillige i sving
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venstre */}
                <div className="absolute -left-28 top-5/12 w-40 lg:w-48 -rotate-12">
                  <div className="bg-white rounded-[18px] shadow-xl border border-cynical-100 overflow-hidden">
                    <div className="aspect-4/5 bg-cynical-900/5">
                      <img
                        src="/media/frivillig2.jpg"
                        alt="Bak kulissene"
                        className="w-full h-full object-cover sepia-50 brightness-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-sans text-cynical-900 tracking-wide">
                        Moro bak kulissene
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FRIVILLIGHET */}
            <div className="relative mt-16">
              {/* Sentrert tittel */}
              <div className="text-center mb-8">
                <h2 className="h2 text-white">
                  Frivillighet
                </h2>
              </div>

              {/* Venstrestilt tekst, sentrert på skjermen */}
              <div className="max-w-2xl mx-auto">
                {organization.volunteering ? (
                  <div className="prose prose-lg prose-invert max-w-none">
                    <RenderPortableText value={organization.volunteering} />
                  </div>
                ) : (
                  <p className="lead text-white/70">
                    Vi er avhengige av frivillige for å skape magiske
                    teateropplevelser. Enten du vil stå på scenen, jobbe bak
                    kulissene eller bidra praktisk, finnes det en plass til deg.
                  </p>
                )}

                {/* MOBIL: Horisontal scroll-galleri */}
                <div className="mt-8 md:hidden">
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
                    {[
                      { src: "/media/frivillig1.jpg", caption: "Publikumsvert på jobb" },
                      { src: "/media/festningslandsbyen2.jpg", caption: "Festningslandsbyen" }
                    ].map((img, index) => (
                      <div 
                        key={index} 
                        className="shrink-0 w-[70vw] max-w-[280px] snap-center"
                      >
                        <div 
                          className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105" 
                          style={{ rotate: `${[2, -2][index]}deg` }}
                        >
                          <div className="aspect-4/5">
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="w-full h-full object-cover sepia-[0.15] brightness-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="px-4 py-3">
                            <p className="text-xs font-sans text-cynical-900 tracking-wide">
                              {img.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gold-300/70 text-center mt-2">
                    Sveip for å se flere bilder
                  </p>
                </div>

                {/* Sentrert CTA-knapp */}
                <div className="mt-8 text-center">
                  <Button variant="outline" size="md" asChild>
                    <a href="/kontakt">Jeg vil bidra</a>
                  </Button>
                </div>
              </div>

              {/* DESKTOP: Polaroid-bilder rundt FRIVILLIGHET */}
              <div className="pointer-events-none hidden md:block">
                {/* Venstre nederst */}
                <div className="absolute -left-24 top-14 w-36 lg:w-44 rotate-14">
                  <div className="bg-white rounded-[18px] shadow-xl border border-cynical-100 overflow-hidden">
                    <div className="aspect-4/5 bg-cynical-900/5">
                      <img
                        src="/media/frivillig1.jpg"
                        alt="Publikumsvert"
                        className="w-full h-full object-cover sepia-50 brightness-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-sans text-cynical-900 tracking-wide">
                        Publikumsvert på jobb
                      </p>
                    </div>
                  </div>
                </div>

                {/* Høyre nederst */}
                <div className="absolute -right-24 top-32 w-40 lg:w-48 rotate-[-18deg]">
                  <div className="bg-white rounded-[18px] shadow-xl border border-cynical-100 overflow-hidden">
                    <div className="aspect-4/5 bg-cynical-900/5">
                      <img
                        src="/media/festningslandsbyen2.jpg"
                        alt="Kostymer og rekvisitter"
                        className="w-full h-full object-cover sepia-50 brightness-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-sans text-cynical-900 tracking-wide">
                        Festningslandsbyen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        </Container>
      </Section>

      {/* Timeline */}
      {milestonesLoading ? (
        <section>
          <Container>
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </Container>
        </section>
      ) : milestones && milestones.length > 0 ? (
        <Section
          id="timeline"
          background="paper"
          paddingY="none"
        >
          <Timeline milestones={milestones} />
        </Section>
      ) : null}

      {/* Board Members - KUN STYRET */}
      {boardLoading ? (
        <Section background="white">
          <Container>
            <Skeleton className="h-12 w-64 mb-12 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : filteredBoardMembers.length > 0 ? (
        <Section background="white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="h2 text-cynical-900 mb-4">
                Styret
              </h2>
              <p className="lead text-cynical-700">
                Møt menneskene som leder foreningen
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
  {filteredBoardMembers.map((member) => {
    const imageUrl =
      member.image?.asset
        ? urlFor(member.image).width(400).height(533).url()
        : null;

    const initials =
      member.name
        ?.split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("") ?? "";

    return (
      <div key={member._id} className="group">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
          <div className="aspect-3/4 overflow-hidden bg-linear-to-br from-cynical-900 to-burgundy-900">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-100 brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/30">
                  <span className="ui-text font-semibold text-white text-2xl">
                    {initials}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 text-center">
            <h3 className="ui-text font-semibold text-cynical-900">
              {member.name}
            </h3>
            {member.role ? (
              <p className="ui-text text-cynical-600">
                {member.role}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  })}
</div>

          </Container>
        </Section>
      ) : null}
    <Section background="cynical">
      <Container>
        {/* Dekorativ linje øverst */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-10 sm:mb-14" />

        <div className="relative text-center max-w-xl mx-auto space-y-5">
          {/* Ambient glow */}
          <div
            className="absolute inset-x-[15%] top-0 h-16 bg-gold-500/8 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] text-white leading-[1.1] tracking-[-0.01em]">
          Vil du være med?
          </h2>

          <p className="text-cynical-200/75 text-base leading-relaxed">
          Vi trenger alltid frivillige, sponsorer og medspillere. Ta gjerne kontakt for å vite mer hva du kan bidra med!
          </p>

          <div className="pt-2">
            <Button variant="gold" size="lg" asChild>
              <a href="/kontakt">Ta kontakt</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}