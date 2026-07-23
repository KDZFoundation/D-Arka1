import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Mail, Phone, Lock } from "lucide-react";
import { FOUNDATION, NAV } from "../data/content";
import { useAuth } from "../context/AuthContext";

export const Footer = () => {
  const { isAdmin, setShowLoginModal } = useAuth();

  return (
    <footer data-testid="main-footer" className="relative border-t border-[color:var(--line)] bg-pine">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-3xl text-bone">D</span>
              <span className="h-2 w-2 rounded-full bg-lime translate-y-[-4px]" />
              <span className="font-display font-extrabold text-3xl text-bone">ARKA</span>
            </div>
            <p className="mt-5 max-w-md text-sage leading-relaxed">
              {FOUNDATION.tagline} <span className="text-sage">{FOUNDATION.formerName}.</span>
            </p>
          </div>

          <nav aria-label="Stopka — nawigacja" className="lg:col-span-2">
            <h2 className="text-xs tracking-[0.2em] uppercase text-sage mb-5">Nawigacja</h2>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    data-testid={`footer-link-${item.path.replace(/\//g, "") || "home"}`}
                    className="text-bone/80 hover:text-lime transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    data-testid="footer-link-admin"
                    className="text-lime hover:underline transition-colors duration-300 text-xs font-mono flex items-center gap-1 mt-2"
                  >
                    Panel Admina (fundacja@d-arka.org)
                  </Link>
                </li>
              )}
            </ul>
          </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-sage mb-5">Kontakt</h2>
          <ul className="space-y-4 text-bone/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
              <span>{FOUNDATION.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
              <a href={`mailto:${FOUNDATION.email}`} className="hover:text-lime transition-colors" data-testid="footer-email">
                {FOUNDATION.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
              <a href={`tel:${FOUNDATION.phoneHref}`} className="hover:text-lime transition-colors" data-testid="footer-phone">
                {FOUNDATION.phone}
              </a>
            </li>
          </ul>
          <Link
            to="/kontakt"
            data-testid="footer-cta"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm text-bone hover:bg-[color:var(--fill)] transition-colors duration-300"
          >
            Napisz do nas <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-sage mb-5">Dane rejestrowe</h2>
          <dl className="space-y-2.5 text-sm text-bone/80" data-testid="footer-registration">
            <div className="flex gap-2"><dt className="text-sage min-w-[54px]">NIP</dt><dd>{FOUNDATION.nip}</dd></div>
            <div className="flex gap-2"><dt className="text-sage min-w-[54px]">REGON</dt><dd>{FOUNDATION.regon}</dd></div>
            <div className="flex gap-2"><dt className="text-sage min-w-[54px]">KRS</dt><dd>{FOUNDATION.krs}</dd></div>
          </dl>
          <div className="mt-5">
            <p className="text-xs tracking-[0.2em] uppercase text-sage mb-2">Konto bankowe</p>
            <p className="text-sm text-bone/80">{FOUNDATION.bankName} <span className="text-sage">(SWIFT: {FOUNDATION.swift})</span></p>
            <p className="text-sm text-bone/80 mt-1 tabular-nums">{FOUNDATION.iban}</p>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-[color:var(--line)]">
        <p className="max-w-4xl text-sm text-sage leading-relaxed" data-testid="footer-legal">
          {FOUNDATION.legal}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-[color:var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-sage">
        <p>© {new Date().getFullYear()} {FOUNDATION.name}. Wszelkie prawa zastrzeżone.</p>
        <p>{FOUNDATION.domain} · {FOUNDATION.region}</p>
      </div>
    </div>
  </footer>
);
};

