import { Link } from "react-router-dom";
import { ArrowUpRight, Inbox } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../PageHeader";
import { useOveredge } from "../../hooks/useOveredge";

const fmtDate = (d) => {
  try {
    return new Date(d).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const html = (s) => ({ __html: s || "" });

export const CardSkeleton = ({ count = 3 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass rounded-3xl p-7 h-56 animate-pulse">
        <div className="skeleton h-4 w-24 rounded mb-5 bg-sage/20" />
        <div className="skeleton h-6 w-3/4 rounded mb-3 bg-sage/20" />
        <div className="skeleton h-4 w-full rounded mb-2 bg-sage/20" />
        <div className="skeleton h-4 w-2/3 rounded bg-sage/20" />
      </div>
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="pt-40 pb-28">
    <div className="mx-auto max-w-3xl px-5 sm:px-8" aria-hidden="true">
      <div className="skeleton h-10 w-2/3 rounded mb-8 bg-sage/20" />
      <div className="skeleton h-4 w-full rounded mb-3 bg-sage/20" />
      <div className="skeleton h-4 w-full rounded mb-3 bg-sage/20" />
      <div className="skeleton h-4 w-5/6 rounded bg-sage/20" />
    </div>
  </div>
);

export const EmptyState = ({ title = "Brak treści", message = "Treść pojawi się tutaj automatycznie po jej dodaniu w WordPress." }) => (
  <div className="glass rounded-3xl p-12 text-center" data-testid="wp-empty-state">
    <Inbox size={36} className="text-lime mx-auto mb-4" aria-hidden="true" />
    <h3 className="font-display text-xl text-bone mb-2">{title}</h3>
    <p className="text-sage max-w-md mx-auto text-sm">{message}</p>
  </div>
);

export const PostCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    data-testid={`post-card-${post.slug}`}
    className="glass rounded-3xl p-7 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300"
  >
    <span className="text-xs text-sage mb-3">{fmtDate(post.date)}</span>
    <h3
      className="font-display text-xl tracking-tight text-bone mb-3"
      dangerouslySetInnerHTML={html(post.title?.rendered)}
    />
    <div
      className="text-sage text-sm leading-relaxed line-clamp-3 wp-excerpt"
      dangerouslySetInnerHTML={html(post.excerpt?.rendered)}
    />
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-lime">
      Czytaj dalej <ArrowUpRight size={15} aria-hidden="true" />
    </span>
  </Link>
);

// Blog Posts Section (HomePage & General usage)
export const BlogPostsSection = ({ limit = 6 }) => {
  const { data, loading } = useOveredge("posts", { per_page: limit });

  return (
    <section data-testid="home-posts" className="py-28 sm:py-36 bg-pine/40 border-y border-[color:var(--line)]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <Reveal><SectionLabel>Aktualności</SectionLabel></Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tighter max-w-2xl text-balance">
                Najnowsze <span className="font-serif italic text-terracotta">wpisy</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/blog"
              data-testid="home-posts-all"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm text-bone hover:bg-[color:var(--fill)] transition-colors"
            >
              Wszystkie wpisy <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {loading ? (
          <CardSkeleton count={Math.min(limit, 3)} />
        ) : data.length === 0 ? (
          <EmptyState title="Brak wpisów" message="Brak publikacji w WordPress." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, limit).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const PostsSection = BlogPostsSection;

// Pages Section for Homepage / Control Panel
export const PagesSection = () => {
  const { data, loading } = useOveredge("pages");

  return (
    <section data-testid="wp-section-pages" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal><SectionLabel>Strony WordPress</SectionLabel></Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tighter max-w-2xl text-balance mb-14">
            Poznaj nasze <span className="font-serif italic text-terracotta">strony</span>
          </h2>
        </Reveal>
        {loading ? (
          <CardSkeleton count={3} />
        ) : data.length === 0 ? (
          <EmptyState title="Brak stron" message="Dodaj strony w WordPress wp-admin." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((page) => (
              <Link
                key={page.id}
                to={`/${page.slug}`}
                className="glass rounded-3xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <h3 className="font-display text-xl text-bone mb-3" dangerouslySetInnerHTML={html(page.title?.rendered)} />
                <div className="text-sage text-sm leading-relaxed line-clamp-3 wp-excerpt" dangerouslySetInnerHTML={html(page.excerpt?.rendered || page.content?.rendered)} />
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-lime">
                  Zobacz stronę <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Generic grid wrapper for custom post types
export const WpGridSection = ({
  contentType,
  overline,
  title,
  titleItalic,
  limit = 6,
  renderItem,
}) => {
  const { data, loading } = useOveredge(contentType, { per_page: limit });

  return (
    <section data-testid={`wp-section-${contentType}`} className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal><SectionLabel>{overline}</SectionLabel></Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tighter max-w-2xl text-balance mb-14">
            {title} {titleItalic && <span className="font-serif italic text-terracotta">{titleItalic}</span>}
          </h2>
        </Reveal>
        {loading ? (
          <CardSkeleton count={Math.min(limit, 3)} />
        ) : data.length === 0 ? (
          <EmptyState title={`Brak elementów (${contentType})`} message="Dodaj wpisy tego typu w panelu WordPress." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, limit).map((item, i) => renderItem ? renderItem(item, i) : genericCard(item))}
          </div>
        )}
      </div>
    </section>
  );
};

const genericCard = (item) => (
  <div key={item.id} className="glass rounded-3xl p-7 h-full flex flex-col">
    <h3 className="font-display text-xl text-bone mb-3" dangerouslySetInnerHTML={html(item.title?.rendered)} />
    <div
      className="text-sage text-sm leading-relaxed wp-excerpt line-clamp-4"
      dangerouslySetInnerHTML={html(item.excerpt?.rendered || item.content?.rendered)}
    />
  </div>
);

export const TeamSection = ({ limit = 4 }) => (
  <WpGridSection contentType="team_members" overline="Zespół" title="Poznaj" titleItalic="nasz zespół" limit={limit} />
);

export const TestimonialsSection = ({ limit = 3 }) => (
  <WpGridSection contentType="testimonials" overline="Opinie" title="Co mówią o" titleItalic="współpracy" limit={limit} />
);

export const EventsSection = ({ limit = 6 }) => (
  <WpGridSection contentType="events" overline="Wydarzenia" title="Nadchodzące" titleItalic="wydarzenia" limit={limit} />
);

export const CoursesSection = ({ limit = 6 }) => (
  <WpGridSection contentType="Kursy" overline="Edukacja" title="Dostępne" titleItalic="kursy i szkolenia" limit={limit} />
);

export const FAQsSection = ({ limit = 8 }) => (
  <WpGridSection contentType="faqs" overline="FAQ" title="Najczęściej" titleItalic="zadawane pytania" limit={limit} />
);

export const FAQsSectionAlias = FAQsSection;

export const KadenceFormsSection = ({ limit = 6 }) => (
  <WpGridSection contentType="kadence_form" overline="Kadence" title="Formularze" titleItalic="Kadence" limit={limit} />
);

export const KadenceNavigationSection = ({ limit = 6 }) => (
  <WpGridSection contentType="kadence_navigation" overline="Kadence" title="Nawigacja" titleItalic="Kadence" limit={limit} />
);

export const KadenceHeaderSection = ({ limit = 6 }) => (
  <WpGridSection contentType="kadence_header" overline="Kadence" title="Nagłówek" titleItalic="Kadence" limit={limit} />
);

export const ProductsSection = ({ limit = 6 }) => (
  <WpGridSection contentType="product" overline="Sklep" title="Nasze" titleItalic="produkty" limit={limit} />
);

export const KadenceLottieSection = ({ limit = 6 }) => (
  <WpGridSection contentType="kadence_lottie" overline="Kadence" title="Animacje" titleItalic="Lottie" limit={limit} />
);

export const KadenceVectorSection = ({ limit = 6 }) => (
  <WpGridSection contentType="kadence_vector" overline="Kadence" title="Wektory" titleItalic="SVG" limit={limit} />
);
