import PageBanner from "@/components/page-banner";
import BlogDetails from "./components/blog-details";
import { FC } from "react";
import { fetchBlogBySlug } from "@/lib/cms";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogDetailsPage: FC<BlogDetailsPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  const categorySlug = post?.mainCategory?.slug || post?.categories?.[0]?.slug || "";

  return (
    <>
      <PageBanner
        adPosition={categorySlug ? `blog_category_${categorySlug}_detail_top` : "blogs_page_banner"}
        title="Blog"
        categoryType="blog"
        categorySlug={categorySlug}
      />

      <BlogDetails slug={slug} />
    </>
  );
};

export default BlogDetailsPage;
