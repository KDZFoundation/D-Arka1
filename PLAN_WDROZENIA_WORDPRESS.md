# Plan wdrożenia strony WordPress — Fundacja D-Arka (d-arka.org)

Ten dokument opisuje, jak przenieść zbudowaną stronę React na WordPress w domenie **https://d-arka.org** (hosting + WordPress są gotowe). Treści i strukturę można skopiować 1:1 z wersji React.

## 1. Architektura strony (mapa podstron)
| Strona WordPress | Ścieżka | Zawartość (patrz React) |
|---|---|---|
| Strona główna | `/` | Hero „Zakorzenieni w ekologii, napędzani przez A.I.”, statystyki, idea „pomostu”, manifest (4 filary), zajawki oferty i projektów, wizja 2031 |
| O nas | `/o-nas` | Historia, rebranding, misja, wartości, statystyki |
| Warsztaty cyfrowe | `/warsztaty-cyfrowe` | 4 obszary szkoleń, grupy docelowe, CTA |
| Ekologia i konopie | `/ekologia` | Dziedzictwo konopi, klimat, dezinformacja, baza w Ogrodnikach, GreenComp |
| Projekty | `/projekty` | 4 projekty: PROO (w realizacji), MMS 2026, DSPP 1980, EOG |
| Strategia 2026–2031 | `/strategia` | Mapa drogowa (2026, 2027, 2028, 2029–2031), wizja |
| Kontakt | `/kontakt` | Dane kontaktowe + formularz |

## 2. Rekomendowany stack WordPress
- **Motyw bazowy:** Blocksy / Kadence / GeneratePress (lekkie, szybkie) LUB Astra.
- **Builder:** Gutenberg + wtyczka **Spectra** (bloki) lub **Elementor** (jeśli preferowany wizualny builder).
- **Formularz kontaktowy:** WPForms Lite / Fluent Forms / Contact Form 7 → wysyłka na e-mail fundacji.
- **SEO:** Rank Math lub Yoast SEO.
- **Wydajność:** LiteSpeed Cache / WP Rocket + konwersja obrazów do WebP.
- **Zgody/RODO:** Complianz (baner cookies, polityka prywatności).
- **Animacje:** motyw z animacjami on-scroll lub wtyczka „Blocksy/Spectra animations”. Płynny scroll: dodatek typu „Smooth Scroll” (opcjonalnie).

## 3. Identyfikacja wizualna (do skonfigurowania w motywie)
- **Tło główne (Midnight Moss):** `#0E1410`
- **Powierzchnie / karty (Deep Pine):** `#121915`
- **Tekst podstawowy (Bone):** `#E8EDE9`
- **Tekst pomocniczy (Sage):** `#9AA8A0`
- **Akcent cyfrowy (Digital Lime):** `#CCFF00`
- **Akcent natury (Terracotta):** `#D4A373`
- **Typografia:** Nagłówki serif „Cormorant Garamond” (kursywa dla akcentów) + „Cabinet Grotesk” (mocne nagłówki) / tekst „IBM Plex Sans”. W WordPress: wtyczka „Custom Fonts” lub motyw z Google Fonts + Fontshare (Cabinet Grotesk).
- **Styl:** ciemny motyw, zaokrąglone karty (glassmorphism), przyciski „pill” (zaokrąglone), dużo światła (odstępy).

## 4. Kroki wdrożenia
1. **Kopia zapasowa** obecnego WordPressa (UpdraftPlus).
2. Instalacja motywu bazowego + buildera; ustawienie palety kolorów i fontów (pkt 3).
3. Utworzenie 7 podstron (pkt 1) i menu głównego w tej samej kolejności co w React.
4. Przeniesienie treści z modułu React `src/data/content.js` (gotowe teksty PL) do bloków.
5. Wgranie zdjęć do biblioteki mediów (pole konopi, warsztaty, gleba, grafika A.I.) i optymalizacja WebP.
6. Konfiguracja formularza kontaktowego → e-mail: `kontakt@d-arka.org` (do potwierdzenia).
7. SEO: tytuły, opisy, Open Graph, mapa witryny, `d-arka.org` jako adres kanoniczny.
8. RODO: polityka prywatności + baner cookies.
9. Certyfikat SSL (Let's Encrypt) i przekierowanie http→https oraz www→bez www (lub odwrotnie).
10. Testy: responsywność (mobile/desktop), formularz, szybkość (PageSpeed), linki.

## 5. Treści źródłowe
Wszystkie teksty PL (hero, manifest, opisy projektów, mapa drogowa, dane kontaktowe) znajdują się w pliku:
`/app/frontend/src/data/content.js` — można je skopiować bezpośrednio do WordPress.

## 6. Uwaga o formularzu
Wersja React zapisuje wiadomości w bazie (endpoint `/api/contact`). W WordPress najprościej użyć wtyczki formularza wysyłającej zgłoszenia na e-mail fundacji (bez własnego backendu).

## 7. Do potwierdzenia przez Fundację
- Docelowy adres e-mail do formularza i stopki (obecnie placeholder `kontakt@d-arka.org`).
- Numer telefonu (jeśli ma być publikowany).
- Ewentualne logo w wersji graficznej (obecnie sygnet tekstowy „D•ARKA”).
- NIP/KRS i dane rejestrowe do stopki (jeśli wymagane).
