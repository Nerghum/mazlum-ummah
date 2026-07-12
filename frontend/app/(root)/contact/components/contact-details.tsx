"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Phone, Mail, MapPin, HelpCircle, ChevronDown, Info } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import { fetchFaqItems, text, type CmsFaqEntry } from "@/lib/cms";
import "./style.css";

interface FaqItem {
  q: string;
  a: string;
}

const ContactDetails = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqItems, setFaqItems] = useState<CmsFaqEntry[]>([]);

  useEffect(() => {
    let mounted = true;

    fetchFaqItems().then((items) => {
      if (mounted) {
        setFaqItems(items);
        setOpenFaqIndex(0);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const fallbackFaq = t("contact.bottomFaq") as unknown as FaqItem[];
  const dynamicFaq = useMemo<FaqItem[]>(
    () =>
      faqItems
        .map((item) => ({
          q: text(item.question, locale),
          a: text(item.answer, locale),
        }))
        .filter((item) => item.q && item.a),
    [faqItems, locale]
  );
  const bottomFaq = dynamicFaq.length ? dynamicFaq : fallbackFaq;

  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiBox-root css-1l0ngya">
        <div className="MuiBox-root css-1140a14">
          <h4 className="MuiTypography-root MuiTypography-h4 css-nkoif0">
            {t("contact.formHeading")}
          </h4>
          <form autoComplete="off">
            <div className="MuiStack-root css-1datsl3">
              <div className="MuiStack-root css-1sb3j1f">
                <div className="MuiStack-root css-u4p24i">
                  <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-animated css-10yv2vx contact-form-label">
                    {t("contact.name")}
                    <span
                      aria-hidden="true"
                      className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-cdkg8j"
                    >
                      *
                    </span>
                  </label>
                </div>
                <div className="MuiBox-root css-1jke4yk">
                  <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1vbfw84">
                    <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-uk8cax">
                      <input
                        aria-invalid={false}
                        autoComplete="off"
                        id=":r3j:"
                        name="name"
                        placeholder={t("contact.placeholder")}
                        type="text"
                        className="MuiInputBase-input MuiOutlinedInput-input css-aa1y23"
                      />
                      <fieldset
                        aria-hidden="true"
                        className="MuiOutlinedInput-notchedOutline css-13uci02"
                      >
                        <legend className="css-w4cd9x">
                          <span className="notranslate" aria-hidden="true">
                            ​
                          </span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="MuiStack-root css-1sb3j1f">
                <div className="MuiStack-root css-u4p24i">
                  <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-animated css-10yv2vx contact-form-label">
                    {t("contact.mobileEmail")}
                    <span
                      aria-hidden="true"
                      className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-cdkg8j"
                    >
                      *
                    </span>
                  </label>
                </div>
                <div className="MuiBox-root css-1jke4yk">
                  <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1vbfw84">
                    <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-uk8cax">
                      <input
                        aria-invalid={false}
                        autoComplete="off"
                        id=":r3k:"
                        name="phoneOrEmail"
                        placeholder={t("contact.placeholder")}
                        type="text"
                        className="MuiInputBase-input MuiOutlinedInput-input css-aa1y23"
                      />
                      <fieldset
                        aria-hidden="true"
                        className="MuiOutlinedInput-notchedOutline css-13uci02"
                      >
                        <legend className="css-w4cd9x">
                          <span className="notranslate" aria-hidden="true">
                            ​
                          </span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="MuiStack-root css-1sb3j1f">
                <div className="MuiStack-root css-u4p24i">
                  <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-animated css-10yv2vx contact-form-label">
                    {t("contact.subject")}
                    <span
                      aria-hidden="true"
                      className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-cdkg8j"
                    >
                      *
                    </span>
                  </label>
                </div>
                <div className="MuiBox-root css-1jke4yk">
                  <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1vbfw84">
                    <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-uk8cax">
                      <input
                        aria-invalid={false}
                        autoComplete="off"
                        id=":r3l:"
                        name="topic"
                        placeholder={t("contact.placeholder")}
                        type="text"
                        className="MuiInputBase-input MuiOutlinedInput-input css-aa1y23"
                      />
                      <fieldset
                        aria-hidden="true"
                        className="MuiOutlinedInput-notchedOutline css-13uci02"
                      >
                        <legend className="css-w4cd9x">
                          <span className="notranslate" aria-hidden="true">
                            ​
                          </span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="MuiStack-root css-1sb3j1f">
                <div className="MuiStack-root css-u4p24i">
                  <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-animated css-10yv2vx contact-form-label">
                    {t("contact.message")}
                    <span
                      aria-hidden="true"
                      className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-cdkg8j"
                    >
                      *
                    </span>
                  </label>
                </div>
                <div className="MuiBox-root css-1jke4yk">
                  <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1vbfw84">
                    <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-multiline css-1m10ujl">
                      <textarea
                        rows={11}
                        aria-invalid="false"
                        autoComplete="off"
                        id=":r3m:"
                        name="message"
                        placeholder={t("contact.placeholder")}
                        className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline css-nei4se"
                        style={{ height: "264px" }}
                      ></textarea>
                      <textarea
                        aria-hidden={true}
                        className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline css-nei4se"
                        readOnly={true}
                        tabIndex={-1}
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          overflow: "hidden",
                          height: "0px",
                          top: "0px",
                          left: "0px",
                          transform: "translateZ(0px)",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                          width: "444px",
                        }}
                      ></textarea>
                      <fieldset
                        aria-hidden="true"
                        className="MuiOutlinedInput-notchedOutline css-13uci02"
                      >
                        <legend className="css-w4cd9x">
                          <span className="notranslate" aria-hidden="true">
                            ​
                          </span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiBox-root css-8owaep">
              <button
                className="MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth css-1bdda4d"
                tabIndex={0}
                type="submit"
                id=":r3n:"
              >
                <span className="MuiLoadingButton-label css-oz8hdd">{t("contact.send")}</span>
                <span className="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium css-1g78ho2">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1hrd9ud"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2364_10373)">
                      <path
                        d="M19.7709 9.44699C19.7706 9.44676 19.7704 9.44648 19.7702 9.44625L15.688 5.38375C15.3821 5.07941 14.8875 5.08054 14.5831 5.3864C14.2787 5.69222 14.2799 6.18687 14.5857 6.49125L17.3265 9.21875H0.78125C0.349766 9.21875 0 9.56851 0 10C0 10.4315 0.349766 10.7812 0.78125 10.7812H17.3264L14.5857 13.5087C14.2799 13.8131 14.2787 14.3078 14.5831 14.6136C14.8875 14.9195 15.3822 14.9205 15.688 14.6162L19.7702 10.5537C19.7704 10.5535 19.7706 10.5532 19.7709 10.553C20.0769 10.2476 20.0759 9.75137 19.7709 9.44699Z"
                        fill="currentColor"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_2364_10373">
                        <rect width="20" height="20" fill="currentColor"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div
          className="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical css-dho9hl"
          role="separator"
          aria-orientation="vertical"
        ></div>
        <div className="contact-sidebar">
          <h4 className="contact-sidebar__heading">{t("contact.address")}</h4>

          <div className="contact-info-card">
            <div className="contact-info-card__icon">
              <Phone size={20} />
            </div>
            <div className="contact-info-card__body">
              <span className="contact-info-card__label">{t("contact.callNow")}</span>
              <a
                href={`tel:${t("contact.phoneValue").replace(/\s|-/g, "")}`}
                className="contact-info-card__value"
              >
                {t("contact.phoneValue")}
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-card__icon">
              <Mail size={20} />
            </div>
            <div className="contact-info-card__body">
              <span className="contact-info-card__label">{t("contact.email")}</span>
              <a href={`mailto:${t("contact.emailValue")}`} className="contact-info-card__value">
                {t("contact.emailValue")}
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-card__icon">
              <MapPin size={20} />
            </div>
            <div className="contact-info-card__body">
              <span className="contact-info-card__label">{t("contact.addressLabel")}</span>
              <span className="contact-info-card__value">{t("contact.addressValue")}</span>
            </div>
          </div>

          <div className="contact-social">
            <div className="contact-social__icons">
              <a
                href="https://www.instagram.com/mazlumummah"
                className="contact-social__link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mazlumummah"
                className="contact-social__link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://x.com/mazlumummah"
                className="contact-social__link"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/mazlum-ummah"
                className="contact-social__link"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@MazlumUmmah"
                className="contact-social__link"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-bottom">
        <div className="contact-guidelines">
          <div className="contact-guidelines__bar" />
          <h3 className="contact-guidelines__title">{t("contact.guidelinesTitle")}</h3>
          <p className="contact-guidelines__desc">{t("contact.guidelinesDesc")}</p>
          <div className="contact-guidelines__cards">
            <div className="contact-guidelines__card">
              <div className="contact-guidelines__card-icon">
                <Info size={24} />
              </div>
              <div className="contact-guidelines__card-body">
                <h5>{t("contact.guidelineDonationTitle")}</h5>
                <p>{t("contact.guidelineDonationDesc")}</p>
              </div>
            </div>
            <div className="contact-guidelines__card">
              <div className="contact-guidelines__card-icon">
                <Phone size={24} />
              </div>
              <div className="contact-guidelines__card-body">
                <h5>{t("contact.guidelineVolunteerTitle")}</h5>
                <p>{t("contact.guidelineVolunteerDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-faq-box">
          <h4 className="contact-faq-box__title">
            <HelpCircle size={24} className="contact-faq-box__title-icon" />
            {t("contact.faqQuestionsTitle")}
          </h4>
          <div className="contact-faq-box__list">
            {bottomFaq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              const isLast = index === bottomFaq.length - 1;
              return (
                <div
                  key={index}
                  className={`contact-faq-box__item ${isLast ? "contact-faq-box__item--last" : ""}`}
                >
                  <h5
                    className="contact-faq-box__question"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className="contact-faq-box__question-text">{item.q}</span>
                    <ChevronDown
                      size={14}
                      className={`contact-faq-box__chevron ${
                        isOpen ? "contact-faq-box__chevron--open" : ""
                      }`}
                    />
                  </h5>
                  <p
                    className={`contact-faq-box__answer ${
                      isOpen ? "contact-faq-box__answer--open" : ""
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
