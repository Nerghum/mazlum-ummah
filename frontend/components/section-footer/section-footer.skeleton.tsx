import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";

/**
 * Keeps the real .section-footer__link box (fixed 3.125rem height, same padding
 * and border-radius) and only greys out its label + icon, so the button does
 * not resize when the real link mounts.
 */
const SectionFooterSkeleton = () => {
  return (
    <span className="section-footer__link" aria-hidden="true">
      <Skeleton h="1em" w="5em" style={{ opacity: 0.55 }} />
      <span className="section-footer__icon">
        <Skeleton w={20} h={20} circle style={{ opacity: 0.55 }} />
      </span>
    </span>
  );
};

export default SectionFooterSkeleton;
