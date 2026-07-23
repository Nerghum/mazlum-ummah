import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const PrivacyPolicy = () => (
  <SectionBoundary id="privacy-policy" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="privacy" />
  </SectionBoundary>
);

export default PrivacyPolicy;
