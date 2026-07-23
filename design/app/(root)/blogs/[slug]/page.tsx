import PageBanner from "@/components/page-banner";
import BlogDetails from "./components/blog-details";
import { FC } from "react";
import SectionBoundary from "@/components/dev/section-boundary";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogDetailsSkeleton from "./components/blog-details.skeleton";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogDetailsPage: FC<BlogDetailsPageProps> = async ({ params }) => {
  const { slug } = await params;
  return (
    <>
      <SectionBoundary
        id="blog-details-banner"
        fallback={<PageBannerSkeleton hasTitle={false} />}
        factor={0.5}
      >
        <PageBanner
          adImageUrl="/banner.gif"
          adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        />
      </SectionBoundary>

      <SectionBoundary id="blog-details" fallback={<BlogDetailsSkeleton />}>
        <BlogDetails />
      </SectionBoundary>
    </>
  );
};

export default BlogDetailsPage;
