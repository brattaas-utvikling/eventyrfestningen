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
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { trackTicketClick } from "@/lib/analytics";

function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
  isCta?: boolean;
}

// Pulserende torch-prikk — kjerne + ekspanderende ring
function TorchDot() {
  return (
    <span className="relative flex items-center justify-center w-1.5 h-1.5 flex-shrink-0">
      <span className="absolute inset-0 rounded-full bg-torch-400 animate-[pulse-ring_2.4s_ease-out_infinite]" />
      <span className="relative w-1.5 h-1.5 rounded-full bg-torch-400 shadow-[0_0_5px_rgba(251,146,60,0.8)] animate-[pulse-core_2.4s_ease-in-out_infinite]" />
    </span>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation: NavigationItem[] = useMemo(
    () => [
      { name: "Hjem", href: "/" },
      {
        name: "Kjøp billetter",
        href: "https://eventyrfestningen.ticketco.events/no/nb",
        external: true,
        isCta: true,
      },
      { name: "Om forestillingen", href: "/om-forestillingen" },
      { name: "Program", href: "/program" },
      { name: "Om oss", href: "/om-oss" },
      { name: "Frivillig", href: "/frivillig" },
      { name: "Arkiv", href: "/arkiv" },
      { name: "Sponsorer", href: "/sponsorer" },
      { name: "Kontakt", href: "/kontakt" },
    ],
    []
  );

  useEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight);
    }
  }, [mobileMenuOpen, navigation]);

  const handleScrollBehavior = useCallback(() => {
    const header = headerRef.current;
    if (!header || window.innerWidth >= 1024) {
      if (header) header.style.transform = "translateY(0)";
      return;
    }
    const currentScrollY = window.scrollY;
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
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (item: NavigationItem) => {
      setMobileMenuOpen(false);
      if (item.name === "Kjøp billetter") {
        trackTicketClick(
          window.innerWidth < 1024 ? "header_mobile_nav" : "header_desktop_nav",
          location.pathname
        );
      }
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (item.href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(item.href);
      }
    },
    [location.pathname, navigate]
  );

  const isActiveRoute = useCallback(
    (href: string) => !href.startsWith("http") && location.pathname === href,
    [location.pathname]
  );

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

    const ctaClasses = cn(
      "inline-flex items-center gap-1.5",
      "font-medium transition-colors duration-200",
      "text-white/90 hover:text-white",
      "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-cynical-900 rounded-sm",
      className
    );

    const defaultClasses = cn(
      "transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-cynical-900 rounded-sm font-sans",
      active ? "text-gold-400 font-semibold" : "text-white hover:text-gold-400",
      className
    );

    const ctaContent = (
      <>
        <TorchDot />
        {item.name}
      </>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={item.isCta ? ctaClasses : defaultClasses}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          aria-label={`${item.name} (åpnes i ny fane)`}
        >
          {item.isCta ? ctaContent : item.name}
        </a>
      );
    }

    return (
      <Link
        to={item.href}
        className={item.isCta ? ctaClasses : defaultClasses}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        aria-current={active ? "page" : undefined}
      >
        {item.isCta ? ctaContent : item.name}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-cynical-900/95 backdrop-blur-sm shadow-lg border-b border-white/20"
      role="banner"
    >
      <Container>
        <nav
          className="flex items-center justify-between py-3 lg:py-6"
          aria-label="Hovednavigasjon"
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick({ name: "Hjem", href: "/" })}
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-cynical-900 rounded-lg"
            aria-label="Eventyrfestningen - Gå til forsiden"
          >
            <img
              src="/logo.svg"
              alt="Eventyrfestingen logo"
              className="h-8 lg:h-9 xl:h-10"
              loading="eager"
              width="auto"
              height="40"
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex lg:gap-x-3 xl:gap-x-6 lg:items-center list-none">
            {navigation.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  item={item}
                  className="text-sm font-medium px-3 py-2"
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => handleNavHover(item.href)}
                />
              </motion.li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            className="lg:hidden text-white hover:text-gold-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-cynical-900 rounded-full p-2"
            onClick={() =>
              setMobileMenuOpen((prev) => {
                const next = !prev;
                trackEvent("nav_menu_toggle", { open: next, device: "mobile" });
                return next;
              })
            }
            whileTap={{ scale: 0.95 }}
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
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: menuHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
              aria-label="Mobilnavigasjon"
            >
              <ul
                ref={menuContentRef}
                className="pb-6 space-y-1 border-t border-gold-500/20 pt-2 list-none"
              >
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <NavLink
                      item={item}
                      className={cn(
                        "block px-3 py-2.5 text-base rounded-md text-center w-full",
                        item.isCta
                          ? "justify-center font-medium"
                          : cn(
                              "font-medium",
                              isActiveRoute(item.href) && "bg-gold-500/20",
                              !isActiveRoute(item.href) && "hover:bg-cynical-800"
                            )
                      )}
                      onClick={() => handleNavClick(item)}
                      onMouseEnter={() => handleNavHover(item.href)}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}