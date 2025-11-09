import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaHref,
  ctaLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-linear-to-br from-navy-900 to-burgundy-900 text-white">
      {/* subtile aurora/spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        style={{
          background:
            "radial-gradient(60% 60% at 85% 10%, rgba(251,146,60,0.20), transparent 60%), radial-gradient(50% 50% at 20% 90%, rgba(245,158,11,0.15), transparent 60%)",
        }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl"
        >
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/10 border border-gold-400/40 px-4 py-1 text-gold-50 text-sm mb-5">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-xl text-gray-200">{subtitle}</p>
          ) : null}

          {ctaHref && ctaLabel ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-8"
            >
              <Link
                to={ctaHref}
                className="inline-flex items-center gap-2 rounded-lg bg-torch-500 px-5 py-3 text-sm font-bold text-navy-900 shadow-torch transition hover:bg-torch-400"
              >
                {ctaLabel}
                <span aria-hidden>↘</span>
              </Link>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
