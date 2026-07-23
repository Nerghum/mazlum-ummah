import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";
import "./header.skeleton.css";

const HeaderSkeleton = () => {
  return (
    <header className="minimal__layout__header css-1s2jhtx">
      <div className="css-1fmauag">
        <div className="css-0">
          <div className="minimal__logo__root css-15br4hf">
            <Skeleton w="100%" h="100%" rounded={0} />
          </div>
        </div>
        <div className="css-mxmcl7"></div>
        <nav className="css-pd4t8d">
          <ul className="css-11tjr9x">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="css-233int">
                <Skeleton w={72} h={18} rounded={4} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="css-gsxq48">
          <div className="css-1uxnsuq">
            <div className="css-0">
              <div className="header-skeleton__lang-toggle">
                <Skeleton w={45} h={30} rounded={6} />
                <Skeleton w={45} h={30} rounded={6} />
              </div>
            </div>
          </div>
          <div className="header-skeleton__hamburger">
            <Skeleton w={24} h={24} rounded={4} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
