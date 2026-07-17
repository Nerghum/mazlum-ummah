"use client";

import React from "react";
import styles from "@/styles/legal.module.css";
import { useTranslations } from "@/hooks/use-translations";

const TermsContent = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.termsOfUse")}</h4>
          <p className={styles.text}>{t("terms.termsOfUseDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.trademark")}</h4>
          <p className={styles.text}>{t("terms.trademarkDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.copyright")}</h4>
          <p className={styles.text}>{t("terms.copyrightDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.accountSecurity")}</h4>
          <p className={styles.text}>{t("terms.accountSecurityDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.license")}</h4>
          <p className={styles.text}>{t("terms.licenseDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.userContent")}</h4>
          <p className={styles.text}>{t("terms.userContentDesc1")}</p>
          <p className={styles.text}>{t("terms.userContentDesc2")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.refundPolicy")}</h4>
          <p className={styles.text}>{t("terms.refundPolicyDesc")}</p>
          <ul className={styles.list}>
            {(t("terms.donationTypes") as string[]).map((type: string, i: number) => (
              <li key={i} className={styles.listItem}>
                <strong className={styles.strong}>{type}:</strong>{" "}
                {(t("terms.donationTypeDescs") as string[])[i]}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.applicableLaw")}</h4>
          <p className={styles.text}>{t("terms.applicableLawDesc")}</p>
        </div>
        <div className={styles.block}>
          <h4 className={styles.heading}>{t("terms.policyChanges")}</h4>
          <p className={styles.text}>{t("terms.policyChangesDesc")}</p>
        </div>
      </div>
    </section>
  );
};

export default TermsContent;
