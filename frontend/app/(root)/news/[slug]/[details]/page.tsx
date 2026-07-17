import PageBanner from "@/components/page-banner";
import { FC } from "react";
import { Metadata } from "next";
import NewsDetails from "./components/news-details";
import { fetchNewsBySlug, generateSeoMetadata, mediaUrl, postToCard } from "@/lib/cms";
import { cookies } from "next/headers";

type NewsDetailsPageProps = {
  params: Promise<{
    slug: string;
    details: string;
  }>;
};

export async function generateMetadata({ params }: NewsDetailsPageProps): Promise<Metadata> {
  const { details } = await params;
  const post = await fetchNewsBySlug(details);

  if (!post) {
    return generateSeoMetadata();
  }

  const actualTitle = post.seoTitle || (post.title?.bn || post.title?.en);
  const actualDescription = post.seoDescription || (post.shortDescription?.bn || post.shortDescription?.en);
  const actualImage = post.thumbnailImage ? mediaUrl(post.thumbnailImage) : null;
  
  return generateSeoMetadata(actualTitle, actualDescription, actualImage, post.seoKeywords);
}

const NewsDetailsPage: FC<NewsDetailsPageProps> = async ({ params }) => {
  const { slug, details } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "bn";

  const post = await fetchNewsBySlug(details);
  const initialCard = post ? postToCard(post, locale, `/news/${slug || "general"}`, 0) : null;

  return (
    <>
      <PageBanner
        adPosition={`news_category_${slug}_detail_top`}
        title="News"
        categoryType="news"
        categorySlug={slug}
      />
      <NewsDetails slug={details} categorySlug={slug} initialCard={initialCard} />
    </>
  );
};

export default NewsDetailsPage;
