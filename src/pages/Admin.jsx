import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  FileText, 
  Newspaper, 
  Layers, 
  Settings, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Database,
  Palette,
  Sliders,
  RefreshCw,
  Lock,
  LogIn,
  UserCheck
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ADMIN_NAV } from "../data/content";
import { useOveredge, useSiteConfig } from "../hooks/useOveredge";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { isAdmin, userEmail, login, logout, ADMIN_EMAIL } = useAuth();
  const { data: wpPages, loading: loadingPages } = useOveredge("pages");
  const { data: wpPosts, loading: loadingPosts } = useOveredge("posts");
  const { siteConfig, configReady } = useSiteConfig();
  const [activeTab, setActiveTab] = useState("pages");
  const [emailInput, setEmailInput] = useState(ADMIN_EMAIL);

  const existingPaths = new Set(["o-nas", "warsztaty-cyfrowe", "ekologia", "projekty", "strategia", "blog", "kontakt"]);
  const extraWpPages = (wpPages || []).filter(
    (p) => p?.slug && !existingPaths.has(p.slug.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-moss text-bone flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl border border-[color:var(--line)] bg-moss-light/30 p-8 backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-lime/10 text-lime text-xs font-mono border border-lime/20">
              Dostęp Zastrzeżony
            </span>
            <h2 className="text-2xl font-display font-bold text-bone mt-3">
              Panel Admina
            </h2>
            <p className="text-sm text-sage mt-2 leading-relaxed">
              Panel jest widoczny wyłącznie dla zalogowanego konta:
              <br />
              <code className="text-lime font-bold">{ADMIN_EMAIL}</code>
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(emailInput);
            }}
            className="space-y-3 pt-2"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Adres e-mail"
              className="w-full px-4 py-2.5 rounded-xl bg-moss border border-[color:var(--line)] text-bone text-sm text-center font-mono focus:outline-none focus:border-lime"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime text-moss font-semibold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Zaloguj jako {ADMIN_EMAIL}
            </button>
          </form>

          <Link to="/" className="inline-block text-xs text-sage hover:text-bone underline">
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-moss text-bone">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-lime bg-lime/10 px-3 py-1.5 rounded-full border border-lime/30">
            <UserCheck size={14} /> Zalogowano: {userEmail}
          </div>
          <button
            onClick={logout}
            className="text-xs text-sage hover:text-red-400 hover:underline font-mono"
          >
            Wyloguj się
          </button>
        </div>

        <PageHeader
          eyebrow="Strefa Zarządcza"
          title="Panel Admina"
          description="Centralne miejsce zarządzania treściami, ukrytymi stronami i konfiguracją serwisu Fundacji D-Arka."
        />

        {/* Status bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[color:var(--line)] bg-moss-light/40 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 text-lime mb-2">
              <Database size={20} />
              <span className="font-display font-semibold text-sm">Integracja Overedge / WP</span>
            </div>
            <p className="text-2xl font-bold font-display text-bone">
              {window.Overedge?.isReady() ? "Połączono" : "Tryb lokalny"}
            </p>
            <p className="text-xs text-sage mt-1">
              Silnik synchronizacji treści z systemem CMS
            </p>
          </div>

          <div className="rounded-2xl border border-[color:var(--line)] bg-moss-light/40 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 text-lime mb-2">
              <Layers size={20} />
              <span className="font-display font-semibold text-sm">Strony WordPress</span>
            </div>
            <p className="text-2xl font-bold font-display text-bone">
              {loadingPages ? "Ładowanie..." : wpPages.length}
            </p>
            <p className="text-xs text-sage mt-1">
              Pobrane strony w locie z API
            </p>
          </div>

          <div className="rounded-2xl border border-[color:var(--line)] bg-moss-light/40 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 text-lime mb-2">
              <Palette size={20} />
              <span className="font-display font-semibold text-sm">Motyw i Tokeny</span>
            </div>
            <p className="text-2xl font-bold font-display text-bone">
              {configReady ? "Aktywny" : "Domyślny"}
            </p>
            <p className="text-xs text-sage mt-1">
              D-Arka Moss & Lime Theme
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-12 flex items-center gap-2 border-b border-[color:var(--line)] pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("pages")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "pages"
                ? "bg-lime text-moss font-semibold"
                : "text-sage hover:text-bone hover:bg-moss-light/30"
            }`}
          >
            <FileText size={16} /> Ukryte Strony i Zasoby
          </button>
          <button
            onClick={() => setActiveTab("wp")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "wp"
                ? "bg-lime text-moss font-semibold"
                : "text-sage hover:text-bone hover:bg-moss-light/30"
            }`}
          >
            <Database size={16} /> Strony z WordPress ({extraWpPages.length})
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "config"
                ? "bg-lime text-moss font-semibold"
                : "text-sage hover:text-bone hover:bg-moss-light/30"
            }`}
          >
            <Sliders size={16} /> Konfiguracja Witryny
          </button>
        </div>

        {/* Tab 1: Hidden admin pages */}
        {activeTab === "pages" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADMIN_NAV.map((item) => (
              <div
                key={item.path}
                className="group rounded-2xl border border-[color:var(--line)] bg-moss-light/20 p-6 hover:border-lime/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-lime/10 text-lime border border-lime/20 mb-3">
                      Strona wewnętrzna / zarządcza
                    </span>
                    <h3 className="text-xl font-display font-semibold text-bone group-hover:text-lime transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-sage mt-2">{item.desc}</p>
                  </div>
                  <Link
                    to={item.path}
                    className="p-3 rounded-full bg-moss-light hover:bg-lime hover:text-moss text-bone transition-colors"
                    title={`Przejdź do ${item.label}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="mt-6 pt-4 border-t border-[color:var(--line)] flex items-center justify-between text-xs text-sage">
                  <span>Ścieżka: <code className="text-lime">{item.path}</code></span>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1 text-lime hover:underline"
                  >
                    Otwórz <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: WP Dynamic Pages */}
        {activeTab === "wp" && (
          <div className="mt-8">
            <div className="mb-4 text-sm text-sage">
              Dynamiczne strony pobierane bezpośrednio przez wtyczkę/API Overedge WordPress:
            </div>

            {loadingPages ? (
              <div className="p-8 text-center text-sage bg-moss-light/20 rounded-2xl border border-[color:var(--line)]">
                <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-lime" />
                Pobieranie stron z WordPress...
              </div>
            ) : extraWpPages.length === 0 ? (
              <div className="p-8 text-center text-sage bg-moss-light/20 rounded-2xl border border-[color:var(--line)]">
                Brak dodatkowych niestandardowych stron w WordPress. Strony z WordPress są gotowe do wyświetlenia po opublikowaniu w CMS.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extraWpPages.map((page) => (
                  <div
                    key={page.id}
                    className="p-5 rounded-2xl border border-[color:var(--line)] bg-moss-light/20 flex items-center justify-between"
                  >
                    <div>
                      <h4
                        className="font-display font-semibold text-bone"
                        dangerouslySetInnerHTML={{ __html: page.title?.rendered || page.slug }}
                      />
                      <p className="text-xs text-sage mt-1">
                        URL: <code className="text-lime">/{page.slug}</code>
                      </p>
                    </div>
                    <Link
                      to={`/${page.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-lime/10 text-lime text-xs font-medium border border-lime/30 hover:bg-lime hover:text-moss transition-colors"
                    >
                      Zobacz stronę
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Site Configuration */}
        {activeTab === "config" && (
          <div className="mt-8 rounded-2xl border border-[color:var(--line)] bg-moss-light/20 p-6 space-y-6">
            <h3 className="text-lg font-display font-semibold text-bone flex items-center gap-2">
              <Settings size={20} className="text-lime" /> Konfiguracja Sekcji i Wyglądu
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 p-4 rounded-xl border border-[color:var(--line)] bg-moss/50">
                <div className="font-semibold text-bone">Standard kolorystyczny:</div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#111A13] border border-sage/30" />
                  <span>Moss (Ciemna Zieleń / Baza)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A3E635]" />
                  <span>Lime (Zieleń Akcentująca)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F0]" />
                  <span>Bone (Tekst / Jasne Tło)</span>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl border border-[color:var(--line)] bg-moss/50">
                <div className="font-semibold text-bone">Ustawienia sekcji głównych:</div>
                <ul className="space-y-2 text-xs text-sage">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> Strona Główna (Hero, Manifest, Warsztaty, Projekty)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> O nas (Misja, Rebranding, Zespół)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> Warsztaty Cyfrowe (A.I. & GreenComp)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> Ekologia i Konopie (Dziedzictwo & Baza Ogrodniki)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> Projekty (PROO, MMS, EFS+, EOG)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-lime" /> Kontakt (Dane rejestrowe, Formularz)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
