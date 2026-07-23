import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const TermsAndConditions = () => (
  <SectionBoundary id="terms-and-conditions" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="mazlumPolicy" />
  </SectionBoundary>
);

export default TermsAndConditions;
