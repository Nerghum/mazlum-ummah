import PageBanner from "@/components/page-banner";
import BlogDetails from "./components/blog-details";
import { FC } from "react";
import { Metadata } from "next";
import { fetchBlogBySlug, generateSeoMetadata, mediaUrl, fetchBlogs, postToCard } from "@/lib/cms";
import { cookies } from "next/headers";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return generateSeoMetadata();
  }

  const actualTitle = post.seoTitle || (post.title?.bn || post.title?.en);
  const actualDescription = post.seoDescription || (post.shortDescription?.bn || post.shortDescription?.en);
  const actualImage = post.thumbnailImage ? mediaUrl(post.thumbnailImage) : null;
  
  return generateSeoMetadata(actualTitle, actualDescription, actualImage, post.seoKeywords);
}

const BlogDetailsPage: FC<BlogDetailsPageProps> = async ({ params }) => {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "bn";

  const post = await fetchBlogBySlug(slug);
  const categorySlug = post?.mainCategory?.slug || post?.categories?.[0]?.slug || "";
  
  const initialCard = post ? postToCard(post, locale, "/blogs", 0) : null;
  const rawRelated = await fetchBlogs(4);
  const initialRelated = rawRelated
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p, index) => postToCard(p, locale, "/blogs", index + 1));

  return (
    <>
      <PageBanner
        adPosition={categorySlug ? `blog_category_${categorySlug}_detail_top` : "blogs_page_banner"}
        title="Blog"
        categoryType="blog"
        categorySlug={categorySlug}
      />

      <BlogDetails slug={slug} initialCard={initialCard} initialRelated={initialRelated} />
    </>
  );
};

export default BlogDetailsPage;
