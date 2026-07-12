"use client";

import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";

const ActivitiesPage = () => {
  const t = useTranslations();
  const activities = [
    { title: t("about.education"), description: t("about.educationDesc") },
    { title: t("about.service"), description: t("about.serviceDesc") },
    { title: t("about.dawah"), description: t("about.dawahDesc") },
  ];

  return (
    <>
      <PageBanner title={t("footer.activities")} subtitle={t("about.sectionHeading")} />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-12 md:grid-cols-3">
        {activities.map((activity) => (
          <article
            key={activity.title}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{activity.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{activity.description}</p>
          </article>
        ))}
      </section>
    </>
  );
};

export default ActivitiesPage;
