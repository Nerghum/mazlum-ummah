import InfoPage from "@/components/info-page";
import SectionBoundary from "@/components/dev/section-boundary";
import InfoPageSkeleton from "@/components/info-page/info-page.skeleton";

const ExternalLinksPolicyPage = () => (
  <SectionBoundary id="external-links-policy" fallback={<InfoPageSkeleton />}>
    <InfoPage pageKey="externalLinks" />
  </SectionBoundary>
);

export default ExternalLinksPolicyPage;
