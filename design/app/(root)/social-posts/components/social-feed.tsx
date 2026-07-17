import React from "react";
import SocialCard, { SocialPost } from "./social-card";

const SocialFeed = ({ posts }: { posts: SocialPost[] }) => {
  return (
    <div className="social-feed">
      {posts.map((post) => (
        <SocialCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SocialFeed;
