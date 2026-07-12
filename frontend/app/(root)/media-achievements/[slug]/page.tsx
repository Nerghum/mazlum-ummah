import PageBanner from "@/components/page-banner";
import MediaAchievementDetails from "./media-achievement-details";
import { FC } from "react";

type MediaAchievementDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const MediaAchievementDetailsPage: FC<MediaAchievementDetailsPageProps> = async ({ params }) => {
  const { slug } = await params;
  return (
    <>
      <PageBanner title="Media Achievement" />
      <MediaAchievementDetails slug={slug} />
    </>
  );
};

export default MediaAchievementDetailsPage;
