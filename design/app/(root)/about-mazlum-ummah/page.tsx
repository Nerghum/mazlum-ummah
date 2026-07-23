import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const AboutMazlumUmmahPage = () => (
  <SectionBoundary id="about" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="about" />
  </SectionBoundary>
);

export default AboutMazlumUmmahPage;
