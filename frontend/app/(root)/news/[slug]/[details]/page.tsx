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
        adImageUrl="/banner.gif"
        adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        adPosition="page_banner"
      />
      <NewsDetails slug={details} categorySlug={slug} />
    </>
  );
};

export default NewsDetailsPage;
