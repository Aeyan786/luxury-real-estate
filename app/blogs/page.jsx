import { BlogCard } from "@/components/cards/BlogCard";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata = {
  title: "Blogs",
  description: "Market insight, buyer guides, and news from the Vebryx luxury marketplace.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        kicker="Journal"
        title="Insight for the world of extraordinary assets"
        description="Buyer guides, market news, and verification standards from the Vebryx team and our agent network."
      />
      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Container>
      </section>
    </>
  );
}
