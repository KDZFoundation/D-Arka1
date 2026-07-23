import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, MapPin, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { PageHeader, SectionLabel } from "../components/PageHeader";
import { FOUNDATION } from "../data/content";

const API = (import.meta.env && import.meta.env.VITE_BACKEND_URL) ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api";

const TOPICS = ["Warsztaty cyfrowe", "Ekologia i konopie", "Współpraca / partnerstwo", "Media / prasa", "Inne"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Podaj imię i nazwisko (min. 2 znaki).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Podaj poprawny adres e-mail.";
    if (form.message.trim().length < 5) e.message = "Wiadomość musi mieć min. 5 znaków.";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstErr = ["name", "email", "message"].find((k) => e[k]);
    if (firstErr) {
      refs[firstErr].current?.focus();
      toast.error("Popraw zaznaczone pola formularza.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setDone(true);
      toast.success("Dziękujemy! Wiadomość została wysłana.");
      setForm({ name: "", email: "", organization: "", topic: TOPICS[0], message: "" });
    } catch {
      toast.error("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        overline="Kontakt"
        title="Porozmawiajmy"
        titleItalic="o współpracy"
        description="Masz pytanie o warsztaty, projekt lub chcesz nawiązać partnerstwo? Napisz do nas — odpowiadamy na każdą wiadomość."
        testid="contact-header"
      />

      <section className="pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>Dane kontaktowe</SectionLabel></Reveal>
            <Reveal delay={0.06}>
              <ul className="space-y-6 text-bone/90">
                <li className="flex items-start gap-4">
                  <MapPin size={22} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
                  <div><p className="text-sm text-sage mb-1">Siedziba</p><p>{FOUNDATION.address}</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={22} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
                  <div><p className="text-sm text-sage mb-1">E-mail</p>
                    <a href={`mailto:${FOUNDATION.email}`} className="hover:text-lime transition-colors" data-testid="contact-email">{FOUNDATION.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={22} className="text-lime mt-0.5 shrink-0" aria-hidden="true" />
                  <div><p className="text-sm text-sage mb-1">Telefon</p>
                    <a href={`tel:${FOUNDATION.phoneHref}`} className="hover:text-lime transition-colors" data-testid="contact-phone">{FOUNDATION.phone}</a>
                  </div>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 glass rounded-3xl p-8">
                <p className="font-serif italic text-2xl text-bone leading-snug">
                  „{FOUNDATION.tagline}”
                </p>
                <p className="mt-4 text-sm text-sage">{FOUNDATION.name} — {FOUNDATION.formerName}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <Reveal>
                <div data-testid="contact-success" role="status" className="glass rounded-3xl p-10 flex flex-col items-start gap-4">
                  <CheckCircle2 size={40} className="text-lime" aria-hidden="true" />
                  <h2 className="font-display text-2xl text-bone">Wiadomość wysłana</h2>
                  <p className="text-sage">Dziękujemy za kontakt. Odezwiemy się najszybciej, jak to możliwe.</p>
                  <button onClick={() => setDone(false)} data-testid="contact-new" className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm text-bone hover:bg-[color:var(--fill)] transition-colors">
                    Wyślij kolejną
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={submit} data-testid="contact-form" noValidate className="glass rounded-3xl p-8 sm:p-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Imię i nazwisko" htmlFor="cf-name" required error={errors.name} errorId="cf-name-err">
                      <input ref={refs.name} id="cf-name" name="name" data-testid="contact-name" value={form.name} onChange={update("name")}
                        required aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined}
                        className="cf-input" placeholder="Jan Kowalski" />
                    </Field>
                    <Field label="E-mail" htmlFor="cf-email" required error={errors.email} errorId="cf-email-err">
                      <input ref={refs.email} id="cf-email" name="email" type="email" data-testid="contact-email-input" value={form.email} onChange={update("email")}
                        required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined}
                        className="cf-input" placeholder="jan@firma.pl" />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Organizacja" htmlFor="cf-org">
                      <input id="cf-org" name="organization" data-testid="contact-org" value={form.organization} onChange={update("organization")} className="cf-input" placeholder="Nazwa instytucji / firmy" />
                    </Field>
                    <Field label="Temat" htmlFor="cf-topic">
                      <select id="cf-topic" name="topic" data-testid="contact-topic" value={form.topic} onChange={update("topic")} className="cf-input">
                        {TOPICS.map((t) => <option key={t} value={t} className="bg-pine text-bone">{t}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Wiadomość" htmlFor="cf-message" required error={errors.message} errorId="cf-message-err">
                    <textarea ref={refs.message} id="cf-message" name="message" data-testid="contact-message" value={form.message} onChange={update("message")} rows={5}
                      required aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined}
                      className="cf-input resize-none" placeholder="W czym możemy pomóc?" />
                  </Field>
                  <button
                    type="submit" disabled={loading} data-testid="contact-submit"
                    className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-medium text-[color:var(--btn-fg)] transition-transform duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Wysyłanie…</> : <>Wyślij wiadomość <ArrowUpRight size={16} aria-hidden="true" /></>}
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .cf-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--line);
          border-radius: 0.9rem;
          padding: 0.85rem 1rem;
          color: rgb(var(--c-bone));
          font-size: 0.95rem;
          transition: border-color 0.25s ease, background-color 0.25s ease;
          outline: none;
        }
        [data-theme="dark"] .cf-input { background: rgba(255,255,255,0.03); }
        .cf-input::placeholder { color: var(--placeholder); }
        .cf-input:focus-visible { border-color: rgb(var(--c-lime)); outline: 2px solid rgb(var(--c-lime)); outline-offset: 1px; }
      `}</style>
    </>
  );
}

const Field = ({ label, htmlFor, required, error, errorId, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-xs tracking-[0.15em] uppercase text-sage mb-2">
      {label}{required && <span className="text-lime" aria-hidden="true"> *</span>}
    </label>
    {children}
    {error && <p id={errorId} role="alert" className="mt-1.5 text-sm text-[color:var(--err)]">{error}</p>}
  </div>
);
