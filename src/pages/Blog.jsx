import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { useOveredge } from "../hooks/useOveredge";
import { CardSkeleton, EmptyState } from "../components/wp/WpSections";

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

export default function Blog() {
  const { data: posts, loading, error } = useOveredge("posts", { per_page: 12 });

  return (
    <>
      <PageHeader
        overline="Aktualności"
        title="Blog"
        titleItalic="i wiedza"
        description="Bądź na bieżąco z wydarzeniami, publikacjami i informacjami z życia Fundacji D-Arka."
        testid="blog-header"
      />
      <section className="pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {loading ? (
            <CardSkeleton count={6} />
          ) : error || !posts || posts.length === 0 ? (
            <EmptyState
              title="Brak wpisów"
              message="Nie znaleziono jeszcze żadnych publikacji w WordPress. Dodaj nowy wpis w panelu administracyjnym WordPress."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  data-testid={`post-card-${post.slug}`}
                  className="glass rounded-3xl p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 min-h-[260px]"
                >
                  <div>
                    <span className="text-xs text-sage mb-3 block">{fmtDate(post.date)}</span>
                    <h3
                      className="font-display text-xl tracking-tight text-bone mb-3"
                      dangerouslySetInnerHTML={html(post.title?.rendered)}
                    />
                    <div
                      className="text-sage text-sm leading-relaxed line-clamp-3 wp-excerpt"
                      dangerouslySetInnerHTML={html(post.excerpt?.rendered)}
                    />
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-lime">
                    Czytaj dalej <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
