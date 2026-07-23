# Import treści do WordPress — Fundacja D-Arka

Ten katalog zawiera gotowy pakiet do przeniesienia treści na WordPress (domena **d-arka.org**).
Plik `d-arka.wordpress.xml` to natywny format importu WordPressa (WXR 1.2) — tworzy wszystkie 7 podstron z treścią.

> Uwaga: nie mam dostępu do Twojego hostingu, więc import wykonujesz w swoim panelu WP (kroki poniżej — zajmuje ~10 min).

---

## 1. Import stron (WXR)
1. Zaloguj się do **WP Admin** (https://d-arka.org/wp-admin).
2. **Narzędzia → Import → WordPress** → kliknij „Zainstaluj teraz” (wtyczka *WordPress Importer*), potem „Uruchom importer”.
3. Wgraj plik **`d-arka.wordpress.xml`**.
4. Przypisz autora do istniejącego użytkownika (lub utwórz „Fundacja D-Arka”). Zaznacz „Pobierz i zaimportuj załączniki” (opcjonalnie).
5. Import utworzy strony: Strona główna, O nas, Warsztaty cyfrowe, Ekologia i konopie, Projekty, Strategia 2026–2031, Kontakt.

## 2. Strona startowa
**Ustawienia → Czytanie → Strona statyczna** → „Strona główna” jako *Strona główna*.

## 3. Menu
**Wygląd → Menu** → utwórz menu „Główne”, dodaj strony w kolejności:
O nas · Warsztaty cyfrowe · Ekologia i konopie · Projekty · Strategia 2026–2031 · Kontakt.
Przypisz do lokalizacji „Menu główne/Primary”. Dodaj przycisk CTA „Współpracuj” → link do /kontakt/.

## 4. Motyw i identyfikacja wizualna
Rekomendowany motyw: **Blocksy / Kadence / GeneratePress** (lekkie, dostępne). Ustaw:

### Kolory
Wariant JASNY (instytucjonalny — zalecany domyślny dla B2G):
- Tło (paper): `#F7F8F5`
- Powierzchnie/karty: `#FFFFFF` / sekcje `#EDEFEA`
- Tekst: `#16211B`
- Tekst pomocniczy: `#5C6A61`
- Akcent (zieleń instytucjonalna): `#1C6B45`  → tekst na przyciskach: **biały** `#FFFFFF`
- Linie/obramowania: `rgba(20,33,27,0.14)`

Wariant CIEMNY (earthy — opcjonalny, np. wtyczką trybu ciemnego „WP Dark Mode”):
- Tło: `#0E1410` · Powierzchnie: `#121915` · Tekst: `#E8EDE9` · Tekst pomocniczy: `#9AA8A0`
- Akcent (limonka): `#CCFF00` → tekst na przyciskach: **ciemny** `#0E1410`

> WCAG kontrast: na jasnej zieleni `#1C6B45` używaj BIAŁEGO tekstu; na jasnej limonce `#CCFF00` używaj CIEMNEGO tekstu. Nigdy odwrotnie.

### Typografia (Google Fonts + Fontshare)
- Nagłówki serif (akcenty kursywą): **Cormorant Garamond**
- Nagłówki mocne: **Cabinet Grotesk** (Fontshare — wtyczka „Custom Fonts” lub `@font-face`)
- Tekst: **IBM Plex Sans**

### Styl
Ciemny/jasny motyw, karty zaokrąglone (glassmorphism opcjonalnie), przyciski „pill” (mocno zaokrąglone), dużo światła (odstępy), animacje on-scroll motywu.

## 5. Formularz kontaktowy
Na stronie **Kontakt** znajdziesz znacznik miejsca na formularz. Wstaw wtyczkę:
- **Fluent Forms / WPForms / Contact Form 7** — pola: Imię i nazwisko*, E-mail*, Organizacja, Temat (lista: Warsztaty cyfrowe / Ekologia i konopie / Współpraca / Media / Inne), Wiadomość*.
- Ustaw powiadomienia na **fundacja@d-arka.org**.
- Włącz walidację i etykiety (dostępność) oraz zgodę RODO (checkbox).

## 6. Obrazy (do wgrania do Biblioteki mediów)
Zdjęcia użyte w wersji React (zaleca się pobrać i wgrać lokalnie, WebP):
- Hero — pole konopi (Pexels 33326119)
- Zbiór konopi (Pexels 33325761)
- Warsztaty (Pexels 34046709)
- Gleba / sadzonka (Unsplash 1542601906990) i gleba w dłoniach (Unsplash 1492496913980)
Ustaw alt-teksty PL (np. „Pole konopi włóknistych”, „Warsztaty cyfrowe”, „Dłonie sadzące roślinę”).

## 7. Stopka
Dodaj widżet/HTML w stopce z danymi (są też na stronie Kontakt):
- Adres: Ogrodniki 10E, 82-316 Milejewo · E-mail: fundacja@d-arka.org · Tel.: 695 181 809
- NIP 5783145555 · REGON 388041366 · KRS 0000874086
- Konto: NEST BANK S.A. (SWIFT NESBPLPW), PL 43 1870 1045 2078 1074 5222 0001
- Nota prawna (patrz strona Kontakt) + „organizacja pozarządowa non-profit”.

## 8. Dostępność (WCAG 2.1 AA) — checklista dla WordPress
- Język strony: **Ustawienia → Ogólne → Język witryny = polski** (generuje `lang="pl"`).
- Motyw z widocznym fokusem klawiatury i „skip to content”.
- Kontrast tekstu min. 4.5:1 (patrz kolory wyżej).
- Nagłówki w hierarchii (H1 → H2 → H3), jedna H1 na stronę (już zachowane w treści).
- Alt-teksty dla zdjęć; ikony dekoracyjne bez opisu.
- Formularz: etykiety powiązane z polami, komunikaty błędów, oznaczenie pól wymaganych.
- Bez automatycznie odtwarzanych animacji bez możliwości zatrzymania; respektuj „prefers-reduced-motion”.
- Rozważ stronę **„Deklaracja dostępności”** (wymóg prawny w PL dla wielu podmiotów).

## 9. SEO i finalizacja
- Wtyczka **Rank Math/Yoast** — tytuły, opisy, Open Graph, mapa witryny.
- **SSL** (Let's Encrypt) + przekierowanie http→https i www→bez www.
- Cache/WebP (LiteSpeed/WP Rocket).
- Test: responsywność, formularz, PageSpeed, linki.

---
Treść źródłowa (PL) w wersji React: `/app/frontend/src/data/content.js`.
Ogólny plan wdrożenia: `/app/PLAN_WDROZENIA_WORDPRESS.md`.
