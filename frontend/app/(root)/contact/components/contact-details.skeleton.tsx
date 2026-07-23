import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import "./style.css";

export default function ContactDetailsSkeleton() {
  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiBox-root css-1l0ngya">
        <div className="MuiBox-root css-1140a14">
          <Skeleton h={24} w="30%" />
          <form autoComplete="off">
            <div className="MuiStack-root css-1datsl3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="MuiStack-root css-1sb3j1f">
                  <div className="MuiStack-root css-u4p24i">
                    <Skeleton h={14} w={i === 0 ? "15%" : "25%"} />
                  </div>
                  <div className="MuiBox-root css-1jke4yk">
                    <Skeleton h={50} w="100%" rounded={8} />
                  </div>
                </div>
              ))}
              <div className="MuiStack-root css-1sb3j1f">
                <div className="MuiStack-root css-u4p24i">
                  <Skeleton h={14} w="20%" />
                </div>
                <div className="MuiBox-root css-1jke4yk">
                  <Skeleton h={264} w="100%" rounded={8} />
                </div>
              </div>
            </div>
            <div className="MuiBox-root css-8owaep">
              <Skeleton h={44} w="100%" rounded={8} />
            </div>
          </form>
        </div>

        <div className="contact-sidebar">
          <Skeleton h={20} w="30%" className="contact-sidebar__heading" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="contact-info-card">
              <div className="contact-info-card__icon">
                <Skeleton w={40} h={40} circle />
              </div>
              <div className="contact-info-card__body">
                <Skeleton h={12} w="40%" />
                <Skeleton h={14} w="60%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-bottom">
        <div className="contact-guidelines">
          <div className="contact-guidelines__bar" />
          <Skeleton h={22} w="40%" className="contact-guidelines__title" />
          <SkeletonText lines={2} lastWidth="70%" gap={6} className="contact-guidelines__desc" />
          <div className="contact-guidelines__cards">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="contact-guidelines__card">
                <div className="contact-guidelines__card-icon">
                  <Skeleton w={40} h={40} circle />
                </div>
                <div className="contact-guidelines__card-body">
                  <Skeleton h={16} w="60%" />
                  <SkeletonText lines={2} lastWidth="50%" gap={4} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-faq-box">
          <Skeleton h={20} w="50%" className="contact-faq-box__title" />
          <div className="contact-faq-box__list">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="contact-faq-box__item">
                <div className="contact-faq-box__question">
                  <Skeleton h={16} w="80%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
