import Footer from "@/components/footer";
import Header from "@/components/header";
import AnalyticsTracker from "@/components/analytics-tracker";
import NewsCategoryBar from "@/components/home/news-category-bar";
import Newsletter from "@/components/newsletter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AnalyticsTracker />
      <NewsCategoryBar />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
}
