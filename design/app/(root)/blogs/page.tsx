import React from "react";
import BlogList from "./components/bloglist";
import BlogListHero from "./components/bloglist-hero";
import SectionBoundary from "@/components/dev/section-boundary";
import BlogListSkeleton from "./components/bloglist.skeleton";

const BlogsListingPage = () => {
  return (
    <>
      {/* Hero renders immediately — no skeleton by design. */}
      <BlogListHero />
      <SectionBoundary id="blogs-list" fallback={<BlogListSkeleton />}>
        <BlogList />
      </SectionBoundary>
    </>
  );
};

export default BlogsListingPage;
