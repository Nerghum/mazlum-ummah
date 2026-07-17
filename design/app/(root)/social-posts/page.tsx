"use client";

import React from "react";
import Hero from "@/components/hero";
import Wrapper from "@/components/wrapper";
import SocialFeed from "./components/social-feed";
import { SocialPost } from "./components/social-card";
import SocialSidebar from "./components/social-sidebar";
import { useTranslations } from "@/hooks/use-translations";
import "@/components/gallery-modal.css";
import "./components/style.css";

const POSTS: SocialPost[] = [
  {
    id: "v1",
    type: "video",
    author: {
      name: "Mazlum Ummah-মজলুম উম্মাহ",
      avatar: "/logo.png",
    },
    timestamp: "1h",
    content: "মজলুম উম্মাহর বিশেষ প্রতিবেদন",
    hashtags: ["#মজলুম_উম্মাহ", "#Syrian", "#syriaisraelconflict"],
    youtubeId: "4LXnIpuIYgA",
    videoThumbnail: "/assets/posts/image-copy-6.png",
  },
  {
    id: "1",
    type: "image",
    author: {
      name: "Mazlum Ummah-মজলুম উম্মাহ",
      avatar: "/logo.png",
    },
    timestamp: "3h",
    content:
      "Team Mazlum Ummah - মজলুম উম্মাহ\nবিশ্ব মজলুমের কণ্ঠস্বর | The Voice of the Persecuted Muslim World",
    hashtags: [
      "#মজলুম_উম্মাহ",
      "#MuftiRezwanRafiqi",
      "#VoiceOfTheVoiceless",
      "#HumanitarianJournalism",
      "#HCSB",
      "#MazlumUmmah",
    ],
    images: [
      "/assets/posts/image-copy.png",
      "/assets/posts/image-copy-2.png",
      "/assets/posts/image-copy-3.png",
      "/assets/posts/image-copy-4.png",
    ],
  },
  {
    id: "2",
    type: "image",
    author: {
      name: "Mazlum Ummah-মজলুম উম্মাহ",
      avatar: "/logo.png",
    },
    timestamp: "4h",
    content: "সিরিয়া ইরান-ইসরায়েল উত্তেজনা",
    hashtags: ["#IRGC", "#IraqNews", "#IranConflict", "#MiddleEastNews"],
    images: ["/assets/posts/image-copy-5.png"],
  },
];

const SocialPostsPage = () => {
  const t = useTranslations();

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="অফিস স্পেসের হেডার ব্যাকগ্রাউন্ড"
        badge={t("media.pressHighlights")}
        title={
          <>
            {t("media.creatingHeadlines")} {t("media.buildingDigitalAge")}
          </>
        }
        description={t("media.description")}
        compact
      />

      <div className="social-posts-page">
        <Wrapper className="social-posts-container">
          <div className="social-layout">
            <div className="social-main-content">
              <SocialFeed posts={POSTS} />
            </div>
            <aside className="social-sidebar-content">
              <SocialSidebar />
            </aside>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SocialPostsPage;
