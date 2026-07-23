import { Skeleton } from "@/components/ui/skeleton";
import "./most-read.css";

export default function MostReadSkeleton() {
  return (
    <section className="css-1o3v5ug">
      <div className="css-79elbk">
        <div className="css-110y4y1">
          <strong className="css-a5e1ct">
            <span className="css-j7qwjs">
              <span className="css-127x8fy">
                <span className="css-17vg121">
                  <Skeleton h={22} w="40%" />
                </span>
              </span>
            </span>
          </strong>
        </div>
        <ul className="css-64y6r">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} role="listitem">
              <div className="css-qj66n0">
                <div className="css-i87o2a">
                  <Skeleton w="100%" h={0} style={{ paddingBottom: "56.25%" }} rounded={4} />
                </div>
                <div className="css-6cb6xm">
                  <div className="css-pgata9">
                    <Skeleton h={14} w="90%" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
