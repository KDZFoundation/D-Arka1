import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, LogIn, CheckCircle2, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, login, logout, userEmail, isAdmin, ADMIN_EMAIL } = useAuth();
  const [emailInput, setEmailInput] = useState(userEmail || ADMIN_EMAIL);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  if (!showLoginModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setError("Wprowadź adres e-mail.");
      return;
    }
    login(emailInput.trim());
    setError("");
  };

  const handleQuickLoginAdmin = () => {
    setEmailInput(ADMIN_EMAIL);
    login(ADMIN_EMAIL);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-moss/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--line)] bg-moss/95 p-6 shadow-2xl backdrop-blur-2xl text-bone"
        >
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-5 right-5 text-sage hover:text-bone p-1 rounded-full hover:bg-moss-light/40 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-4 text-lime">
            <div className="p-2.5 rounded-2xl bg-lime/10 border border-lime/20">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-bone">
                Logowanie do Panelu
              </h3>
              <p className="text-xs text-sage">
                Wymagane konto: <code className="text-lime">{ADMIN_EMAIL}</code>
              </p>
            </div>
          </div>

          {isAdmin ? (
            <div className="space-y-4 my-6 p-4 rounded-2xl bg-lime/10 border border-lime/30 text-center">
              <CheckCircle2 size={32} className="mx-auto text-lime" />
              <div>
                <p className="font-medium text-bone text-sm">
                  Jesteś zalogowany jako:
                </p>
                <p className="font-mono text-lime font-bold text-base mt-0.5">
                  {userEmail}
                </p>
                <p className="text-xs text-sage mt-1">
                  Masz pełny dostęp do Panelu Admina.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl bg-moss-light/60 hover:bg-red-500/20 hover:text-red-400 text-sage text-xs font-medium border border-[color:var(--line)] transition-colors"
                >
                  Wyloguj się
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 my-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert size={16} /> {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-sage mb-1.5">
                  Adres e-mail:
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="np. fundacja@d-arka.org"
                  className="w-full px-4 py-2.5 rounded-xl bg-moss-light/40 border border-[color:var(--line)] text-bone placeholder-sage/50 focus:outline-none focus:border-lime text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-sage mb-1.5">
                  Hasło (opcjonalne w trybie demo):
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-moss-light/40 border border-[color:var(--line)] text-bone placeholder-sage/50 focus:outline-none focus:border-lime text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-lime text-moss font-semibold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <LogIn size={18} /> Zaloguj się
              </button>

              <div className="pt-2 border-t border-[color:var(--line)]">
                <button
                  type="button"
                  onClick={handleQuickLoginAdmin}
                  className="w-full py-2 px-3 rounded-xl bg-moss-light/40 hover:bg-lime/20 text-lime text-xs font-mono border border-lime/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  Szybkie logowanie jako {ADMIN_EMAIL}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowLoginModal(false)}
              className="text-xs text-sage hover:text-bone underline"
            >
              Zamknij okno
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
