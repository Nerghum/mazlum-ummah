"use client";

import Image from "next/image";
import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import { useSiteSettings } from "@/hooks/use-site-settings";
import "./style.css";

type InfoPageKey =
  | "about"
  | "privacy"
  | "cookies"
  | "doNotShare"
  | "externalLinks"
  | "mazlumPolicy"
  | "copyright";

type InfoSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

type InfoPageContent = {
  title: string;
  summary: string;
  sections: InfoSection[];
};

const InfoPage = ({ pageKey }: { pageKey: InfoPageKey }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const settings = useSiteSettings();
  const pages = t("infoPages.pages") as Record<InfoPageKey, InfoPageContent>;
  const content = pages[pageKey];

  const dynamicTitle = settings[`policy.${pageKey}.${locale}.title`] as string | undefined;
  const dynamicSubtitle = settings[`policy.${pageKey}.${locale}.subtitle`] as string | undefined;
  const dynamicContent = settings[`policy.${pageKey}.${locale}.content`] as string | undefined;
  
  const hasDynamicContent = dynamicContent && dynamicContent !== "<p><br></p>" && dynamicContent.trim() !== "";

  return (
    <>
      <PageBanner
        title={dynamicTitle || content.title}
        subtitle={dynamicSubtitle || content.summary}
        adPosition={`${pageKey}_page_banner`}
      />
      <section className="info-page">
        <div className="info-page__grid">
          <article className="info-page__main">
            {hasDynamicContent ? (
              <div 
                className="info-page__dynamic-content"
                dangerouslySetInnerHTML={{ __html: dynamicContent }}
              />
            ) : (
              content.sections.map((section) => (
                <section key={section.heading} className="info-page__section">
                  <h2 className="info-page__heading">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="info-page__text">
                      {paragraph}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="info-page__list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))
            )}
          </article>

          <aside className="info-page__sidebar" aria-label="Related information">
            <div className="info-page__share-card">
              <p className="info-page__sidebar-label">{t("common.share")}</p>
              <div className="info-page__share-actions">
                <button className="info-page__share-button" type="button" aria-label="Facebook">
                  <span className="info-page__share-loading"></span>
                  <svg
                    className="info-page__share-icon"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g opacity="0.8">
                      <path
                        d="M8.07969 11.0405C8.01969 11.0405 6.69969 11.0405 6.09969 11.0405C5.77969 11.0405 5.67969 10.9205 5.67969 10.6205C5.67969 9.82051 5.67969 9.00051 5.67969 8.20051C5.67969 7.88051 5.79969 7.78051 6.09969 7.78051H8.07969C8.07969 7.72051 8.07969 6.56051 8.07969 6.02051C8.07969 5.22051 8.21969 4.46051 8.61969 3.76051C9.03969 3.04051 9.63969 2.56051 10.3997 2.28051C10.8997 2.10051 11.3997 2.02051 11.9397 2.02051H13.8997C14.1797 2.02051 14.2997 2.14051 14.2997 2.42051V4.70051C14.2997 4.98051 14.1797 5.10051 13.8997 5.10051C13.3597 5.10051 12.8197 5.10051 12.2797 5.12051C11.7397 5.12051 11.4597 5.38051 11.4597 5.94051C11.4397 6.54051 11.4597 7.12051 11.4597 7.74051H13.7797C14.0997 7.74051 14.2197 7.86051 14.2197 8.18051V10.6005C14.2197 10.9205 14.1197 11.0205 13.7797 11.0205C13.0597 11.0205 11.5197 11.0205 11.4597 11.0205V17.5405C11.4597 17.8805 11.3597 18.0005 10.9997 18.0005C10.1597 18.0005 9.33969 18.0005 8.49969 18.0005C8.19969 18.0005 8.07969 17.8805 8.07969 17.5805C8.07969 15.4805 8.07969 11.1005 8.07969 11.0405Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button className="info-page__share-button" type="button" aria-label="LinkedIn">
                  <span className="info-page__share-loading"></span>
                  <svg
                    className="info-page__share-icon"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16927 7.50488H3.7526C2.96693 7.50488 2.5741 7.50488 2.33001 7.74896C2.08594 7.99304 2.08594 8.38588 2.08594 9.17155V16.2549C2.08594 17.0406 2.08594 17.4334 2.33001 17.6775C2.5741 17.9215 2.96693 17.9215 3.7526 17.9215H4.16927C4.95495 17.9215 5.34778 17.9215 5.59186 17.6775C5.83594 17.4334 5.83594 17.0406 5.83594 16.2549V9.17155C5.83594 8.38588 5.83594 7.99304 5.59186 7.74896C5.34778 7.50488 4.95495 7.50488 4.16927 7.50488Z"
                      fill="white"
                    ></path>
                    <path
                      d="M5.83594 3.95801C5.83594 4.99354 4.99647 5.83301 3.96094 5.83301C2.9254 5.83301 2.08594 4.99354 2.08594 3.95801C2.08594 2.92247 2.9254 2.08301 3.96094 2.08301C4.99647 2.08301 5.83594 2.92247 5.83594 3.95801Z"
                      fill="white"
                    ></path>
                    <path
                      d="M9.855 7.50488H9.16667C8.381 7.50488 7.98816 7.50488 7.74407 7.74896C7.5 7.99304 7.5 8.38588 7.5 9.17155V16.2549C7.5 17.0406 7.5 17.4334 7.74407 17.6775C7.98816 17.9215 8.381 17.9215 9.16667 17.9215H9.58333C10.369 17.9215 10.7618 17.9215 11.0059 17.6775C11.25 17.4334 11.25 17.0406 11.25 16.2549L11.2501 13.3383C11.2501 11.9576 11.6901 10.8383 12.9899 10.8383C13.6398 10.8383 14.1667 11.398 14.1667 12.0883V15.8383C14.1667 16.624 14.1667 17.0168 14.4107 17.2609C14.6547 17.505 15.0477 17.505 15.8333 17.505H16.2489C17.0344 17.505 17.4272 17.505 17.6712 17.261C17.9153 17.017 17.9154 16.6242 17.9156 15.8387L17.9167 11.255C17.9167 9.18405 15.947 7.50508 13.9973 7.50508C12.8874 7.50508 11.8973 8.04912 11.2501 8.89988C11.25 8.3748 11.25 8.11232 11.136 7.91738C11.0638 7.79393 10.9609 7.69116 10.8375 7.61894C10.6426 7.50488 10.3801 7.50488 9.855 7.50488Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="info-page__share-ripple"></span>
                </button>
                <button className="info-page__share-button" type="button" aria-label="X">
                  <span className="info-page__share-loading"></span>
                  <svg
                    className="info-page__share-icon"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M1.96408 2.32249C2.10299 2.05082 2.38238 1.87988 2.6875 1.87988H6.75C7.0109 1.87988 7.25593 2.00517 7.40868 2.21667L17.9712 16.8416C18.1498 17.089 18.1748 17.4156 18.0359 17.6873C17.897 17.959 17.6176 18.1299 17.3125 18.1299H13.25C12.9891 18.1299 12.7441 18.0046 12.5913 17.7931L2.02883 3.16809C1.85018 2.92074 1.82518 2.59416 1.96408 2.32249Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M2.11298 16.7429L16.738 2.11786C17.0552 1.80056 17.5697 1.80056 17.887 2.11786C18.2043 2.43516 18.2043 2.94961 17.887 3.26691L3.26202 17.8919C2.94473 18.2092 2.43028 18.2092 2.11298 17.8919C1.79568 17.5746 1.79568 17.0601 2.11298 16.7429Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="info-page__share-ripple"></span>
                </button>
              </div>
            </div>

            <div className="info-page__donation-card">
              <h3>{t("common.letsBringChange")}</h3>
              <a className="info-page__donate-button" href="https://hcsb.org.bd/donate" target="_blank" rel="noopener noreferrer">
                {t("common.donate")}
              </a>
              <a className="info-page__volunteer-button" href="https://hcsb.org.bd/get-involved" target="_blank" rel="noopener noreferrer">
                {t("common.volunteer")}
              </a>
            </div>

            <div className="info-page__ad-card">
              <a
                href="https://business.linkedin.com/advertise/ads/ads-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaKi7B80ISUUx4uWgEbro_Ih_O37469RI-Q&s"
                  alt={t("common.advertisement") as string}
                  width={300}
                  height={250}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default InfoPage;
