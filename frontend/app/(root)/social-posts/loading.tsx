import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import SocialFeedSkeleton from "./components/social-feed.skeleton";
import SocialSidebarSkeleton from "./components/social-sidebar.skeleton";
import Wrapper from "@/components/wrapper";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <div className="social-posts-page">
        <Wrapper className="social-posts-container">
          <div className="social-layout">
            <div className="social-main-content">
              <SocialFeedSkeleton />
            </div>
            <aside className="social-sidebar-content">
              <SocialSidebarSkeleton />
            </aside>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
