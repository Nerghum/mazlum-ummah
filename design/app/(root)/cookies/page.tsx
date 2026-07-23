import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const CookiesPage = () => (
  <SectionBoundary id="cookies" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="cookies" />
  </SectionBoundary>
);

export default CookiesPage;
