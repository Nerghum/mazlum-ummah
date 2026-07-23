import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const CopyrightPolicyPage = () => (
  <SectionBoundary id="copyright-policy" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="copyright" />
  </SectionBoundary>
);

export default CopyrightPolicyPage;
