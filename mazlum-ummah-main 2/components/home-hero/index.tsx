"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

interface Slide {
  bgImage: string;
  titleKey: string;
  href: string;
}

const slides: Slide[] = [
  {
    bgImage: "/hero-bg.png",
    titleKey: "hero.title",
    href: "/about",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80",
    titleKey: "hero.slide2Title",
    href: "/news/gaza",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1600&q=80",
    titleKey: "hero.slide3Title",
    href: "/news/sudan",
  },
];

interface HomeHeroProps {
  title: React.ReactNode;
}

const HomeHero = ({ title }: HomeHeroProps) => {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => {
        const slideTitle = t(slide.titleKey as any);
        return (
          <div
            key={index}
            className="hero-slide"
            style={{
              backgroundImage: `linear-gradient(98deg, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.02) 100%), url("${slide.bgImage}")`,
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 1 : 0,
            }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <div className="hero-text-wrapper">
                  <div className="hero-title-row">
                    <div className="hero-title-wrapper">
                      <h1 className="hero-title">{slideTitle}</h1>
                    </div>
                  </div>
                  <div className="hero-actions">
                    <Link className="hero-btn-primary" href={slide.href}>
                      {t("hero.learnMore")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot${index === current ? " active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
