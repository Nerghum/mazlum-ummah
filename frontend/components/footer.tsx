"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import SiteLogo from "@/components/site-logo";
import { useSiteSettings } from "@/hooks/use-site-settings";
import styles from "../styles/footer.module.css";

const FacebookIcon = () => (
  <svg className="css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <g opacity="0.8">
      <path d="M8.07969 11.0405C8.01969 11.0405 6.69969 11.0405 6.09969 11.0405C5.77969 11.0405 5.67969 10.9205 5.67969 10.6205C5.67969 9.82051 5.67969 9.00051 5.67969 8.20051C5.67969 7.88051 5.79969 7.78051 6.09969 7.78051H8.07969C8.07969 7.72051 8.07969 6.56051 8.07969 6.02051C8.07969 5.22051 8.21969 4.46051 8.61969 3.76051C9.03969 3.04051 9.63969 2.56051 10.3997 2.28051C10.8997 2.10051 11.3997 2.02051 11.9397 2.02051H13.8997C14.1797 2.02051 14.2997 2.14051 14.2997 2.42051V4.70051C14.2997 4.98051 14.1797 5.10051 13.8997 5.10051C13.3597 5.10051 12.8197 5.10051 12.2797 5.12051C11.7397 5.12051 11.4597 5.38051 11.4597 5.94051C11.4397 6.54051 11.4597 7.12051 11.4597 7.74051H13.7797C14.0997 7.74051 14.2197 7.86051 14.2197 8.18051V10.6005C14.2197 10.9205 14.1197 11.0205 13.7797 11.0205C13.0597 11.0205 11.5197 11.0205 11.4597 11.0205V17.5405C11.4597 17.8805 11.3597 18.0005 10.9997 18.0005C10.1597 18.0005 9.33969 18.0005 8.49969 18.0005C8.19969 18.0005 8.07969 17.8805 8.07969 17.5805C8.07969 15.4805 8.07969 11.1005 8.07969 11.0405Z" fill="currentColor" />
    </g>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <path d="M9.99752 2.30176C8.44868 2.30176 6.9606 2.45472 5.57812 2.73654L5.47205 2.75814C3.89319 3.0795 2.84119 3.29362 1.93464 4.45919C1.03783 5.61224 1.03833 6.94942 1.03911 9.02042V10.9998C1.03833 13.0708 1.03783 14.4079 1.93464 15.561C2.84119 16.7266 3.89319 16.9407 5.47205 17.262L5.57812 17.2837C6.9606 17.5654 8.44868 17.7184 9.99752 17.7184C11.5463 17.7184 13.0343 17.5654 14.4168 17.2837L14.5229 17.262C16.1018 16.9407 17.1538 16.7266 18.0603 15.561C18.9572 14.4079 18.9567 13.0708 18.9558 10.9998V9.02042C18.9567 6.94942 18.9572 5.61224 18.0603 4.45919C17.1538 3.29362 16.1018 3.0795 14.5229 2.75814L14.4168 2.73654C13.0343 2.45472 11.5463 2.30176 9.99752 2.30176Z" fill="white" />
    <path d="M11.0083 7.71987C10.3666 7.36145 9.84166 7.06831 9.40958 6.88696C8.70708 6.59214 7.96216 6.56829 7.3499 7.06994C6.9667 7.38391 6.83124 7.83348 6.77181 8.28653C6.62811 9.38193 6.62818 10.6388 6.77181 11.7337C6.83124 12.1867 6.9667 12.6363 7.3499 12.9503C7.96216 13.4519 8.70708 13.428 9.40958 13.1333C9.84175 12.9518 10.3666 12.6588 11.0083 12.3003C11.5099 12.0203 12.0253 11.7515 12.4932 11.4151C12.8429 11.1637 13.1747 10.8521 13.2845 10.3977C13.3462 10.1426 13.3462 9.87759 13.2845 9.62251C13.1747 9.16809 12.8429 8.85651 12.4932 8.60509C12.0253 8.26867 11.5099 7.99996 11.0083 7.71987Z" fill="#0F2920" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <path d="M10 2.08c2.15 0 2.42.01 3.27.05.8.04 1.23.17 1.52.28.38.15.65.32.94.61.29.29.46.56.61.94.11.29.24.72.28 1.52.04.85.05 1.12.05 3.27s-.01 2.42-.05 3.27c-.04.8-.17 1.23-.28 1.52-.15.38-.32.65-.61.94-.29.29-.56.46-.94.61-.29.11-.72.24-1.52.28-.85.04-1.12.05-3.27.05s-2.42-.01-3.27-.05c-.8-.04-1.23-.17-1.52-.28a2.53 2.53 0 0 1-.94-.61 2.53 2.53 0 0 1-.61-.94c-.11-.29-.24-.72-.28-1.52-.04-.85-.05-1.12-.05-3.27s.01-2.42.05-3.27c.04-.8.17-1.23.28-1.52.15-.38.32-.65.61-.94.29-.29.56-.46.94-.61.29-.11.72-.24 1.52-.28.85-.04 1.12-.05 3.27-.05Zm0-1.46c-2.19 0-2.46.01-3.34.05-.87.04-1.47.18-1.99.38-.54.21-1 .49-1.46.95-.46.46-.74.92-.95 1.46-.2.52-.34 1.12-.38 1.99-.04.88-.05 1.15-.05 3.34s.01 2.46.05 3.34c.04.87.18 1.47.38 1.99.21.54.49 1 .95 1.46.46.46.92.74 1.46.95.52.2 1.12.34 1.99.38.88.04 1.15.05 3.34.05s2.46-.01 3.34-.05c.87-.04 1.47-.18 1.99-.38.54-.21 1-.49 1.46-.95.46-.46.74-.92.95-1.46.2-.52.34-1.12.38-1.99.04-.88.05-1.15.05-3.34s-.01-2.46-.05-3.34c-.04-.87-.18-1.47-.38-1.99-.21-.54-.49-1-.95-1.46-.46-.46-.92-.74-1.46-.95-.52-.2-1.12-.34-1.99-.38C12.46.63 12.19.62 10 .62Z" fill="currentColor" />
    <path d="M10 4.67a5.33 5.33 0 1 0 0 10.66A5.33 5.33 0 0 0 10 4.67Zm0 9.2a3.87 3.87 0 1 1 0-7.74 3.87 3.87 0 0 1 0 7.74Z" fill="currentColor" />
    <path d="M15.5 4.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" fill="currentColor" />
  </svg>
);

function SocialLinks({
  facebookUrl,
  youtubeUrl,
  instagramUrl,
}: {
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
}) {
  return (
    <div className={styles["footer-social-row"]}>
      <a className={styles["footer-social-link"]} href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a className={styles["footer-social-link"]} href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
        <YoutubeIcon />
      </a>
      <a className={styles["footer-social-link"]} href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <InstagramIcon />
      </a>
    </div>
  );
}

const Footer = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const settings = useSiteSettings();
  const facebookUrl = settings["site.facebookUrl"] || "https://www.facebook.com/mazlumummah";
  const youtubeUrl = settings["site.youtubeUrl"] || "https://www.youtube.com/@MazlumUmmah";
  const instagramUrl = settings["site.instagramUrl"] || "https://www.instagram.com/mazlumummah";
  const externalLinksHref = "https://mazlum-ummah.vercel.app/external-links-policy";
  const isBn = locale === "bn";

  return (
    <footer className={styles["footer-wrapper"]}>
      <section className={styles["footer-inner"]}>
        <div className={styles["footer-top"]}>
          <div className="css-0">
            <Link className="css-0" href="/">
              <span className={`minimal__logo__root ${styles["footer-logo"]}`} aria-label="Logo">
                <SiteLogo />
              </span>
            </Link>
            <p className={styles["footer-description"]}>{settings["site.description"] || t("footer.description")}</p>
            <div className={styles["footer-social-desktop"]}>
              <SocialLinks facebookUrl={facebookUrl} youtubeUrl={youtubeUrl} instagramUrl={instagramUrl} />
            </div>
          </div>
          <div className={styles["footer-links-grid"]}>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.menu")}</p>
              <div className={styles["footer-links-list"]}>
                <Link className={styles["footer-link"]} href="/about-mazlum-ummah">
                  {t("footer.aboutUs")}
                </Link>
                <Link className={styles["footer-link"]} href="/todays-news">
                  {isBn ? "আজকের সংবাদ" : "Today's News"}
                </Link>
                <Link className={styles["footer-link"]} href="/notice">
                  {isBn ? "নোটিশ" : "Notice"}
                </Link>
                <Link className={styles["footer-link"]} href="/blogs">
                  {t("footer.blog")}
                </Link>
              </div>
            </div>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.getInvolved")}</p>
              <div className={styles["footer-links-list"]}>
                <Link className={styles["footer-link"]} href="/contact">
                  {t("footer.contact")}
                </Link>
                <a className={styles["footer-link"]} href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className={styles["footer-link"]} href={youtubeUrl} target="_blank" rel="noopener noreferrer">Youtube</a>
                <a className={styles["footer-link"]} href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.others")}</p>
              <div className={styles["footer-links-list"]}>
                <Link className={styles["footer-link"]} href="/mazlum-ummah-policy">
                  {t("infoPages.pages.mazlumPolicy.title")}
                </Link>
                <Link className={styles["footer-link"]} href="/privacy-policy">
                  {t("infoPages.pages.privacy.title")}
                </Link>
                <Link className={styles["footer-link"]} href="/cookies">
                  {t("infoPages.pages.cookies.title")}
                </Link>
                <Link className={styles["footer-link"]} href="/copyright-policy">
                  {t("infoPages.pages.copyright.title")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["footer-bottom"]}>
        <div className={styles["footer-social-mobile"]}>
          <SocialLinks facebookUrl={facebookUrl} youtubeUrl={youtubeUrl} instagramUrl={instagramUrl} />
        </div>
        <div className={styles["footer-bottom-row"]}>
          <p className={styles["footer-copyright"]}>
            {isBn ? (
              <>
                © 2026 মযলুম উম্মাহ -{" "}
                <Link href={externalLinksHref}>সর্ববাইরের লিংক সম্পর্কে মজলুম উম্মাহ&apos;র দৃষ্টিভঙ্গি সম্বন্ধে পড়ুন।</Link>
              </>
            ) : (
              <>
                © 2026 Mazlum Ummah -{" "}
                <Link href={externalLinksHref}>Read Mazlum Ummah&apos;s perspective on external links.</Link>
              </>
            )}
          </p>
          <div className={styles["footer-developed"]}>
            <span>{t("footer.developedBy")}</span>
            <Image className={styles["footer-microwebs-logo"]} src="/microwebs-logo.png" alt="Microwebs" width={110} height={30} />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
