// src/components/layout/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Hjem", href: "/" },
  { name: "Om forestillingen", href: "/forestilling" },
  { name: "Kalender", href: "/kalender" },
  { name: "Om oss", href: "/om-oss" },
  { name: "Arkiv", href: "/arkiv" },
  { name: "Sponsorer", href: "/sponsorer" },
  { name: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-navy-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Kongsvinger Festningsteater" className="h-10 w-auto lg:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold-400",
                  location.pathname === item.href ? "text-gold-400" : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button variant="torch" size="lg" asChild>
              <a href="https://billetter.no" target="_blank" rel="noreferrer">
                Kjøp billetter
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                        "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                        location.pathname === item.href
                            ? "bg-gold-500/20 text-gold-400"
                            : "text-white hover:bg-navy-800"
                    )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button variant="torch" className="w-full" asChild>
                  <a href="https://billetter.no" target="_blank" rel="noreferrer">
                    Kjøp billetter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
