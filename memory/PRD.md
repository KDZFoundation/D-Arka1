# PRD — Fundacja D-Arka (strona wielopodstronowa)

## Problem statement (oryginalny)
Zbuduj stronę dla Fundacji D-Arka, która powstała z Fundacji Konopie dla Ziemi. Poprzednia fundacja realizowała projekty ekologiczne związane z konopiami włóknistymi; obecnie rozszerza usługi o warsztaty cyfrowe (kompetencje cyfrowe, A.I.). Fundacja realizuje wniosek 88492-2 (PROO) i planuje rozwój (MMS2026, DSPP 1980, EOG) oraz stworzyła strategię rozwoju 2026–2031. Docelowo strona ma trafić na WordPress w domenie d-arka.org.

## Decyzje użytkownika
- Zbuduj stronę React + przygotuj plan/treści pod WordPress.
- Strona wielopodstronowa.
- Równy nacisk na ekologię i obszar cyfrowy (koncept „pomostu”).
- Styl dobrany przez agenta (dark „eco-tech”, Awwwards-level).
- Bez social media. Adres: Ogrodniki 10E, 82-316 Milejewo. E-mail placeholder: kontakt@d-arka.org.

## Architektura
- Frontend: React (react-router-dom), framer-motion (animacje), lenis (smooth scroll), Tailwind, shadcn/ui, sonner.
- Backend: FastAPI + MongoDB (formularz kontaktowy: POST/GET /api/contact).
- Motyw wizualny: `/app/design_guidelines.json`. Treści PL: `/app/frontend/src/data/content.js`.

## Zrealizowane (2026-07-22)
- 7 podstron: Home, O nas, Warsztaty cyfrowe, Ekologia i konopie, Projekty, Strategia 2026–2031, Kontakt.
- Kinetyczny hero (masked line reveal), parallax, marquee wartości, numerowany manifest, karty oferty, siatka projektów, timeline strategii.
- Formularz kontaktowy zapisujący do MongoDB + toast.
- Plan wdrożenia WordPress: `/app/PLAN_WDROZENIA_WORDPRESS.md`.
- Przełącznik motywu A↔C (jasny „instytucjonalny" domyślny ↔ ciemny „earthy"), oparty na zmiennych CSS + localStorage + param `?theme=`. Subtelny cyfrowy akcent w hero (animowana sieć węzłów, adaptuje się do motywu). Zweryfikowane realnym klikaniem (testing agent, 100%).
- Dane kontaktowe: e-mail fundacja@d-arka.org, tel. 695 181 809.

## Zrealizowane (2026-07-23)
- Dane rejestrowe w stopce: NIP 5783145555, REGON 388041366, KRS 0000874086, NEST BANK S.A. (SWIFT NESBPLPW, IBAN), nota prawna (Sąd Rejonowy w Olsztynie, NGO non-profit).
- Dostępność WCAG 2.1 AA: `lang="pl"`, skip-link „Przejdź do treści", widoczny fokus (:focus-visible), kontrast (biały tekst na zielonym przycisku w jasnym / ciemny na limonce w ciemnym), teksty bez półprzezroczystości poniżej AA, dostępny formularz (etykiety htmlFor, `required`/`aria-required`/`aria-invalid`, komunikaty błędów `role="alert"` + fokus na 1. błędnym polu), pauza marquee na hover + `aria-hidden`, `prefers-reduced-motion`, tytuły podstron per route, ikony dekoracyjne `aria-hidden`.
- Zachowane oba motywy (jasny domyślny + ciemny) przez przełącznik.

## Persony
- Instytucje publiczne (B2G), MŚP, NGO, edukacja/społeczność.

## Backlog / kolejne kroki
- P1: Podstrona z aktualnościami/blogiem (SEO), galeria z Ogrodnik.
- P1: Panel admin do przeglądania zgłoszeń z formularza.
- P2: Wersja EN, integracja mailingu (Resend), mapa dojazdu.
- P2: Sekcja „Zespół” i „Dokumenty do pobrania” (strategia, sprawozdania).

## Uwagi
- Docelowe wdrożenie WordPress wg planu; wersja React jako referencja wizualna i źródło treści.
- E-mail/telefon do potwierdzenia przez fundację.
