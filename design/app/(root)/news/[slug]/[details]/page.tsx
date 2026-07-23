import PageBanner from "@/components/page-banner";
import { FC } from "react";
import NewsDetails from "./components/news-details";
import SectionBoundary from "@/components/dev/section-boundary";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsDetailsSkeleton from "./components/news-details.skeleton";

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
      <SectionBoundary
        id="news-details-banner"
        fallback={<PageBannerSkeleton hasTitle={false} />}
        factor={0.5}
      >
        <PageBanner
          adImageUrl="/banner.gif"
          adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        />
      </SectionBoundary>
      <SectionBoundary id="news-details" fallback={<NewsDetailsSkeleton />}>
        <NewsDetails slug={slug} />
      </SectionBoundary>
    </>
  );
};

export default NewsDetailsPage;
