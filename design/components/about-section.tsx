"use client";

import Link from "next/link";
import { bornomala } from "@/lib/fonts";
import { useTranslations } from "@/hooks/use-translations";

export default function AboutSection() {
  const t = useTranslations();

  const cards = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="#E8B65D"
          stroke="#E8B65D"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      title: t("about.education"),
      description: t("about.educationDesc"),
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="#E8B65D"
          stroke="#E8B65D"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.943 11.943 0 0 1 12 16.5c-3.162 0-6.133-1.228-8.716-3.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: t("about.service"),
      description: t("about.serviceDesc"),
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="#E8B65D"
          stroke="#E8B65D"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
      title: t("about.dawah"),
      description: t("about.dawahDesc"),
    },
  ];

  return (
    <section
      id="about"
      className={`w-full bg-white py-16 md:py-24 font-[family-name:var(--font-bornomala)]`}
      lang="bn"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-[28px] md:text-[48px] font-bold text-center text-[#1a3c2e] mb-12 md:mb-20">
          {t("about.sectionHeading")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-y-0 text-center relative">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`flex flex-col items-center px-4 lg:px-8 ${
                index !== cards.length - 1 ? "lg:border-r lg:border-gray-200" : ""
              }`}
            >
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold text-[#1a3c2e] mb-4">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/about"
            className="inline-block bg-[#f32a26] hover:bg-[#c41e1e] text-white font-medium py-3 px-8 rounded-full transition-colors duration-200"
          >
            {t("hero.learnMore")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
