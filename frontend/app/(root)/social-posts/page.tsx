"use client";

import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/components/hero";
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
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Social posts header background"
        badge={t("nav.socialPosts")}
        title={t("nav.socialPosts")}
        description={t("media.description")}
        compact
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
