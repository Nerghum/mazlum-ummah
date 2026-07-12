import PageBanner from "@/components/page-banner";
import AdBanner from "@/components/ad-banner";
import BlogList from "../../components/bloglist";

type BlogCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogCategoryPage = async ({ params }: BlogCategoryPageProps) => {
  const { slug } = await params;

  return (
    <>
      <PageBanner title="Blogs" categoryType="blog" categorySlug={slug} />
      <AdBanner position={`blog_category_${slug}_banner`} showFallback={false} />
      <BlogList categorySlug={slug} />
    </>
  );
};

export default BlogCategoryPage;
