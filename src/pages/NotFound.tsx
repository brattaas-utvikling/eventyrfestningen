import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost, Compass, Home, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    h1Ref.current?.focus();
  }, [pathname]);

  return (
    <>
      <SEOHead
        title="404 – Siden ble ikke funnet"
        description="Siden du leter etter finnes ikke. Kanskje den er flyttet eller skrevet feil."
      />

      <section className="relative overflow-hidden bg-linear-to-br from-navy-900 to-burgundy-900 text-white">
        {/* aurora/spotlight */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          style={{
            background:
              "radial-gradient(60% 60% at 85% 10%, rgba(251,146,60,0.20), transparent 60%), radial-gradient(50% 50% at 20% 90%, rgba(245,158,11,0.15), transparent 60%)",
          }}
        />
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-torch-500/25 blur-3xl" aria-hidden />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" aria-hidden />

        <Container className="relative z-10 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold-400/10 border border-gold-400/40 px-4 py-1 text-gold-50 text-sm">
              <Ghost className="h-4 w-4" />
              Uff da, her var det tomt
            </div>

            {/* 404-tall med liten “bounce” */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <span className="block text-7xl sm:text-8xl font-display font-black tracking-wider">
                404
              </span>
            </motion.div>

            <h1
              ref={h1Ref}
              tabIndex={-1}
              className="text-3xl sm:text-4xl font-display font-bold mb-4 focus:outline-none"
            >
              Siden ble ikke funnet
            </h1>

            <p className="text-navy-100/80 mb-8">
              Lenken kan være feil, eller siden er flyttet. Prøv disse veiene videre.
            </p>

            {/* actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild variant="torch">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Til forsiden
                </Link>
              </Button>
              <Button asChild variant="default">
                <Link to="/kontakt">
                  <Mail className="mr-2 h-4 w-4" />
                  Kontakt oss
                </Link>
              </Button>
              <Link
                to="/arkiv"
                className="inline-flex items-center gap-2 text-gold-200 hover:text-white transition"
              >
                <Compass className="h-4 w-4" />
                Se arkivet vårt
              </Link>
            </div>

            {/* hint om URL-en */}
            <p className="mt-6 text-xs text-navy-100/50 break-all">
              URL: <span className="font-mono">{pathname}</span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
