"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import microwebsLogo from "@/assets/microwebs-logo.png";
import { useTranslations } from "@/hooks/use-translations";
import styles from "../styles/footer.module.css";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className={styles["footer-wrapper"]}>
      <section className={styles["footer-inner"]}>
        <div className={styles["footer-top"]}>
          <div className="css-0">
            <Link className="css-0" href="/">
              <span className={`minimal__logo__root ${styles["footer-logo"]}`} aria-label="Logo">
                <Image src={logo} alt="Logo" fill sizes="(max-width: 768px) 50vw, 20vw" />
              </span>
            </Link>
            <p className={styles["footer-description"]}>{t("footer.description")}</p>
            <div className={styles["footer-social-desktop"]}>
              <div className={styles["footer-social-row"]}>
                <a
                  className={styles["footer-social-link"]}
                  href="https://www.facebook.com/mazlumummah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    className="css-4lpd66"
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
                </a>
                <a
                  className={styles["footer-social-link"]}
                  href="https://www.youtube.com/@MazlumUmmah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                >
                  <svg
                    className="css-4lpd66"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.99752 2.30176C8.44868 2.30176 6.9606 2.45472 5.57812 2.73654L5.47205 2.75814C3.89319 3.0795 2.84119 3.29362 1.93464 4.45919C1.03783 5.61224 1.03833 6.94942 1.03911 9.02042V10.9998C1.03833 13.0708 1.03783 14.4079 1.93464 15.561C2.84119 16.7266 3.89319 16.9407 5.47205 17.262L5.57812 17.2837C6.9606 17.5654 8.44868 17.7184 9.99752 17.7184C11.5463 17.7184 13.0343 17.5654 14.4168 17.2837L14.5229 17.262C16.1018 16.9407 17.1538 16.7266 18.0603 15.561C18.9572 14.4079 18.9567 13.0708 18.9558 10.9998V9.02042C18.9567 6.94942 18.9572 5.61224 18.0603 4.45919C17.1538 3.29362 16.1018 3.0795 14.5229 2.75814L14.4168 2.73654C13.0343 2.45472 11.5463 2.30176 9.99752 2.30176Z"
                      fill="white"
                    ></path>
                    <path
                      d="M11.0083 7.71987C10.3666 7.36145 9.84166 7.06831 9.40958 6.88696C8.70708 6.59214 7.96216 6.56829 7.3499 7.06994C6.9667 7.38391 6.83124 7.83348 6.77181 8.28653C6.62811 9.38193 6.62818 10.6388 6.77181 11.7337C6.83124 12.1867 6.9667 12.6363 7.3499 12.9503C7.96216 13.4519 8.70708 13.428 9.40958 13.1333C9.84175 12.9518 10.3666 12.6588 11.0083 12.3003C11.5099 12.0203 12.0253 11.7515 12.4932 11.4151C12.8429 11.1637 13.1747 10.8521 13.2845 10.3977C13.3462 10.1426 13.3462 9.87759 13.2845 9.62251C13.1747 9.16809 12.8429 8.85651 12.4932 8.60509C12.0253 8.26867 11.5099 7.99996 11.0083 7.71987Z"
                      fill="#0F2920"
                    ></path>
                  </svg>
                </a>
                <a
                  className={styles["footer-social-link"]}
                  href="https://www.linkedin.com/company/mazlum-ummah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <svg
                    className="css-4lpd66"
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
                </a>
              </div>
            </div>
          </div>
          <div className={styles["footer-links-grid"]}>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.menu")}</p>
              <div className={styles["footer-links-list"]}>
                <Link className={styles["footer-link"]} href="/about-mazlum-ummah">
                  {t("infoPages.pages.about.title")}
                </Link>
                <Link className={styles["footer-link"]} href="/activities">
                  {t("footer.activities")}
                </Link>
                <Link className={styles["footer-link"]} href="/blogs">
                  {t("footer.blog")}
                </Link>
                <Link className={styles["footer-link"]} href="/gallery">
                  {t("footer.gallery")}
                </Link>
              </div>
            </div>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.getInvolved")}</p>
              <div className={styles["footer-links-list"]}>
                <Link
                  className={styles["footer-link"]}
                  href="/get-involved?active=regular-donation"
                >
                  {t("footer.regularDonor")}
                </Link>
                <Link className={styles["footer-link"]} href="/get-involved?active=membership">
                  {t("footer.lifetimeDonor")}
                </Link>
                <Link className={styles["footer-link"]} href="/get-involved?active=volunteer">
                  {t("footer.volunteer")}
                </Link>
                <Link className={styles["footer-link"]} href="/get-involved?active=career">
                  {t("footer.career")}
                </Link>
              </div>
            </div>
            <div className={styles["footer-link-column"]}>
              <p className={styles["footer-column-title"]}>{t("footer.others")}</p>
              <div className={styles["footer-links-split"]}>
                <div className={styles["footer-links-list"]}>
                  <Link className={styles["footer-link"]} href="/contact">
                    {t("footer.contact")}
                  </Link>
                  <Link className={styles["footer-link"]} href="/terms-and-conditions">
                    {t("infoPages.pages.mazlumPolicy.title")}
                  </Link>
                  <Link className={styles["footer-link"]} href="/privacy-policy">
                    {t("infoPages.pages.privacy.title")}
                  </Link>
                  <Link className={styles["footer-link"]} href="/cookies">
                    {t("infoPages.pages.cookies.title")}
                  </Link>
                </div>
                <div className={styles["footer-links-list"]}>
                  <Link className={styles["footer-link"]} href="/do-not-share-or-sell-my-info">
                    {t("infoPages.pages.doNotShare.title")}
                  </Link>
                  <Link className={styles["footer-link"]} href="/external-links-policy">
                    {t("infoPages.pages.externalLinks.title")}
                  </Link>
                  <Link className={styles["footer-link"]} href="/copyright-policy">
                    {t("infoPages.pages.copyright.title")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["footer-bottom"]}>
        <div className={styles["footer-social-mobile"]}>
          <div className={styles["footer-social-row"]}>
            <a
              className={styles["footer-social-link"]}
              href="https://www.facebook.com/mazlumummah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="css-4lpd66"
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
            </a>
            <a
              className={styles["footer-social-link"]}
              href="https://www.youtube.com/@MazlumUmmah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
            >
              <svg
                className="css-4lpd66"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.99752 2.30176C8.44868 2.30176 6.9606 2.45472 5.57812 2.73654L5.47205 2.75814C3.89319 3.0795 2.84119 3.29362 1.93464 4.45919C1.03783 5.61224 1.03833 6.94942 1.03911 9.02042V10.9998C1.03833 13.0708 1.03783 14.4079 1.93464 15.561C2.84119 16.7266 3.89319 16.9407 5.47205 17.262L5.57812 17.2837C6.9606 17.5654 8.44868 17.7184 9.99752 17.7184C11.5463 17.7184 13.0343 17.5654 14.4168 17.2837L14.5229 17.262C16.1018 16.9407 17.1538 16.7266 18.0603 15.561C18.9572 14.4079 18.9567 13.0708 18.9558 10.9998V9.02042C18.9567 6.94942 18.9572 5.61224 18.0603 4.45919C17.1538 3.29362 16.1018 3.0795 14.5229 2.75814L14.4168 2.73654C13.0343 2.45472 11.5463 2.30176 9.99752 2.30176Z"
                  fill="white"
                ></path>
                <path
                  d="M11.0083 7.71987C10.3666 7.36145 9.84166 7.06831 9.40958 6.88696C8.70708 6.59214 7.96216 6.56829 7.3499 7.06994C6.9667 7.38391 6.83124 7.83348 6.77181 8.28653C6.62811 9.38193 6.62818 10.6388 6.77181 11.7337C6.83124 12.1867 6.9667 12.6363 7.3499 12.9503C7.96216 13.4519 8.70708 13.428 9.40958 13.1333C9.84175 12.9518 10.3666 12.6588 11.0083 12.3003C11.5099 12.0203 12.0253 11.7515 12.4932 11.4151C12.8429 11.1637 13.1747 10.8521 13.2845 10.3977C13.3462 10.1426 13.3462 9.87759 13.2845 9.62251C13.1747 9.16809 12.8429 8.85651 12.4932 8.60509C12.0253 8.26867 11.5099 7.99996 11.0083 7.71987Z"
                  fill="#0F2920"
                ></path>
              </svg>
            </a>
            <a
              className={styles["footer-social-link"]}
              href="https://www.linkedin.com/company/mazlum-ummah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin"
            >
              <svg
                className="css-4lpd66"
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
            </a>
          </div>
        </div>
        <div className={styles["footer-bottom-row"]}>
          <p className={styles["footer-copyright"]}>
            © {new Date().getFullYear()}{" "}
            <Link href="/external-links-policy">{t("common.copyright")}</Link>
          </p>
          <div className={styles["footer-developed"]}>
            <span>{t("footer.developedBy")}</span>
            <Image
              className={styles["footer-microwebs-logo"]}
              src={microwebsLogo}
              alt="Microwebs"
              width={110}
              height={30}
            />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
