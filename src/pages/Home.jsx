import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sprout, Cpu } from "lucide-react";
import { Reveal, MaskedLines } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { HeroNetwork } from "../components/HeroNetwork";
import { useSiteConfig } from "../hooks/useOveredge";
import {
  BlogPostsSection,
  PagesSection,
  TeamSection,
  TestimonialsSection,
  EventsSection,
  CoursesSection,
  FAQsSection,
} from "../components/wp/WpSections";
import { SectionLabel } from "../components/PageHeader";
import {
  HERO_LINES, MARQUEE_WORDS, STATS, MANIFESTO, VISION, PROJECTS, IMAGES,
} from "../data/content";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} data-testid="hero" className="relative min-h-[100svh] overflow-hidden flex items-end">
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <img src={IMAGES.heroNature} alt="Pole konopi włóknistych" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-moss/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-moss via-moss/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-moss via-moss/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: yOrb }}
        className="pointer-events-none absolute right-[3%] top-[12%] w-[40vw] max-w-[520px] aspect-square z-0 hidden md:block opacity-70"
      >
        <HeroNetwork />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-5 sm:px-8 pb-20 sm:pb-28">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xs tracking-[0.28em] uppercase text-lime mb-8"
        >
          Fundacja D-Arka · dawniej Konopie dla Ziemi
        </motion.p>

        <MaskedLines
          lines={HERO_LINES}
          className="font-display text-[13vw] sm:text-[9vw] lg:text-[7.5vw] leading-[0.92] tracking-tighter"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8 sm:justify-between"
        >
          <p className="max-w-md text-lg text-bone/80 leading-relaxed">
            Budujemy pomost między dziedzictwem ekologicznym a cyfrową przyszłością — łącząc kompetencje zielone z siłą sztucznej inteligencji.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/warsztaty-cyfrowe" data-testid="hero-cta-workshops" className="inline-flex items-center gap-1.5 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-[color:var(--btn-fg)] transition-transform duration-300 hover:scale-105">
              Warsztaty cyfrowe <ArrowUpRight size={16} />
            </Link>
            <Link to="/o-nas" data-testid="hero-cta-about" className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-6 py-3.5 text-sm text-bone hover:bg-[color:var(--fill)] transition-colors duration-300">
              Poznaj fundację
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sage">
        <ArrowDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

const Stats = () => (
  <section data-testid="stats" className="border-y border-[color:var(--line)] bg-pine/50">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-[color:var(--line)]">
      {STATS.map((s, i) => (
        <Reveal key={i} delay={i * 0.08} className="px-4 sm:px-8 py-10">
          <div className="font-display text-4xl sm:text-5xl text-lime tracking-tight">{s.value}</div>
          <div className="mt-3 text-sm text-sage">{s.label}</div>
        </Reveal>
      ))}
    </div>
  </section>
);

const Bridge = () => (
  <section data-testid="bridge" className="py-28 sm:py-36">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <Reveal><SectionLabel>Nasza idea</SectionLabel></Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95] max-w-4xl text-balance">
          Dwa światy, <span className="font-serif italic text-terracotta">jeden</span> kierunek rozwoju.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-6 glass rounded-3xl p-8 sm:p-10" delay={0.1}>
          <div className="flex items-center gap-3 text-terracotta mb-5">
            <Sprout size={24} /><span className="text-xs tracking-[0.2em] uppercase">Korzenie</span>
          </div>
          <h3 className="font-serif italic text-3xl text-bone mb-4">Dziedzictwo ekologiczne</h3>
          <p className="text-sage leading-relaxed">
            Konopie włókniste, ochrona gleb i edukacja klimatyczna. Przekładamy wieloletnie doświadczenie w ekologii na praktyczne kompetencje zielone zgodne z ramami GreenComp.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-6 glass rounded-3xl p-8 sm:p-10" delay={0.18}>
          <div className="flex items-center gap-3 text-lime mb-5">
            <Cpu size={24} /><span className="text-xs tracking-[0.2em] uppercase">Napęd</span>
          </div>
          <h3 className="font-display text-3xl text-bone mb-4 tracking-tight">Kompetencje cyfrowe i A.I.</h3>
          <p className="text-sage leading-relaxed">
            Warsztaty cyfrowe, cyberbezpieczeństwo i asystenci merytoryczni A.I. Sztuczną inteligencję traktujemy jako katalizator zielonych rozwiązań dla ludzi, administracji i biznesu.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const Manifesto = () => (
  <section data-testid="manifesto" className="py-28 sm:py-36 bg-pine/40 border-y border-[color:var(--line)]">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <Reveal><SectionLabel>Manifest</SectionLabel></Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter max-w-3xl text-balance">
          Cztery filary <span className="font-serif italic text-terracotta">naszej pracy</span>
        </h2>
      </Reveal>

      <div className="mt-16 divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
        {MANIFESTO.map((m, i) => (
          <Reveal key={m.no} delay={i * 0.05}>
            <div className="group grid md:grid-cols-12 gap-6 py-9 transition-colors duration-300 hover:bg-white/[0.02]">
              <div className={`md:col-span-2 font-display text-5xl ${m.accent === "lime" ? "text-lime" : "text-terracotta"}`}>{m.no}</div>
              <h3 className="md:col-span-4 font-display text-2xl sm:text-3xl tracking-tight text-bone">{m.title}</h3>
              <p className="md:col-span-6 text-sage leading-relaxed">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const OfferPreview = () => {
  const cards = [
    { to: "/warsztaty-cyfrowe", label: "Usługa", title: "Warsztaty cyfrowe", desc: "Kompetencje A.I., cyberbezpieczeństwo, prompt engineering i e-learning w standardzie SCORM.", img: IMAGES.workshop, accent: "lime" },
    { to: "/ekologia", label: "Misja", title: "Ekologia i konopie", desc: "Edukacja klimatyczna, ochrona gleb i dziedzictwo konopi włóknistych w duchu gospodarki obiegu zamkniętego.", img: IMAGES.hempTractor, accent: "terracotta" },
  ];
  return (
    <section data-testid="offer-preview" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.to} delay={i * 0.1}>
              <Link to={c.to} data-testid={`offer-card-${i}`} className="group block relative overflow-hidden rounded-3xl h-[440px]">
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-moss via-moss/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <span className={`text-xs tracking-[0.2em] uppercase ${c.accent === "lime" ? "text-lime" : "text-terracotta"}`}>{c.label}</span>
                  <h3 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight text-bone">{c.title}</h3>
                  <p className="mt-3 max-w-md text-bone/70">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-bone group-hover:text-lime transition-colors">
                    Dowiedz się więcej <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsPreview = () => (
  <section data-testid="projects-preview" className="py-28 sm:py-36 bg-pine/40 border-y border-[color:var(--line)]">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <Reveal><SectionLabel>Projekty</SectionLabel></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tighter max-w-2xl text-balance">
              Realizujemy i <span className="font-serif italic text-terracotta">planujemy</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link to="/projekty" data-testid="projects-preview-all" className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm text-bone hover:bg-[color:var(--fill)] transition-colors">
            Wszystkie projekty <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <div className="glass rounded-2xl p-7 h-full flex flex-col">
              <span className={`self-start rounded-full px-3 py-1 text-xs ${p.active ? "bg-lime text-[color:var(--btn-fg)]" : "border border-[color:var(--line)] text-sage"}`}>{p.status}</span>
              <h3 className="mt-5 font-display text-xl tracking-tight text-bone">{p.title}</h3>
              <p className="mt-2 text-sm text-sage">{p.funder}</p>
              <p className="mt-4 text-xs text-sage">{p.period}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const VisionCTA = () => (
  <section data-testid="vision-cta" className="py-32 sm:py-44">
    <div className="mx-auto max-w-[1100px] px-5 sm:px-8 text-center">
      <Reveal><SectionLabel>Wizja 2031</SectionLabel></Reveal>
      <Reveal delay={0.06}>
        <p className="font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-bone text-balance">
          „{VISION}”
        </p>
      </Reveal>
      <Reveal delay={0.14}>
        <Link to="/kontakt" data-testid="vision-cta-btn" className="mt-12 inline-flex items-center gap-1.5 rounded-full bg-lime px-7 py-4 text-sm font-medium text-[color:var(--btn-fg)] transition-transform duration-300 hover:scale-105">
          Rozpocznij współpracę <ArrowUpRight size={16} />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  const { configReady, isSectionActive, getSectionLimit } = useSiteConfig();
  return (
    <>
      <Hero />
      <Stats />
      <Bridge />
      <Marquee words={MARQUEE_WORDS} />
      <Manifesto />
      <OfferPreview />
      <ProjectsPreview />
      {!configReady ? (
        <div className="animate-pulse h-32 bg-sage/10 rounded-2xl mx-auto max-w-4xl my-12" />
      ) : (
        <>
          {isSectionActive("posts") && (
            <BlogPostsSection limit={getSectionLimit("posts", 6)} />
          )}
          {isSectionActive("pages") && <PagesSection />}
          {isSectionActive("team") && (
            <TeamSection limit={getSectionLimit("team", 4)} />
          )}
          {isSectionActive("testimonials") && (
            <TestimonialsSection limit={getSectionLimit("testimonials", 3)} />
          )}
          {isSectionActive("events") && (
            <EventsSection limit={getSectionLimit("events", 6)} />
          )}
          {isSectionActive("courses") && (
            <CoursesSection limit={getSectionLimit("courses", 6)} />
          )}
          {isSectionActive("faqs") && <FAQsSection />}
        </>
      )}
      <VisionCTA />
    </>
  );
}
