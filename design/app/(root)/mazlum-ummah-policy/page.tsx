import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const MazlumUmmahPolicyPage = () => (
  <SectionBoundary id="mazlum-ummah-policy" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="mazlumPolicy" />
  </SectionBoundary>
);

export default MazlumUmmahPolicyPage;
