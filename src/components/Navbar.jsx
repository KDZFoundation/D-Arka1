import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";
import { useOveredge } from "../hooks/useOveredge";

const Logo = () => (
  <Link to="/" data-testid="nav-logo" className="group flex items-baseline gap-1.5">
    <span className="font-display font-extrabold tracking-tight text-xl text-bone">D</span>
    <span className="h-1.5 w-1.5 rounded-full bg-lime translate-y-[-2px] transition-transform duration-300 group-hover:scale-150" />
    <span className="font-display font-extrabold tracking-tight text-xl text-bone">ARKA</span>
  </Link>
);

const html = (s) => ({ __html: s || "" });

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: wpPages } = useOveredge("pages");

  const existingPaths = new Set(NAV.map((n) => n.path.replace(/^\//, "").toLowerCase()));
  const extraWpPages = (wpPages || []).filter(
    (p) => p?.slug && !existingPaths.has(p.slug.toLowerCase())
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-moss/70 backdrop-blur-xl border-b border-[color:var(--line)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-6">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              data-testid={`nav-link-${item.path.replace(/\//g, "")}`}
              className={({ isActive }) =>
                `relative text-sm font-body tracking-wide transition-colors duration-300 hover:text-bone ${
                  isActive ? "text-lime" : "text-sage"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {extraWpPages.map((page) => (
            <NavLink
              key={page.id}
              to={`/${page.slug}`}
              className={({ isActive }) =>
                `relative text-sm font-body tracking-wide transition-colors duration-300 hover:text-bone ${
                  isActive ? "text-lime" : "text-sage"
                }`
              }
            >
              <span dangerouslySetInnerHTML={html(page.title?.rendered || page.slug)} />
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/kontakt"
            data-testid="nav-cta"
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-[color:var(--btn-fg)] transition-transform duration-300 hover:scale-105"
          >
            Współpracuj <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-bone p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-moss/95 backdrop-blur-xl border-b border-[color:var(--line)]"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  data-testid={`mobile-link-${item.path.replace(/\//g, "")}`}
                  className={({ isActive }) =>
                    `text-lg font-serif italic ${isActive ? "text-lime" : "text-bone/80"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {extraWpPages.map((page) => (
                <NavLink
                  key={page.id}
                  to={`/${page.slug}`}
                  className={({ isActive }) =>
                    `text-lg font-serif italic ${isActive ? "text-lime" : "text-bone/80"}`
                  }
                >
                  <span dangerouslySetInnerHTML={html(page.title?.rendered || page.slug)} />
                </NavLink>
              ))}

              <ThemeToggle className="mt-2 inline-flex w-full justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
