"use client";

import React, { useEffect, useMemo, useState } from "react";
import PageBanner from "@/components/page-banner";
import Wrapper from "@/components/wrapper";
import { useTranslations } from "@/hooks/use-translations";
import { fetchSocialPosts, type CmsSocialPost } from "@/lib/cms";
import { SkeletonSocialPostsPage } from "@/components/skeleton-loader";
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
              {loading ? <SkeletonSocialPostsPage /> : <SocialFeed posts={posts} />}
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
