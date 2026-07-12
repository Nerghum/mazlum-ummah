import { notFound, redirect } from "next/navigation";
import { fetchShortlinkTarget } from "@/lib/cms";
import ShortlinkRedirect from "./shortlink-redirect";

type ShortlinkPageProps = {
  params: Promise<{
    shortCode: string;
  }>;
};

const ShortlinkPage = async ({ params }: ShortlinkPageProps) => {
  const { shortCode } = await params;

  if (!/^[A-Za-z0-9_-]{3,32}$/.test(shortCode)) {
    notFound();
  }

  const target = await fetchShortlinkTarget(shortCode);
  if (target?.url) {
    redirect(target.url);
  }

  return <ShortlinkRedirect shortCode={shortCode} />;
};

export default ShortlinkPage;
