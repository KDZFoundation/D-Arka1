import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Shield, ChevronDown, Lock, Settings, UserCheck, LogIn } from "lucide-react";
import { NAV, ADMIN_NAV } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";
import { useOveredge } from "../hooks/useOveredge";
import { useAuth } from "../context/AuthContext";

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
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const adminMenuRef = useRef(null);
  const location = useLocation();
  const { data: wpPages } = useOveredge("pages");
  const { isAdmin, setShowLoginModal, userEmail, ADMIN_EMAIL } = useAuth();

  const existingPaths = new Set([
    "", "o-nas", "warsztaty-cyfrowe", "ekologia", "projekty", "kontakt", "strategia", "blog", "admin"
  ]);
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
    setAdminDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-moss/80 backdrop-blur-xl border-b border-[color:var(--line)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo />

        {/* Main Desktop Navigation - Only requested 6 items */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              data-testid={`nav-link-${item.path.replace(/\//g, "") || "home"}`}
              className={({ isActive }) =>
                `relative text-sm font-body tracking-wide transition-colors duration-300 hover:text-bone ${
                  isActive ? "text-lime font-medium" : "text-sage"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right side controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Admin Panel Dropdown & Status (ONLY visible when logged in as fundacja@d-arka.org) */}
          {isAdmin && (
            <div className="relative" ref={adminMenuRef}>
              <button
                onClick={() => setAdminDropdownOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border transition-all duration-300 ${
                  adminDropdownOpen || location.pathname === "/admin"
                    ? "bg-lime/10 text-lime border-lime/40"
                    : "bg-moss-light/40 text-sage hover:text-bone border-[color:var(--line)]"
                }`}
                title="Panel Admina (fundacja@d-arka.org)"
              >
                <Shield size={14} className="text-lime" />
                <span>Panel Admina</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${adminDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {adminDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-moss/95 border border-[color:var(--line)] backdrop-blur-2xl p-3 shadow-2xl z-50 text-left"
                  >
                    <div className="px-3 py-2 border-b border-[color:var(--line)] mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-sage flex items-center gap-1.5">
                        <Lock size={12} className="text-lime" /> Strefa Zarządcza
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime/10 text-lime font-mono">
                        ADMIN
                      </span>
                    </div>

                    <div className="px-3 py-1 text-[11px] font-mono text-lime/80 truncate mb-2">
                      {userEmail}
                    </div>

                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-bone hover:bg-lime hover:text-moss transition-colors mb-1"
                    >
                      <Settings size={15} /> Otwórz Panel Zarządczy
                    </Link>

                    <div className="my-1 border-t border-[color:var(--line)]" />

                    <div className="px-3 py-1.5 text-[11px] font-semibold text-sage uppercase tracking-wider">
                      Ukryte strony:
                    </div>

                    {ADMIN_NAV.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                            isActive
                              ? "bg-lime/10 text-lime font-medium"
                              : "text-sage hover:text-bone hover:bg-moss-light/30"
                          }`
                        }
                      >
                        <span>{item.label}</span>
                      </NavLink>
                    ))}

                    {extraWpPages.length > 0 && (
                      <>
                        <div className="px-3 py-1.5 mt-1 text-[11px] font-semibold text-sage uppercase tracking-wider">
                          Strony WordPress:
                        </div>
                        {extraWpPages.map((page) => (
                          <NavLink
                            key={page.id}
                            to={`/${page.slug}`}
                            className={({ isActive }) =>
                              `flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                                isActive
                                  ? "bg-lime/10 text-lime font-medium"
                                  : "text-sage hover:text-bone hover:bg-moss-light/30"
                              }`
                            }
                          >
                            <span dangerouslySetInnerHTML={html(page.title?.rendered || page.slug)} />
                          </NavLink>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <ThemeToggle />

          <Link
            to="/kontakt"
            data-testid="nav-cta"
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-[color:var(--btn-fg)] transition-transform duration-300 hover:scale-105"
          >
            Współpracuj <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-bone p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
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
              {/* Main 6 requested items */}
              <div className="text-xs font-mono uppercase tracking-wider text-sage border-b border-[color:var(--line)] pb-2">
                Menu Główne
              </div>
              {NAV.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  data-testid={`mobile-link-${item.path.replace(/\//g, "") || "home"}`}
                  className={({ isActive }) =>
                    `text-lg font-serif italic ${isActive ? "text-lime" : "text-bone/80"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Panel Admina section for mobile (ONLY if isAdmin) */}
              {isAdmin && (
                <div className="mt-4 pt-4 border-t border-[color:var(--line)]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime mb-3">
                    <Shield size={14} /> Panel Admina (fundacja@d-arka.org)
                  </div>

                  <div className="flex flex-col gap-2.5 pl-2">
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `text-sm font-medium flex items-center gap-2 ${
                          isActive ? "text-lime font-bold" : "text-sage hover:text-bone"
                        }`
                      }
                    >
                      <Settings size={14} /> Panel Zarządczy
                    </NavLink>

                    {ADMIN_NAV.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `text-sm ${isActive ? "text-lime font-bold" : "text-sage hover:text-bone"}`
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
                          `text-sm ${isActive ? "text-lime font-bold" : "text-sage hover:text-bone"}`
                        }
                      >
                        <span dangerouslySetInnerHTML={html(page.title?.rendered || page.slug)} />
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-[color:var(--line)] flex items-center justify-between">
                <ThemeToggle className="inline-flex" />
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-xs font-medium text-[color:var(--btn-fg)]"
                >
                  Współpracuj <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

