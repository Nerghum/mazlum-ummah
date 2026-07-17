import PageBanner from "@/components/page-banner";
import { FC } from "react";
import NewsDetails from "./components/news-details";

type NewsDetailsPageProps = {
  params: Promise<{
    slug: string;
    details: string;
  }>;
};

const NewsDetailsPage: FC<NewsDetailsPageProps> = async ({ params }) => {
  const { slug, details } = await params;
  return (
    <>
      <PageBanner
        adPosition={`news_category_${slug}_detail_top`}
        title="News"
        categoryType="news"
        categorySlug={slug}
      />
      <NewsDetails slug={details} categorySlug={slug} />
    </>
  );
};

export default NewsDetailsPage;
