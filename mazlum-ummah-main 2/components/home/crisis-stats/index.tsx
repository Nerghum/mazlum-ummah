"use client";

import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

type CardGradient = "dark" | "bronze" | "wood";
type BadgeVariant = "danger" | "neutral";

interface CrisisCard {
  img: string;
  alt: string;
  badge: string;
  badgeVariant: BadgeVariant;
  iconSvg: React.ReactNode;
  title: string;
  subtitle: string;
  number: string;
  cause: string;
  gradient: CardGradient;
}

const WarningIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CompassIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const CrisisStats = () => {
  const t = useTranslations();

  const CARDS: CrisisCard[] = [
    {
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&h=400&q=80",
      alt: t("crisis.gaza.alt"),
      badge: t("crisis.gaza.badge"),
      badgeVariant: "danger",
      iconSvg: <WarningIcon />,
      title: t("crisis.gaza.title"),
      subtitle: t("crisis.gaza.subtitle"),
      number: t("crisis.gaza.number"),
      cause: t("crisis.gaza.cause"),
      gradient: "dark",
    },
    {
      img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&h=400&q=80",
      alt: t("crisis.sudan.alt"),
      badge: t("crisis.sudan.badge"),
      badgeVariant: "neutral",
      iconSvg: <CompassIcon />,
      title: t("crisis.sudan.title"),
      subtitle: t("crisis.sudan.subtitle"),
      number: t("crisis.sudan.number"),
      cause: t("crisis.sudan.cause"),
      gradient: "bronze",
    },
    {
      img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&h=400&q=80",
      alt: t("crisis.middleEast.alt"),
      badge: t("crisis.middleEast.badge"),
      badgeVariant: "neutral",
      iconSvg: <CompassIcon />,
      title: t("crisis.middleEast.title"),
      subtitle: t("crisis.middleEast.subtitle"),
      number: t("crisis.middleEast.number"),
      cause: t("crisis.middleEast.cause"),
      gradient: "wood",
    },
  ];

  return (
    <section className="crisis-section">
      <Wrapper>
        <div className="crisis-header">
          <h2 className="crisis-heading">{t("crisis.heading")}</h2>
          <p className="crisis-subheading">{t("crisis.subtitle")}</p>
        </div>

        <div className="crisis-grid">
          {CARDS.map((card, i) => (
            <div key={i} className={`crisis-card crisis-card--${card.gradient}`}>
              <Image
                src={card.img}
                alt={card.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="crisis-overlay" />
              <div className="crisis-shimmer" />
              <div className="crisis-top-accent" />
              <div className="crisis-inner-frame" />

              <div className="crisis-content">
                <div className="crisis-top-row">
                  <span className={`crisis-badge crisis-badge--${card.badgeVariant}`}>
                    {card.badge}
                  </span>
                  <span className="crisis-icon-circle">{card.iconSvg}</span>
                </div>

                <div className="crisis-body">
                  <h3 className="crisis-card-title">{card.title}</h3>
                  <p className="crisis-card-subtitle">{card.subtitle}</p>
                </div>

                <div>
                  <div className="crisis-divider" />
                  <div className="crisis-stat">
                    <span className="crisis-number">{card.number}</span>
                    <span className="crisis-cause">{card.cause}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="crisis-disclaimer">{t("crisis.disclaimer")}</p>
      </Wrapper>
    </section>
  );
};

export default CrisisStats;
