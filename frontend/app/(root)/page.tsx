import { fetchHomepageSections, fetchNews, mediaUrl, text } from "@/lib/cms";
import { cookies } from "next/headers";
import { GalleryItem } from "@/data/gallery-data";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/video";
import HomePageClient from "./home-page-client";

function categorySlug(post: any) {
  return post.mainCategory?.slug || post.categories?.[0]?.slug || "general";
}

const HomePage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "bn";

  const [sections, featuredPosts, posts] = await Promise.all([
    fetchHomepageSections(),
    fetchNews({ limit: 8, featuredNews: true }),
    fetchNews({ limit: 8 }),
  ]);

  const autoVideos: GalleryItem[] = posts.filter((post) => youtubeIdFromUrl(post.videoUrl || "")).map((post, index) => ({
    id: post._id,
    type: "video",
    category: categorySlug(post),
    year: new Date(post.publishDate || Date.now()).getFullYear(),
    src: youtubeThumbnailUrl(post.videoUrl || "") || mediaUrl(post.thumbnailImage, index),
    youtubeId: youtubeIdFromUrl(post.videoUrl || ""),
    title: text(post.title, locale),
    href: `/news/${categorySlug(post)}/${post.slug}`,
  }));

  return (
    <HomePageClient 
      sections={sections} 
      autoVideos={autoVideos} 
      autoHeroPosts={featuredPosts} 
    />
  );
};

export default HomePage;
