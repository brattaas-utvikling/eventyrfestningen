// src/components/layout/Footer.tsx
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useMemo } from "react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type FooterProps = {
  /** Bruk "contrast" for lys footer som bryter fra mørke sider/seksjoner */
  variant?: "dark" | "contrast";
};

export function Footer({ variant = "dark" }: FooterProps) {
  const year = useMemo(() => new Date().getFullYear(), []);

  const isDark = variant === "dark";

  const wrap = isDark ? "bg-cynical-900 text-white" : "bg-white text-cynical-900";
  const heading = isDark ? "text-gold-400" : "text-torch-600";
  const subtext = isDark ? "text-gray-300" : "text-cynical-700";
  const link = isDark
    ? "hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
    : "hover:text-torch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500/40";
  const divider = isDark ? "border-cynical-700" : "border-cynical-200";

    const socialLink = isDark
    ? "text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 rounded-sm"
    : "text-cynical-700 hover:text-torch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500/40 rounded-sm";


  return (
    <footer
      className={`relative ${wrap}`}
      aria-labelledby="site-footer-heading"
    >
      {/* Tynn gradientlinje på toppen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-500/60 to-transparent"
      />

      <Container>
        <div className="py-12 lg:py-16">
          {/* SENTRERT wrapper med max-width */}
          <div className="mx-auto max-w-sm sm:max-w-2xl lg:max-w-5xl">


            {/* Grid: 1 kolonne mobil, 2 tablet, 4 desktop */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 lg:gap-12">
              {/* Om oss */}
              <section aria-labelledby="footer-about" className="text-left">
                <h3
                  id="footer-about"
                  className={`text-lg font-sans font-semibold mb-4 ${heading}`}
                >
                  Om oss
                </h3>
                <p className={`text-sm ${subtext}`}>
                  Eventyrfestningen setter opp storslåtte familieforestillinger
                  med historie, dramatikk og lekenhet i hjertet.
                </p>
              </section>

              {/* Kontakt */}
              <section aria-labelledby="footer-contact" className="text-left">
                <h3
                  id="footer-contact"
                  className={`text-lg font-sans font-semibold mb-4 ${heading}`}
                >
                  Kontakt
                </h3>
                <address className={`not-italic text-sm space-y-3 ${subtext}`}>
                  <p className="flex items-start gap-2">
                    <Mail
                      className={`h-5 w-5 ${
                        isDark ? "text-gold-400" : "text-torch-600"
                      } shrink-0 mt-0.5`}
                    />
                    <a
                      href="mailto:kontakt@eventyrfestningen.no"
                      className={link}
                    >
                      kontakt@eventyrfestningen.no
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <Phone
                      className={`h-5 w-5 ${
                        isDark ? "text-gold-400" : "text-torch-600"
                      } shrink-0 mt-0.5`}
                    />
                    <a href="tel:+4795903453" className={link}>
                    +47 959 03 453
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin
                      className={`h-5 w-5 ${
                        isDark ? "text-gold-400" : "text-torch-600"
                      } shrink-0 mt-0.5`}
                    />
                    <span>
                      Kongsvinger Festning 2
                      <br />
                      2213 Kongsvinger
                    </span>
                  </p>
                </address>
              </section>

              {/* Snarveier */}
              <nav aria-labelledby="footer-links" className="text-left">
                <h3
                  id="footer-links"
                  className={`text-lg font-sans font-semibold mb-4 ${heading}`}
                >
                  Snarveier
                </h3>
                <ul className={`space-y-2 text-sm ${subtext}`}>
                  <li>
                    <Link
                      to="/kalender"
                      className={`inline-flex items-center gap-1 ${link}`}
                    >
                      Forestillingskalender{" "}
                      <ArrowUpRight className="h-4 w-4 translate-y-px" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/om-oss"
                      className={`inline-flex items-center gap-1 ${link}`}
                    >
                      Bli frivillig{" "}
                      <ArrowUpRight className="h-4 w-4 translate-y-px" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/sponsorer"
                      className={`inline-flex items-center gap-1 ${link}`}
                    >
                      Bli sponsor{" "}
                      <ArrowUpRight className="h-4 w-4 translate-y-px" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/arkiv"
                      className={`inline-flex items-center gap-1 ${link}`}
                    >
                      Tidligere forestillinger{" "}
                      <ArrowUpRight className="h-4 w-4 translate-y-px" />
                    </Link>
                  </li>
                </ul>
              </nav>
              <NewsletterSignup variant={variant} />
            </div>

           {/* Bunnlinje MED sosiale medier */}
            <div
              className={`mt-12 pt-8 border-t ${divider} flex flex-col items-center gap-6 sm:flex-row sm:justify-between`}
            >
              <p className={`text-sm ${subtext}`}>
                © {year} Eventyrfestningen. Alle rettigheter reservert.
              </p>

              {/* Sosiale medier + Links kombinert */}
              <div className="flex flex-wrap items-center gap-6">
                {/* Sosiale medier */}
                <div className="flex items-center gap-4" aria-label="Sosiale medier">
                  <a
                    href="https://www.facebook.com/eventyrfestningen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all ${socialLink}`}
                    aria-label="Besøk oss på Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/eventyrfestningen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all ${socialLink}`}
                    aria-label="Besøk oss på Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>

                {/* Divider */}
                <span className={`hidden sm:block w-px h-4 ${
                  isDark ? "bg-gray-600" : "bg-cynical-300"
                }`} aria-hidden="true" />

                {/* Links */}
                <ul
                  className={`flex flex-wrap items-center gap-4 text-sm ${subtext}`}
                >
                  <li>
                    <Link to="/personvern" className={link}>
                      Personvern
                    </Link>
                  </li>
                  <li>
                    <a href="#top" className={link} aria-label="Til toppen">
                      Til toppen
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Kreditering nederst – sentrert */}
            <div className="mt-4 flex justify-center">
              <a
                href="https://www.brattaasutvikling.no"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center gap-2
                  py-1
                  text-xs sm:text-sm text-gray-300
                  backdrop-blur-sm
                  transition-colors
                "
              >
                <span>Designet og levert av</span>
                <span
                  className="
                    font-semibold
                    bg-linear-to-r from-torch-300 via-torch-500 to-torch-600
                    bg-size-[200%_100%]
                    bg-position-[0%_50%]
                    group-hover:bg-position-[100%_50%]
                    bg-clip-text text-transparent
                    transition-[background-position] duration-700
                  "
                >
                  Brattås Utvikling
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
