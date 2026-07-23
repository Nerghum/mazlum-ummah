import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import GalleryGridSkeleton from "./components/gallery-grid.skeleton";
import GallerySidebarSkeleton from "./components/gallery-sidebar.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <section className="MuiBox-root css-1evun54">
        <div className="gallery-layout-container">
          <div className="gallery-sidebar-wrapper">
            <GallerySidebarSkeleton />
          </div>
          <div className="gallery-grid-wrapper">
            <GalleryGridSkeleton />
          </div>
        </div>
      </section>
    </>
  );
}
