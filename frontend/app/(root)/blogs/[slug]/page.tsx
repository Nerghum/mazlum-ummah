import PageBanner from "@/components/page-banner";
import BlogDetails from "./components/blog-details";
import { FC } from "react";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogDetailsPage: FC<BlogDetailsPageProps> = async ({ params }) => {
  const { slug } = await params;
  return (
    <>
      <PageBanner
        adImageUrl="/banner.gif"
        adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        adPosition="page_banner"
      />

      <BlogDetails slug={slug} />
    </>
  );
};

export default BlogDetailsPage;
