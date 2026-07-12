import React from "react";
import NoContent from "@/components/no-content";
import type { CmsSocialPost } from "@/lib/cms";
import SocialCard from "./social-card";

const SocialFeed = ({ posts }: { posts: CmsSocialPost[] }) => {
  if (!posts.length) {
    return <NoContent title="No social posts found" description="Published social posts will appear here." />;
  }

  return (
    <div className="social-feed">
      {posts.map((post) => (
        <SocialCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SocialFeed;
