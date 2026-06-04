// src/pages/KongsvingerGuide.tsx
//
// Mix: parallax-hero + ord-for-ord stagger (Variant A v2) + border-l kortdesign (Variant D)
// Sticky-løsning: CategoryNav er standalone utenfor Section/Container for pålitelig sticky.
// Sticky kategori-header i venstre kolonne bruker plain <header> (ingen motion-wrapper).

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  UtensilsCrossed,
  Trees,
  Landmark,
  Compass,
  Bed,
  Star,
  type LucideIcon,
  Ticket,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { trackTicketClick } from "@/lib/analytics";
import { useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Attraction {
  name: string;
  desc: string;
  featured?: boolean;
  partner?: boolean;
}

interface Category {
  id: string;
  label: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  items: Attraction[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "mat",
    label: "Mat",
    title: "Mat og kaffe",
    intro:
      "Kortreist, sesongbasert og uten dikkedarer. Dette er stedene vi selv går til når vi ikke spiser i festningslandsbyen.",
    icon: UtensilsCrossed,
    items: [
      { name: "Skarstad gartneri", desc: "Familieeid, kortreist og sesongbasert." },
      { name: "ARV Kafferøsteri", desc: "Lokalt spesialkaffe-røsteri." },
      { name: "Ingelsruds konditori", desc: "Kafé og bakeri med hjemmelaget mat og bakst." },
      { name: "Tante Marie", desc: "Restaurant og kafé i sentrum. Hyggelig stemning." },
      { name: "Cafe Bohem", desc: "Kafé i Øvrebyen." },
      { name: "Drengen gårdsysteri", desc: "Gårdsysteri med lokalprodusert ost." },
      { name: "Brandval gartneri", desc: "Blomster, grønnsaker og planter." },
      { name: "Opaker gård (Grue)", desc: "Lokale produkter, godt dagsmål-utfluktsmål." },
      { name: "Peders kjøtt og fisk", desc: "Lokal kjøtt- og fiskehandler." },
      { name: "Palace Café", desc: "Kafé i sentrum." },
      { name: "Maistro", desc: "Restaurant i Kongsvinger." },
      { name: "Castrum", desc: "Restaurant." },
    ],
  },
  {
    id: "natur",
    label: "Natur",
    title: "Natur og friluftsliv",
    intro:
      "Skog, vann og vidde innenfor rimelig avstand. Velg en kort tur fra sentrum, eller bruk hele dagen ute på Finnskogen.",
    icon: Trees,
    items: [
      {
        name: "Liermoen",
        desc: "Kongsvingers mest brukte friluftsområde, 4 km fra sentrum. Merkede turstier, lysløyper, gratis parkering.",
      },
      { name: "Bæreia", desc: "Liten og vakker innsjø. Bademuligheter om sommeren." },
      { name: "Helgesjøen (Eidskog)", desc: "Større innsjø med bademuligheter." },
      { name: "Storsjøen", desc: "Odalens innlandshav. Øyer, båtliv og ro. Hold av en hel dag." },
      {
        name: "Finnskogen",
        desc: "Skog langs riksgrensen. Myrer, innsjøer og skogfinsk historie fra 1600-tallet. Finnskogleden er 240 km.",
        featured: true,
      },
      { name: "Kynna", desc: "Vassdrag på Finnskogen for kano og kajakkpadling." },
      { name: "Røgden", desc: "Innsjø ved riksgrensen. Fisking og naturopplevelser." },
      { name: "Ta en tur til Sverige", desc: "Magnor er 30 minutter unna." },
    ],
  },
  {
    id: "kultur",
    label: "Kultur",
    title: "Kultur og museer",
    intro:
      "Festning, fredet trehusbebyggelse og museer du ikke finner andre steder i Norge. Bruk en formiddag i Øvrebyen.",
    icon: Landmark,
    items: [
      {
        name: "Kongsvinger festning (1681)",
        desc: "Stjerneformet festning over Glomma. Panoramautsikt. Vi holder til her om sommeren.",
        featured: true,
      },
      {
        name: "Øvrebyen (fredet 1975)",
        desc: "Fargerike trehus fra 1700- og 1800-tallet. Kafeer, butikker og Dagny Juels barndomsvilla.",
      },
      {
        name: "Kvinnemuseet",
        desc: "Norges eneste museum viet til kvinners historie. Åpnet av dronning Sonja i 1995.",
      },
      {
        name: "Anno Museum",
        desc: "Fire museer: Kongsvinger museum, Kvinnemuseet, Odalstunet og Eidskog museum.",
      },
      { name: "Norsk skogfinsk museum (Svullrya)", desc: "Skogfinnenes historie i et eget museum." },
      { name: "Magnor glassverk (1896)", desc: "Glasshåndverk for hånd. Utsalg på stedet." },
      {
        name: "The Plus (Magnor)",
        desc: "Verdens mest miljøvennlige møbelfabrikk. Designet av BIG. 74 mål opplevelsespark.",
        featured: true,
      },
      { name: "Fredsmonumentet Morokulien", desc: "Grensemonument fra 1914. Start på Finnskogleden." },
      { name: "Vinger kirke", desc: "Fra 1600-tallet. «Klang under kuppelen»-konserter." },
      { name: "Rådhusteateret kino", desc: "300-seters kombinert rådhus og teater." },
    ],
  },
  {
    id: "aktiviteter",
    label: "Aktiviteter",
    title: "Aktiviteter",
    intro:
      "Litt for hele familien — fra klatrepark for de minste til padel og en av Norges mest prisbelønte golfbaner.",
    icon: Compass,
    items: [
      { name: "Gjesåsen klatrepark", desc: "5 løyper. Barneløype fra 2–3 år." },
      { name: "Finnskogen Spa (Finnskogtoppen)", desc: "Yoga, badstue og ro i skogen." },
      {
        name: "PAN Treetop Cabins (Åsnes)",
        desc: "Trekronehytter 8 m over bakken. En av regionens mest særegne overnattingsopplevelser.",
      },
      {
        name: "Grensen Experience",
        desc: "Rett på riksgrensen, utsikt over Røgden. Ulv, bjørn og elg i nærområdet.",
      },
      {
        name: "Maarud Gaard Opplevelser",
        desc: "70 000 mål skog. Kafe Huka åpner søndager: flesk og duppe, ostefondue, elgkarbonader.",
      },
      {
        name: "Nordfjeld Gjestegård og Golfklubb",
        desc: "Kåret til Norges beste golfbane 8 år på rad (World Golf Awards).",
      },
      { name: "Kongsvinger Padel", desc: "Padelbaner i sentrum." },
      { name: "Slobrua og Sanngrund", desc: "Natur langs Glomma." },
    ],
  },
  {
    id: "overnatting",
    label: "Overnatting",
    title: "Overnatting",
    intro:
      "Fra historisk hotell rett på festningsmurene til hytte 8 meter over bakken på Finnskogen.",
    icon: Bed,
    items: [
      {
        name: "Festningshotellet",
        desc: "Rett på festningsområdet med utsikt over Glomma og byen. Det mest historiske alternativet.",
        partner: true,
      },
      { name: "PAN Treetop Cabins", desc: "Sov i skogkronene." },
      { name: "Ingelsrud Gård", desc: "Stabbur, drengestue og lavvo." },
      { name: "Maarud Gaard", desc: "Lavvo og vanlige senger i skogen." },
      { name: "Minimaki", desc: "Hytter, telt og diverse." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hva kan man gjøre i Kongsvinger",
  description: "Anbefalte opplevelser, restauranter, natur og aktiviteter i Kongsvinger",
  url: "https://www.eventyrfestningen.no/hva-a-gjore-i-kongsvinger",
  itemListElement: [
    "Kongsvinger festning", "Øvrebyen", "Finnskogen", "Storsjøen",
    "Magnor Glassverk", "Kvinnemuseet", "Norsk skogfinsk museum",
    "Finnskogen Spa", "Kongsvinger Golf Club", "The Plus Magnor",
    "PAN Treetop Cabins", "Maarud Gaard Opplevelser", "Liermoen", "Grensen Experience",
  ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.eventyrfestningen.no" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Hva kan man gjøre i Kongsvinger",
      item: "https://www.eventyrfestningen.no/hva-a-gjore-i-kongsvinger",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Animation tokens
// ─────────────────────────────────────────────────────────────────────────────

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const wordRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: EASE_OUT } },
};

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedHero — parallax bakgrunn + parallax tekst + ord-for-ord stagger
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedHero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Bakgrunn: positiv y-offset kompenserer scrollens oppover-bevegelse → ser saktere ut
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  // Tekst: negativ y-offset forsterker scrollens oppover-bevegelse → ser raskere ut → dybde
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // Gradient-overlay fades inn for smooth overgang
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.92]);

  const titleWords = "Hva kan man gjøre i Kongsvinger".split(" ");

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44 text-white"
    >
      {/* Parallax bakgrunnsbilde */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: bgY }}
      >
        <img
          src="/media/festningslandsbyen1.jpg"
          alt="festningslandsbyen"
          // scale-[1.35]: gir rom til ±22% y-bevegelse uten blanke kanter
          className="h-full w-full scale-[1.35] object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradient-overlay — mørkner dynamisk på scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-cynical-900/30 via-cynical-900/50 to-cynical-900"
        style={reduced ? undefined : { opacity: overlayOpacity }}
      />

      {/* Tekst — parallax-lag over bakgrunnen */}
      <motion.div
        style={reduced ? undefined : { y: textY }}
        className="relative"
      >
        <Container size="lg">
          <motion.div
            variants={heroStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUpSubtle}
              className="eyebrow text-[0.7rem] sm:text-xs text-torch-300/90"
            >
              Reiseguide · Kongsvinger
            </motion.p>

            {/* Tittel — hvert ord klipper fra under */}
            <motion.h1
              variants={wordStagger}
              className="font-heading uppercase leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,1.2rem+2.8vw,3.75rem)] text-white mt-4"
              aria-label="Hva kan man gjøre i Kongsvinger"
            >
              {titleWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden align-baseline"
                >
                  <motion.span variants={wordRise} className="inline-block pr-[0.25em]">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUpSubtle}
              className="text-cynical-100/80 text-lg sm:text-xl leading-relaxed max-w-2xl mt-6"
            >
              Kongsvinger er litt over en times kjøring fra Oslo, men det føles lenger unna — på den
              gode måten. Festning, fredet trehusbebyggelse og skog inn til bykjernen. Vi
              holder til på Kongsvinger festning om sommeren og kjenner regionen godt.
            </motion.p>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedUnderline — SVG pathLength per seksjon
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedUnderline() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 120 6"
      preserveAspectRatio="none"
      className="mt-3 block h-[3px] w-20 text-torch-500"
    >
      <motion.path
        d="M0 3 H120"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.2 }}
      />
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AttractionRow — border-l-2 kortdesign (Variant D)
// ─────────────────────────────────────────────────────────────────────────────

function AttractionRow({ item }: { item: Attraction }) {
  return (
    <motion.li
      variants={fadeUp}
      className={cn(
        "group relative border-l-2 pl-4",
        "transition-[border-color] duration-200",
        item.featured || item.partner
          ? "border-gold-400/50 hover:border-gold-400"
          : "border-torch-500/30 hover:border-torch-500/70",
      )}
    >
      {item.featured && (
        <span className="eyebrow mb-1.5 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-gold-400/40 bg-gold-400/10 px-2 py-0.5 text-[0.65rem] text-gold-400">
          <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
          Anbefalt
        </span>
      )}
      {item.partner && !item.featured && (
        <span className="eyebrow mb-1.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold-400/40 bg-gold-400/10 px-2 py-0.5 text-[0.65rem] text-gold-400">
          Samarbeidspartner
        </span>
      )}
      <h3
        className={cn(
          "ui-text text-base font-semibold transition-colors duration-200 lg:text-lg",
          item.featured || item.partner
            ? "text-white group-hover:text-gold-300"
            : "text-white group-hover:text-torch-300",
        )}
      >
        {item.name}
      </h3>
      <p className="mt-0.5 text-sm leading-relaxed text-white/50">{item.desc}</p>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CategorySection — per-seksjon parallax på venstre header-kolonne
// ─────────────────────────────────────────────────────────────────────────────

function CategorySection({
  cat,
  motionProps,
}: {
  cat: Category;
  motionProps: object;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Introduksjonsikonet spinner litt på inngang
  const iconRotate = useTransform(scrollYProgress, [0, 0.3], [-8, 0]);
  const iconOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const featured = cat.items.filter((i) => i.featured || i.partner);
  const rest = cat.items.filter((i) => !i.featured && !i.partner);

  return (
    <section
      id={cat.id}
      ref={ref}
      // scroll-mt: header(72px) + buffer(16px) = 88px
      className="scroll-mt-[88px]"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">

        {/* ── Venstre: sticky tittel + intro ──────────────────────────────── */}
        {/*
          sticky på alle skjermstørrelser:
          – mobil: festes ved toppen, erstatter seg selv når neste seksjon ruller inn
          – md+: sticky i venstre kolonne (4/12) ved siden av scrollende kortliste
          Full-bleed bakgrunn på mobil via negative marginer som kansellerer Container-padding.
        */}
        <header className="sticky top-[72px] z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 bg-cynical-900/95 backdrop-blur-sm py-4 md:col-span-4 md:top-[88px] md:self-start md:mx-0 md:px-0 md:bg-transparent md:backdrop-blur-none md:py-0">
          <div>
            <div className="eyebrow mb-3 flex items-center gap-2 text-torch-400">
              <motion.span
                aria-hidden
                style={
                  reduced
                    ? undefined
                    : { rotate: iconRotate, opacity: iconOpacity }
                }
                className="inline-flex"
              >
                <cat.icon className="h-3.5 w-3.5" />
              </motion.span>
              <motion.span
                initial={reduced ? false : { opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {cat.label}
              </motion.span>
            </div>

            <motion.h2
              className="h2 text-white"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
            >
              {cat.title}
            </motion.h2>

            <AnimatedUnderline />

            <motion.p
              className="lead mt-4 text-white/65"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
            >
              {cat.intro}
            </motion.p>
          </div>
        </header>

        {/* ── Høyre: kortliste ────────────────────────────────────────────── */}
        <motion.div
          className="md:col-span-8"
          variants={stagger}
          {...motionProps}
        >
          <ul className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
            {[...featured, ...rest].map((item) => (
              <AttractionRow key={item.name} item={item} />
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function KongsvingerGuide() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const motionProps = useMemo(
    () =>
      reduced
        ? { initial: false, animate: "show" as const }
        : {
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: { once: true, margin: "-80px" },
          },
    [reduced],
  );

  // CTA-parallax
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaGlowOpacity = useTransform(ctaProgress, [0, 0.3, 0.75, 1], [0, 0.7, 0.7, 0]);
  const ctaGlowScale = useTransform(ctaProgress, [0, 0.5, 1], [0.6, 1.1, 0.8]);

  return (
    <>
      <SEOHead
        title="Hva kan man gjøre i Kongsvinger"
        description="Planlegger du tur til Kongsvinger? Tips fra oss som holder til her — mat, natur, kultur, aktiviteter og overnatting."
        url="https://www.eventyrfestningen.no/hva-a-gjore-i-kongsvinger"
        schema={[itemListSchema, breadcrumbSchema]}
      />

      {/* Parallax-hero */}
      <AnimatedHero />

      {/* ── Hoveddel ─────────────────────────────────────────────────────────── */}
      <Section background="cynical" paddingY="default">
        <Container size="lg">
          <div className="space-y-24 lg:space-y-32">
            {CATEGORIES.map((cat) => (
              <CategorySection
                key={cat.id}
                cat={cat}
                motionProps={motionProps}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA med parallax ─────────────────────────────────────────────────── */}
      <Section background="cynical" paddingY="default">
        <Container size="md">
          <div ref={ctaRef} className="relative isolate text-center">

            {/* Parallax glow — skalerer og fades scroll-drevet */}
            <motion.div
              aria-hidden
              style={
                reduced
                  ? undefined
                  : { opacity: ctaGlowOpacity, scale: ctaGlowScale }
              }
              className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
            >
              <div className="h-[420px] w-[680px] rounded-full bg-torch-500/25 blur-3xl" />
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="eyebrow mb-3 text-torch-400"
            >
              Og mens du er her
            </motion.p>

            <h2 className="h2 text-white">
              Eventyrfestningen
            </h2>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              className="lead mx-auto mt-5 max-w-2xl text-white/70"
            >
              I juli setter vi opp utendørs musikal på Kongsvinger festning.
              Festningslandsbyen åpner kl.&nbsp;20, forestillingen starter kl.&nbsp;22 —
              akkurat når kveldssola er borte og mørket legger seg over murene.
              Fra 5 år. 450 plasser per kveld.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
                        <Button
            size="lg"
            variant="gold"
            withShine
            asChild
          >
            <a
              href="https://eventyrfestningen.ticketco.events/no/nb"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTicketClick("hero_main", pathname)}
            >
              <Ticket className="mr-4 h-5 w-5 lg:h-6 lg:w-6" />
              Kjøp billetter
            </a>
          </Button>
              <Button variant="outline" size="md" asChild>
                <a href="/om-forestillingen">Les om forestillingen</a>
              </Button>
            </motion.div>

          </div>
        </Container>
      </Section>
    </>
  );
}
