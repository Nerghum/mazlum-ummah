import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";
import "./newsletter.skeleton.css";

const NewsletterSkeleton = () => {
  return (
    <section className="css-budoz5">
      <section className="css-vyws4f">
        <div className="newsletter-skeleton__heading">
          <Skeleton w={280} h={24} rounded={4} style={{ margin: "0 auto 2rem" }} />
        </div>
        <div className="newsletter-skeleton__form">
          <Skeleton w="100%" h={50} rounded={10} style={{ flex: 1 }} />
          <Skeleton w={100} h={50} rounded={7} style={{ flexShrink: 0 }} />
        </div>
      </section>
    </section>
  );
};

export default NewsletterSkeleton;
