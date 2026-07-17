"use client";

import React from "react";
import styles from "@/styles/legal.module.css";
import { useTranslations } from "@/hooks/use-translations";

const PrivacyContent = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.statement")}</h4>
          <p className={styles.text}>{t("privacy.statementDesc")}</p>
          <p className={styles.text}>{t("privacy.reviewAdvice")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.dataCollection")}</h4>
          <p className={styles.text}>{t("privacy.dataCollectionDesc1")}</p>
          <p className={styles.text}>{t("privacy.dataCollectionDesc2")}</p>
          <p className={styles.text}>{t("privacy.dataCollectionDesc3")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.dataUsage")}</h4>
          <p className={styles.text}>{t("privacy.dataUsageIntro")}</p>
          <ul className={styles.list}>
            {(t("privacy.dataUsageItems") as string[]).map((item: string, i: number) => (
              <li key={i} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.text}>{t("privacy.dataUsageNoSell")}</p>
          <p className={styles.text}>{t("privacy.dataUsageThirdParty")}</p>
          <p className={styles.text}>{t("privacy.dataUsageSensitive")}</p>
          <p className={styles.text}>{t("privacy.dataUsageDisclosure")}</p>
          <ul className={styles.list}>
            {(t("privacy.dataUsageDisclosureItems") as string[]).map((item: string, i: number) => (
              <li key={i} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.dataControl")}</h4>
          <p className={styles.text}>{t("privacy.dataControlDesc1")}</p>
          <p className={styles.text}>{t("privacy.dataControlDesc2")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.dataSecurity")}</h4>
          <p className={styles.text}>{t("privacy.dataSecurityDesc1")}</p>
          <p className={styles.text}>{t("privacy.dataSecurityDesc2")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("privacy.policyChanges")}</h4>
          <p className={styles.text}>{t("privacy.policyChangesDesc1")}</p>
          <p className={styles.text}>{t("privacy.policyChangesDesc2")}</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;
