const fs = require('fs');

const files = {
  "frontend/app/loading.tsx": `import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Loading() {
  return (
    <div className="loading-container">
      <div>
        <Image
          src={logo}
          alt="Mazlum Ummah"
          width={120}
          height={120}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
`,
  "frontend/app/(root)/blogs/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogListSkeleton from "./components/bloglist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <BlogListSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/blogs/[slug]/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogDetailsSkeleton from "./components/blog-details.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <BlogDetailsSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/latest-news/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsListSkeleton from "@/app/(root)/news/[slug]/components/newslist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <NewsListSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/gallery/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import GalleryGridSkeleton from "./components/gallery-grid.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <GalleryGridSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/media-achievements/loading.tsx": `import MediaAchievementPageSkeleton from "./page.skeleton";

export default function Loading() {
  return <MediaAchievementPageSkeleton />;
}
`,
  "frontend/app/(root)/news/[slug]/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsListSkeleton from "./components/newslist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <NewsListSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/news/[slug]/[details]/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsDetailsSkeleton from "./components/news-details.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <NewsDetailsSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/notice/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NoContentSkeleton from "@/components/no-content/no-content.skeleton";
import SectionBoundary from "@/components/dev/section-boundary";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <SectionBoundary id="notice-content" fallback={<NoContentSkeleton />}>
        <NoContentSkeleton />
      </SectionBoundary>
    </>
  );
}
`,
  "frontend/app/(root)/social-posts/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import SocialFeedSkeleton from "./components/social-feed.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <SocialFeedSkeleton />
    </>
  );
}
`,
  "frontend/app/(root)/todays-news/loading.tsx": `import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsListSkeleton from "@/app/(root)/news/[slug]/components/newslist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <NewsListSkeleton />
    </>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content);
  console.log("Updated", filePath);
}
