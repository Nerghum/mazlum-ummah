import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import styles from "./footer.skeleton.module.css";

const FooterSkeleton = () => {
  return (
    <footer className={styles["footer-wrapper"]}>
      <section className={styles["footer-inner"]}>
        <div className={styles["footer-top"]}>
          <div className={styles["footer-brand"]}>
            <Skeleton w={100} h={63} rounded={0} />
            <SkeletonText lines={3} lastWidth="70%" className={styles["footer-description"]} />
            <div className={styles["footer-social-desktop"]}>
              <div className={styles["footer-social-row"]}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} w={40} h={40} circle />
                ))}
              </div>
            </div>
          </div>
          <div className={styles["footer-links-grid"]}>
            {Array.from({ length: 3 }).map((_, colIdx) => (
              <div key={colIdx} className={styles["footer-link-column"]}>
                <Skeleton w={100} h={20} rounded={4} />
                <div className={styles["footer-links-list"]}>
                  {Array.from({ length: colIdx === 2 ? 7 : 4 }).map((_, i) => (
                    <Skeleton key={i} w={i % 3 === 2 ? "55%" : "80%"} h={14} rounded={4} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles["footer-bottom"]}>
        <div className={styles["footer-social-mobile"]}>
          <div className={styles["footer-social-row"]}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} w={40} h={40} circle />
            ))}
          </div>
        </div>
        <div className={styles["footer-bottom-row"]}>
          <Skeleton w={200} h={14} rounded={4} />
          <div className={styles["footer-developed"]}>
            <Skeleton w={80} h={14} rounded={4} />
            <Skeleton w={110} h={30} rounded={4} />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default FooterSkeleton;
