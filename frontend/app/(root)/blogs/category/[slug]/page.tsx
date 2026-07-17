import PageBanner from "@/components/page-banner";
import AdBanner from "@/components/ad-banner";
import BlogList from "../../components/bloglist";
import { fetchCategory, generateSeoMetadata, mediaUrl } from "@/lib/cms";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type BlogCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory("blog", slug);

  if (!category) {
    return generateSeoMetadata();
  }

  const actualTitle = category.seoTitle || category.nameBn || category.name;
  const actualDescription = category.seoDescription || category.description;
  const actualImage = category.image ? mediaUrl(category.image) : null;
  
  return generateSeoMetadata(actualTitle, actualDescription, actualImage, category.seoKeywords);
}

const BlogCategoryPage = async ({ params }: BlogCategoryPageProps) => {
  const { slug } = await params;

  const category = await fetchCategory("blog", slug);
  if (!category) {
    notFound();
  }

  return (
    <>
      <PageBanner title="Blogs" categoryType="blog" categorySlug={slug} />
      <AdBanner position={`blog_category_${slug}_banner`} showFallback={false} />
      <BlogList categorySlug={slug} />
    </>
  );
};

export default BlogCategoryPage;
