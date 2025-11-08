// src/components/layout/Footer.tsx
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container>
      <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Om oss
              </h3>
              <p className="text-sm text-gray-300">
                Kongsvinger Festningsteater setter opp storslåtte familieforestillinger 
                med historie og dramatikk i hjertet.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Kontakt
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                  <a href="mailto:post@festningsteater.no" className="hover:text-gold-400 transition-colors">
                    post@festningsteater.no
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                  <a href="tel:+4712345678" className="hover:text-gold-400 transition-colors">
                    +47 123 45 678
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Kongsvinger Festning<br />
                    2226 Kongsvinger
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Snarveier
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/kalender" className="hover:text-gold-400 transition-colors">
                    Forestillingskalender
                  </Link>
                </li>
                <li>
                  <Link to="/om-oss" className="hover:text-gold-400 transition-colors">
                    Bli frivillig
                  </Link>
                </li>
                <li>
                  <Link to="/sponsorer" className="hover:text-gold-400 transition-colors">
                    Bli sponsor
                  </Link>
                </li>
                <li>
                  <Link to="/arkiv" className="hover:text-gold-400 transition-colors">
                    Tidligere forestillinger
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Følg oss
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener"
                  className="text-white hover:text-gold-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener"
                  className="text-white hover:text-gold-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-navy-700 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Kongsvinger Festningsteater. Alle rettigheter reservert.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
