"use client";
import SocialFeedSkeleton from "./components/social-feed.skeleton";
import SocialSidebarSkeleton from "./components/social-sidebar.skeleton";


import React, { useEffect, useMemo, useState } from "react";
import PageBanner from "@/components/page-banner";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import Wrapper from "@/components/wrapper";
import { useTranslations } from "@/hooks/use-translations";
import { fetchSocialPosts, type CmsSocialPost } from "@/lib/cms";
import "@/components/gallery-modal.css";
import "./components/style.css";
import SocialFeed from "./components/social-feed";
import SocialSidebar from "./components/social-sidebar";

const SocialPostsPage = () => {
  const t = useTranslations();
  const [posts, setPosts] = useState<CmsSocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSocialPosts(60).then(setPosts).finally(() => setLoading(false));
  }, []);

  const sidebarImages = useMemo(
    () => posts.flatMap((post) => post.images || []).slice(0, 9),
    [posts]
  );

  if (loading) {
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

  return (
    <>
      <PageBanner
        adPosition="social_posts_page_banner"
        title={t("nav.socialPosts")}
        subtitle={t("media.description")}
      />

      <div className="social-posts-page">
        <Wrapper className="social-posts-container">
          <div className="social-layout">
            <div className="social-main-content">
              <SocialFeed posts={posts} />
            </div>
            <aside className="social-sidebar-content">
              <SocialSidebar images={sidebarImages} />
            </aside>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SocialPostsPage;
