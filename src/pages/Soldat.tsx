// src/pages/Soldat.tsx
// ─── Versjon 6: V3-hero + scroll-expansion (scrollY-drevet) + Bento grid ──────
// Hero: «1814» bakgrunn, V3 editorial typografi.
// Bildet fader inn og ekspanderer i løpet av de første ~350px scroll.
// Story: V3 ord-for-ord reveal.
// Bunn: asymmetrisk bento-grid med 12 bilder.

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { ImageLightbox } from '@/components/features/ImageLightbox';

// ─── Bildeimporter ────────────────────────────────────────────────────────────
import imgHero        from '@/assets/soldat/kreb-klara-dans.webp';
import imgKrebbarna   from '@/assets/soldat/krebs-klara-barna.webp';
import imgSkuespill   from '@/assets/soldat/skuespillerne.webp';
import imgDansAggie   from '@/assets/soldat/dans-aggie.webp';
import imgDansDoro    from '@/assets/soldat/dans-dorothea.webp';
import imgHule        from '@/assets/soldat/inn-i-hule.webp';
import imgKanon       from '@/assets/soldat/kanon.webp';
import imgKart        from '@/assets/soldat/kart.webp';
import imgKartaktiv   from '@/assets/soldat/kartaktivitet.webp';
import imgMarsere     from '@/assets/soldat/marsere inn i festningen.webp';
import imgMedaljong   from '@/assets/soldat/medaljong.webp';
import imgTegne       from '@/assets/soldat/tegneaktivitet.webp';
import imgBaand       from '@/assets/soldat/utdeling av bånd.webp';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const STORY_TEXT =
  'Bli kjent med Klara, kjøkkenpikene, soldatene og alt det andre ' +
  'mystiske som gjemmer seg på festningen. Festningen har fått besøk ' +
  'av en spennende skotsk skikkelse som har med seg noe verdifullt — ' +
  'noe som noen andre på festningen har veldig lyst på... ' +
  'Kanskje må nettopp du bli med å redde festningen?';

const BENTO = [
  { src: imgDansAggie,  alt: 'Aggie danser med barna' },
  { src: imgKanon,      alt: 'Kanon på festningen' },
  { src: imgMedaljong,  alt: 'Medaljongen' },
  { src: imgMarsere,    alt: 'Marsjerer inn i festningen' },
  { src: imgHule,       alt: 'Inn i hulen' },
  { src: imgKrebbarna,  alt: 'Krebs og barna' },
  { src: imgKart,       alt: 'Kart over festningen' },
  { src: imgDansDoro,   alt: 'Dorothea danser med barna' },
  { src: imgKartaktiv,  alt: 'Kartaktivitet' },
  { src: imgTegne,      alt: 'Tegneaktivitet' },
  { src: imgBaand,      alt: 'Utdeling av bånd' },
  { src: imgSkuespill,  alt: 'Skuespillerne' },
] as const;

// Samme mønster som ShowOverview: [3×2, 2×1, 1×1] × n på desktop (6-kol)
// Mobil (2-kol): hvert 3. element er full bredde, resten halvt
function getBentoClasses(index: number): string {
  const mobile = index % 3 === 0 ? 'col-span-2' : 'col-span-1';
  const desktop = [
    'md:col-span-3 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-1',
  ][index % 3];
  return `${mobile} ${desktop}`;
}

// ─── Sub: MagicText ───────────────────────────────────────────────────────────

function MagicText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'start 0.22'],
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} aria-label={text}>
      <p className="font-heading text-xl leading-relaxed sm:text-2xl lg:text-3xl" aria-hidden="true">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <MagicWord
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              reduced={reduced}
            />
          );
        })}
      </p>
    </div>
  );
}

function MagicWord({
  word, progress, range, reduced,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white mr-[0.22em] inline-block">
      {word}
    </motion.span>
  );
}

// ─── Sub: BentoCell ───────────────────────────────────────────────────────────

function BentoCell({
  src, alt, index, onClick,
}: { src: string; alt: string; index: number; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={`Åpne bilde: ${alt}`}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-cynical-700',
        'hover:border-gold-400/60 cursor-pointer transition',
        getBentoClasses(index),
      )}
    >
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE, delay: (index % 6) * 0.05 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-cynical-900/0 group-hover:bg-cynical-900/25 transition" />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const LIGHTBOX_IMAGES = BENTO.map(item => ({ url: item.src, alt: item.alt }));

export default function Soldat() {
  const reduced = !!useReducedMotion();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  // Global side-scroll (piksler) — kjøres uavhengig av hero-størrelse
  const { scrollY } = useScroll();

  // Bildet ekspanderer i løpet av de første 360px scroll
  const imgScale = useTransform(scrollY, [0, 360], reduced ? [1, 1] : [0.65, 1]);
  const imgBorderRadius = useTransform(
    scrollY, [0, 360],
    reduced ? ['0rem', '0rem'] : ['2rem', '0rem']
  );
  const imgOpacity = useTransform(scrollY, [0, 60], reduced ? [1, 1] : [0, 1]);

  // «1814» fader ut mens bildet kommer inn
  const yearOpacity = useTransform(scrollY, [0, 280], reduced ? [1, 1] : [1, 0]);

  // Scroll-pil fader ut raskt
  const arrowOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <>
      <SEOHead
        title="Soldat for en dag"
        description="Bli med på en morsom dag på festningen i 1814! Interaktiv tidsreise med historiefortelling, lek, fekting, dans og sang for barn fra skolestarter til 3. trinn."
      />

      {/* ════════════════════════════════════════════════════════════════════
          HERO — standard h-screen, scroll-drevet ekspansjon via scrollY
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden bg-cynical-900">

        {/* Ekspanderende bakgrunnsbilde */}
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden"
          style={{ borderRadius: imgBorderRadius, scale: imgScale, opacity: imgOpacity, willChange: 'transform, opacity' }}
          aria-hidden="true"
        >
          <img
            src={imgHero}
            alt="Soldater og barn danser"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-cynical-900/55" />
          <div className="absolute inset-0 bg-linear-to-t from-cynical-900/85 via-transparent to-transparent" />
        </motion.div>

        {/* «1814» dekorativt bakgrunnstall */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ opacity: yearOpacity }}
          aria-hidden="true"
        >
          <span className="font-heading text-[42vw] leading-none tracking-tighter text-white/6">
            1814
          </span>
        </motion.div>

        {/* Eyebrow øverst */}
        <motion.p
          className="absolute inset-x-0 top-[calc(72px+1.25rem)] px-4 text-center eyebrow text-xs text-torch-400/80"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <span className="sm:hidden">Dagaktivitet · Kongsvinger Festning<br />Sommer 2026</span>
          <span className="hidden sm:inline">Dagaktivitet · Kongsvinger Festning · Sommer 2026</span>
        </motion.p>

        {/* Innhold — sentrert, under header */}
        <div className="absolute inset-0 flex items-center px-4 pt-[72px]">
          <Container size="lg">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">

              {/* Venstre: tittel, ingress, knapper, scroll-pil */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
                className="space-y-4"
              >
                <h1 className="font-heading text-[clamp(3rem,1.5rem+6vw,7rem)] uppercase leading-[0.92] tracking-[-0.03em] text-white">
                  Soldat
                  <br />
                  <span className="text-torch-400">for en</span>
                  <br />
                  dag
                </h1>
                <p className="lead max-w-md text-white/60">
                  Bli med på en morsom dag på festningen i 1814! Har du lyst til å prøve deg som soldat?
                </p>
                {/* <div className="flex flex-wrap gap-3 pt-1">
                  <Button variant="outline" size="md" withShine caps>
                    Påmelding kommer snart
                  </Button>
                </div> */}

                {/* Scroll-indikator — inline under knappene */}
                <motion.div
                  className="flex items-center gap-2.5 justify-center"
                  style={{ opacity: arrowOpacity }}
                  aria-hidden="true"
                >
                  <motion.div
                    animate={reduced ? {} : { y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-6 w-px bg-linear-to-b from-white/30 to-transparent" />
                    <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/30">Scroll</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Høyre: bildestack (kun desktop) */}
              <motion.div
                className="relative hidden lg:block w-80 xl:w-96"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              >
                <div className="relative h-[480px]">
                  <img
                    src={imgKrebbarna}
                    alt="Krebs og barna på festningen"
                    className="absolute right-0 top-0 h-80 w-56 rounded-2xl object-cover shadow-2xl"
                    loading="eager"
                  />
                  <img
                    src={imgSkuespill}
                    alt="Skuespillerne"
                    className="absolute bottom-0 left-0 h-60 w-48 rounded-2xl border border-white/10 object-cover shadow-2xl"
                    loading="eager"
                  />
                  <div className="absolute right-3 bottom-14 rounded-xl border border-torch-500/30 bg-cynical-800/90 px-3 py-2 backdrop-blur-sm">
                    <p className="eyebrow text-torch-400">Passer for</p>
                    <p className="ui-text text-sm font-semibold text-white">Skolestarter–3. trinn</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STORY — Magic text ord-for-ord reveal
          ════════════════════════════════════════════════════════════════════ */}
      <Section id="story" background="cynical" paddingY="default" className="border-t border-white/5">
        <Container size="md">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-16">

            <div className="space-y-8">
              <motion.p
                className="eyebrow text-gold-400/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Historien om festningen
              </motion.p>
              <MagicText text={STORY_TEXT} />
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="lg:hidden overflow-hidden rounded-2xl">
                <img
                  src={imgKrebbarna}
                  alt="Krebs og barna på festningen"
                  className="h-64 w-full object-cover sm:h-80"
                  loading="lazy"
                />
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <p className="eyebrow mb-5 text-gold-400/60">Praktisk</p>
                <div className="space-y-5">
                  {[
                    { icon: Calendar, label: 'Datoer',  value: '26.–28. juni\nog 1.–5. juli' },
                    { icon: Clock,    label: 'Tid',     value: 'Kl. 13.30–15.00' },
                    { icon: Users,    label: 'Alder',   value: 'Skolestarter\ntil 3. trinn' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-torch-500/20 bg-torch-500/8">
                        <Icon className="h-5 w-5 text-torch-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="ui-text text-xs text-white/40">{label}</p>
                        <p className="mt-1 whitespace-pre-line text-sm font-semibold text-white sm:text-base">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════
          BENTO GRID — 12 bilder, asymmetrisk layout
          ════════════════════════════════════════════════════════════════════ */}
      <Section background="cynical" paddingY="tight" className="border-t border-white/5">
        <Container size="xl">
          <motion.div
            className="mb-8 space-y-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="eyebrow text-torch-400/70">2025</p>
            <h2 className="h2 text-white">Soldat for en dag</h2>
          </motion.div>

          <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-6 auto-rows-[140px] lg:auto-rows-[160px]">
            {BENTO.map((item, i) => (
              <BentoCell key={`${item.src}-${i}`} src={item.src} alt={item.alt} index={i} onClick={() => openLightbox(i)} />
            ))}
          </div>
        </Container>
      </Section>
      <ImageLightbox
        isOpen={lightboxOpen}
        images={LIGHTBOX_IMAGES}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
