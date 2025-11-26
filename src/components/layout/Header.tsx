// src/components/layout/Header.tsx
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";



// liten throttle for scroll
function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

interface NavigationItem {
  name: string;
  href: string;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation: NavigationItem[] = useMemo(
    () => [
      { name: "Hjem", href: "/" },
      { name: "Om forestillingen", href: "/om-forestillingen" },
      { name: "Nyheter", href: "/nyheter" },
      { name: "Om oss", href: "/om-oss" },
      { name: "Arkiv", href: "/arkiv" },
      { name: "Sponsorer", href: "/sponsorer" },
      { name: "Kontakt", href: "/kontakt" },
    ],
    []
  );

  // beregn høyde på mobilmeny
  useEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight);
    }
  }, [mobileMenuOpen, navigation]);

  // hide/show på mobil ved scroll
  const handleScrollBehavior = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;

    const currentScrollY = window.scrollY;

    // ikke gjem på desktop
    if (window.innerWidth >= 1024) {
      header.style.transform = "translateY(0)";
      return;
    }

    // ikke spam
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
      setMobileMenuOpen(false);
    } else {
      header.style.transform = "translateY(0)";
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const throttledScrollHandler = useMemo(
    () => throttle(handleScrollBehavior, 16),
    [handleScrollBehavior]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // klikk utenfor + lås body
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // lukk meny på route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // navigasjon
  const handleNavClick = useCallback(
    (href: string) => {
      setMobileMenuOpen(false);

      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    },
    [location.pathname, navigate]
  );

  const isActiveRoute = useCallback(
    (href: string) => location.pathname === href,
    [location.pathname]
  );

  // “prefetch” på hover – low impact
  const handleNavHover = useCallback(
    (href: string) => {
      if (href.startsWith("/") && href !== location.pathname) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        document.head.appendChild(link);
      }
    },
    [location.pathname]
  );

  const NavLink = ({
    item,
    className,
    onClick,
    onMouseEnter,
  }: {
    item: NavigationItem;
    className?: string;
    onClick: () => void;
    onMouseEnter?: () => void;
  }) => {
    const active = isActiveRoute(item.href);
    return (
      <Link
        to={item.href}
        className={cn(
          "transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-md",
          active
            ? "text-gold-400 font-semibold"
            : "text-white hover:text-gold-400",
          className
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-navy-900/95 backdrop-blur-sm shadow-lg"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4 lg:py-6">
          {/* logo */}
          <motion.button
            onClick={() => handleNavClick("/")}
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-lg"
            whileTap={{ scale: 0.98 }}
            aria-label="Kongsvinger Festningsteater - Gå til forsiden"
          >
            <img
              src="/logo.svg"
              alt="Kongsvinger Festningsteater"
              className="h-10 w-auto lg:h-12"
              loading="eager"
            />
          </motion.button>

          {/* desktop nav */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  item={item}
                  className="text-sm font-medium px-3 py-2"
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => handleNavHover(item.href)}
                />
              </motion.div>
            ))}
          </div>

          {/* desktop CTA */}
          <div className="hidden lg:flex">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button variant="torch" size="lg" asChild>
              <a
                href="https://eventyrfestningen.ticketco.events/no/nb"
                target="_blank"
                rel="noreferrer"
                className="focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 font-display"
                onClick={() =>
                  trackEvent("ticket_click", {
                    source: "header_desktop",
                    page: location.pathname,
                  })
                }
              >
                Kjøp billetter
              </a>
            </Button>
          </motion.div>
          </div>

          {/* mobile toggle */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <button
              type="button"
              className="lg:hidden text-white hover:text-gold-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-full p-2"
              // onClick={() => setMobileMenuOpen((p) => !p)}
              onClick={() =>
                setMobileMenuOpen((prev) => {
                  const next = !prev;
                  trackEvent("nav_menu_toggle", {
                    open: next,
                    device: window.innerWidth < 1024 ? "mobile" : "desktop",
                  });
                  return next;
                })
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Lukk meny" : "Åpne meny"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        </nav>

        {/* mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: menuHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div
                ref={menuContentRef}
                className="pb-6 space-y-1 border-t border-gold-500/20"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <NavLink
                      item={item}
                      className={cn(
                        "block px-3 py-2 text-base font-medium rounded-md text-center",
                        isActiveRoute(item.href)
                          ? "bg-gold-500/20"
                          : "hover:bg-navy-800"
                      )}
                      onClick={() => handleNavClick(item.href)}
                      onMouseEnter={() => handleNavHover(item.href)}
                    />
                  </motion.div>
                ))}

                {/* mobile CTA */}
                <motion.div
                    className="pt-4"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Button variant="torch" className="w-full" asChild>
                      <a
                        href="https://eventyrfestningen.ticketco.events/no/nb"
                        target="_blank"
                        rel="noreferrer"
                        className="focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 font-display"
                        onClick={() =>
                          trackEvent("ticket_click", {
                            source: "header_mobile",
                            page: location.pathname,
                          })
                        }
                      >
                        Kjøp billetter
                      </a>
                    </Button>
                  </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
