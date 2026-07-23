"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import "./style.css";
import MostRead from "./most-read";
import { useTranslations } from "@/hooks/use-translations";

const NEWS_IMG_TOP =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
const NEWS_IMG_2 =
  "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_3 =
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_4 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_5 =
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_6 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_7 =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80";
const NEWS_IMG_8 =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80";

const NewsDetails = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-1qkll0f">
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-7.7 css-1ezbg89">
          <div className="MuiBox-root css-1fobf8d">
            <h1 className="news-details-title">
              পশ্চিমবঙ্গের 'বাঙালি জাতীয়তাবাদী' নেতা গর্গ চ্যাটার্জীর গ্রেফতার নিয়ে যে বিতর্ক চলেছ
            </h1>
            <div className="news-details-meta">
              <span className="news-details-meta-text">৯ মে, ২০২৬</span>
              <span className="news-details-meta-text">{t("media.writtenBy")}: মোহাম্মদ রাজ</span>
            </div>
          </div>
          <div className="news-details-top-image">
            <Image
              src={NEWS_IMG_TOP}
              alt="News Image"
              width={800}
              height={450}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="news-details-top-ad-banner">
            <a
              href="https://business.linkedin.com/advertise/ads/ads-guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/banner.gif"
                alt="Advertisement"
                width={728}
                height={90}
                unoptimized
                style={{ width: "100%", height: "auto" }}
              />
            </a>
          </div>
          <div className="MuiBox-root css-1fobf8d">
            <div className="html_Container MuiBox-root css-13l4rt3">
              <p className="editor-paragraph">
                আদর্শ সমাজ বিনির্মাণ ও দ্বীনি দাওয়াতকে কার্যকর ও গতিশীল করার লক্ষ্যে ইমামদের দক্ষ
                করে গড়ে তুলতে মযলুম উম্মাহের উদ্যোগে আয়োজিত ৫ দিনব্যাপী 'ইমাম প্রশিক্ষণ'-এর প্রথম
                ব্যাচ সফলভাবে সম্পন্ন হয়েছে। এতে প্রশিক্ষণ গ্রহণ করেছেন ৯৪ জন ইমাম।
              </p>
              <p className="editor-paragraph"></p>
              <p className="editor-paragraph">
                ২৬ এপ্রিল থেকে ৩০ এপ্রিল পর্যন্ত ফাউন্ডেশনের নিজস্ব অডিটোরিয়ামে অনুষ্ঠিত এই
                প্রশিক্ষণে অংশগ্রহণের জন্য সারাদেশ থেকে ১২০০-এর অধিক ইমাম আবেদন করেন। সেখান থেকে ১০০
                জন প্রতিভাবান ইমামকে নির্বাচিত করা হয়। তন্মধ্যে ৯৪ জন সফলভাবে প্রশিক্ষণ সম্পন্ন
                করেন।
              </p>
            </div>
          </div>
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_TOP}
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_2}
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="MuiBox-root css-1fobf8d">
            <div className="html_Container MuiBox-root css-13l4rt3">
              <p className="editor-paragraph">
                সমাজের সবচেয়ে জনসম্পৃক্ত ও অন্যতম গুরুত্বপূর্ণ মানুষটি হলেন মসজিদের ইমাম। সমাজের
                নানা ক্ষেত্রে ইমামদের ভূমিকা অপরিসীম। তারা কেবল নামাজের ইমামতিই করেন না, সাধারণ
                মানুষের দুঃখ-কষ্ট, সামাজিক ও দ্বীনি সমস্যার সমাধানের প্রধান ভূমিকা পালন করেন।
              </p>
              <p className="editor-paragraph"></p>
              <p className="editor-paragraph">
                তাই সমকালীন প্রেক্ষাপটে দ্বীনি দাওয়াতকে আরও কার্যকর ও যুগোপযোগী করতে ইমামদের গভীর
                ইলমের পাশাপাশি জাগতিক ও কারিগরি বিষয়ে দক্ষ অপরিহার্য। এই লক্ষ্যকে সামনে রেখেই মযলুম
                উম্মাহের এই ইমাম প্রশিক্ষণের আয়োজন।
              </p>
            </div>
          </div>
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_3}
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_4}
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="MuiBox-root css-1fobf8d">
            <div className="html_Container MuiBox-root css-13l4rt3">
              <p className="editor-paragraph">
                ৫ দিনব্যাপী এই প্রশিক্ষণে ২০ টিরও অধিক গুরুত্বপূর্ণ ও সময়োপযোগী বিষয়ে প্রশিক্ষণ
                প্রদান করা হয়। তন্মধ্যে ছিণ আদর্শ ইমামের গুণাবলি, লিডারশিপ, পার্সোনালিটি
                ডেভেলপমেন্ট, ইমোশনাল ইন্টেলিজেন্স, দাওয়াহ ও মনস্তত্ত্ব, মুসলিম মানসে সংশয় ও তার
                প্রতিকার, সুদমুক্ত সমাজ গঠন, স্বাস্থ্য সচেতনতা, শরীরচর্চা, মসজিদকে প্রোডাক্টিভ করার
                কৌশল, পাবলিক স্পিকিং, টাইম ম্যানেজমেন্ট, ফ্যাক্ট চেকিং ও মডার্ন টুলস ব্যবহারের
                কৌশলের মতো গুরুত্বপূর্ণ টপিক।{" "}
              </p>
              <p className="editor-paragraph"></p>
              <p className="editor-paragraph">
                প্রশিক্ষণ প্রদান করেছেন সংশ্লিষ্ট বিষয়ে দক্ষ ও অভিজ্ঞ প্রশিক্ষকবৃন্দ।
              </p>
            </div>
          </div>
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-12 MuiGrid2-grid-lg-12 css-197n5pv">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_5}
                    alt="Image"
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="MuiBox-root css-1fobf8d">
            <div className="html_Container MuiBox-root css-13l4rt3">
              <p className="editor-paragraph">
                প্রশিক্ষণার্থী ইমামদের আবাসন ও খাবারসহ যাবতীয় সব ব্যবস্থা ছিল মযলুম উম্মাহের পক্ষ
                থেকে সম্পূর্ণ ফ্রি। দূর-দূরান্ত থেকে আগত ইমামদের সম্মানার্থে যাতায়াত খরচও প্রদান
                করা হয়।
              </p>
              <p className="editor-paragraph"></p>
              <p className="editor-paragraph">
                এই প্রশিক্ষণ থেকে অর্জিত জ্ঞান ও দক্ষতা ইমামদের ওপর অর্পিত দায়িত্ব পালনে আরও
                আত্মবিশ্বাসী করে তুলবে। তাদের মাধ্যমে সমাজে ছড়িয়ে পড়বে সুন্নাহর আলো এবং উন্মোচিত
                হবে মানবসেবার নতুন দিগন্ত ইনশাআল্লাহ।
              </p>
            </div>
          </div>
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-12 MuiGrid2-grid-lg-12 css-197n5pv">
              <div className="MuiBox-root css-12gqiy5">
                <span className="minimal__image__root --loaded css-1cf4ec9">
                  <Image
                    src={NEWS_IMG_6}
                    alt="Image"
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
              </div>
            </div>
          </div>
          <MostRead slug={slug} />
          <div className="news-details-ad-banner">
            <a
              href="https://business.linkedin.com/advertise/ads/ads-guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/banner.gif"
                alt="Advertisement"
                width={728}
                height={90}
                style={{ width: "100%", height: "auto" }}
              />
            </a>
          </div>
        </div>
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-4.3 css-81xp92">
          <div className="MuiBox-root css-0">
            <div className="MuiBox-root css-zua1x5">
              <p className="MuiTypography-root MuiTypography-body2 css-1lxqr0u">
                {t("common.share")}
              </p>
              <div className="MuiStack-root css-1iil1mo">
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9"
                  tabIndex={0}
                  type="button"
                  id=":r3k:"
                  aria-label="Facebook"
                >
                  <span className="MuiIconButton-loadingIndicator css-4y65cq"></span>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66"
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
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9"
                  tabIndex={0}
                  type="button"
                  id=":r3m:"
                  aria-label="LinkedIn"
                >
                  <span className="MuiIconButton-loadingIndicator css-4y65cq"></span>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66"
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
                  <span className="MuiTouchRipple-root css-4mb1j7"></span>
                </button>
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9"
                  tabIndex={0}
                  type="button"
                  id=":r3o:"
                  aria-label="X"
                >
                  <span className="MuiIconButton-loadingIndicator css-4y65cq"></span>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66"
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
                  <span className="MuiTouchRipple-root css-4mb1j7"></span>
                </button>
              </div>
            </div>
            <div className="news-vertical-ad-card">
              <a
                href="https://business.linkedin.com/advertise/ads/ads-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaKi7B80ISUUx4uWgEbro_Ih_O37469RI-Q&s"
                  alt="Advertisement"
                  width={300}
                  height={250}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>
            <div className="MuiBox-root css-zpnox9">
              <div className="MuiBox-root css-l3ps0i">
                <h3 className="MuiTypography-root MuiTypography-h3 css-s6uijm">
                  {t("common.letsBringChange")}
                </h3>
                <a
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorWarning MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorWarning MuiButton-disableElevation MuiButton-fullWidth css-1b9rh8u"
                  tabIndex={0}
                  id=":r3d:"
                  href="/donate"
                  data-discover="true"
                >
                  {t("common.donate")}
                </a>
                <a
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedInherit MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorInherit MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedInherit MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorInherit MuiButton-disableElevation MuiButton-fullWidth css-mo19c8"
                  tabIndex={0}
                  id=":r3e:"
                  href="/get-involved?active=volunteer"
                  data-discover="true"
                >
                  {t("common.volunteer")}
                </a>
              </div>
            </div>
            <div className="MuiBox-root css-relevant-news">
              <h3 className="relevant-news-title">{t("news.selectedNews")}</h3>
              <div className="relevant-news-list">
                {[
                  {
                    date: t("newsSection.dates.0"),
                    title: t("newsSection.tags.full.0"),
                    excerpt:
                      "মযলুম উম্মাহের উদ্যোগে একটি গুরুত্বপূর্ণ ইভেন্ট সম্পন্ন হয়েছে যেখানে অনেক মানুষ অংশগ্রহণ করেছে। এই ইভেন্টটি সমাজের উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করবে।",
                    url: `/news/${slug}/news-1`,
                    src: NEWS_IMG_7,
                    alt: t("news.categories.sudan"),
                    bgColor: "#008080",
                  },
                  {
                    date: t("newsSection.dates.1"),
                    title: t("newsSection.tags.full.1"),
                    excerpt:
                      "মযলুম উম্মাহের ব্যবস্থাপনায় নতুন একটি প্রকল্প চালু করা হয়েছে যা সমাজের উন্নয়নে সহায়তা করবে। এই প্রকল্পের মাধ্যমে অনেক মানুষ উপকৃত হবে।",
                    url: `/news/${slug}/news-2`,
                    src: NEWS_IMG_8,
                    alt: t("news.categories.gaza"),
                    bgColor: "#4B0082",
                  },
                ].map((news, index) => (
                  <a href={news.url} key={index} className="relevant-news-link">
                    <div className="relevant-news-card">
                      <div className="relevant-news-image-wrapper">
                        <Image
                          src={news.src}
                          alt={news.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                        <span className="relevant-news-date">{news.date}</span>
                        <div className="relevant-news-gradient" />
                      </div>
                      <div
                        className="relevant-news-content"
                        style={{ backgroundColor: news.bgColor }}
                      >
                        <p className="relevant-news-card-title">{news.title}</p>
                        <p className="relevant-news-excerpt">{news.excerpt}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;
