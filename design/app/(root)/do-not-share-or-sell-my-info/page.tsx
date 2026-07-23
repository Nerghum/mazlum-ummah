import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const DoNotShareOrSellMyInfoPage = () => (
  <SectionBoundary id="do-not-share" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="doNotShare" />
  </SectionBoundary>
);

export default DoNotShareOrSellMyInfoPage;
