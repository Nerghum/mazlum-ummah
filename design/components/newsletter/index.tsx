"use client";

import React from "react";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

const Newsletter = () => {
  const t = useTranslations();
  return (
    <section className="css-budoz5">
      <section className="css-vyws4f">
        <div className="css-1h3sj6g">
          <svg
            className="css-1k604uf"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 402 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.50077e-05 -1.70215e-05C-1.4372e-05 53.3085 21.1767 104.434 58.8715 142.128C96.5663 179.823 147.691 201 201 201C254.308 201 305.434 179.823 343.128 142.128C380.823 104.434 402 53.3085 402 3.92199e-05L314.366 9.7473e-06C314.366 30.0665 302.422 58.9016 281.162 80.1617C259.902 101.422 231.066 113.366 201 113.366C170.933 113.366 142.098 101.422 120.838 80.1617C99.578 58.9015 87.6342 30.0665 87.6342 -2.80774e-06L-1.50077e-05 -1.70215e-05Z"
              fill="#EEF2F0"
              fillOpacity="0.08"
            ></path>
          </svg>
        </div>
        <div className="css-1kgnnes">
          <svg
            className="css-1g1l4k5"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 402 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.50077e-05 -1.70215e-05C-1.4372e-05 53.3085 21.1767 104.434 58.8715 142.128C96.5663 179.823 147.691 201 201 201C254.308 201 305.434 179.823 343.128 142.128C380.823 104.434 402 53.3085 402 3.92199e-05L314.366 9.7473e-06C314.366 30.0665 302.422 58.9016 281.162 80.1617C259.902 101.422 231.066 113.366 201 113.366C170.933 113.366 142.098 101.422 120.838 80.1617C99.578 58.9015 87.6342 30.0665 87.6342 -2.80774e-06L-1.50077e-05 -1.70215e-05Z"
              fill="#EEF2F0"
              fillOpacity="0.08"
            ></path>
          </svg>
        </div>
        <div className="css-epk3dg">
          <svg
            className="css-x4ju0l"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 402 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.50077e-05 -1.70215e-05C-1.4372e-05 53.3085 21.1767 104.434 58.8715 142.128C96.5663 179.823 147.691 201 201 201C254.308 201 305.434 179.823 343.128 142.128C380.823 104.434 402 53.3085 402 3.92199e-05L314.366 9.7473e-06C314.366 30.0665 302.422 58.9016 281.162 80.1617C259.902 101.422 231.066 113.366 201 113.366C170.933 113.366 142.098 101.422 120.838 80.1617C99.578 58.9015 87.6342 30.0665 87.6342 -2.80774e-06L-1.50077e-05 -1.70215e-05Z"
              fill="#EEF2F0"
              fillOpacity="0.08"
            ></path>
          </svg>
        </div>
        <div className="css-15mmray">
          <svg
            className="css-1ckcmkl"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 402 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.50077e-05 -1.70215e-05C-1.4372e-05 53.3085 21.1767 104.434 58.8715 142.128C96.5663 179.823 147.691 201 201 201C254.308 201 305.434 179.823 343.128 142.128C380.823 104.434 402 53.3085 402 3.92199e-05L314.366 9.7473e-06C314.366 30.0665 302.422 58.9016 281.162 80.1617C259.902 101.422 231.066 113.366 201 113.366C170.933 113.366 142.098 101.422 120.838 80.1617C99.578 58.9015 87.6342 30.0665 87.6342 -2.80774e-06L-1.50077e-05 -1.70215e-05Z"
              fill="#EEF2F0"
              fillOpacity="0.08"
            ></path>
          </svg>
        </div>
        <h2 className="css-1eezop7">{t("newsletter.heading")}</h2>
        <form autoComplete="off">
          <div className="css-3tnzis">
            <div className="css-1sb3j1f">
              <div className="css-1jke4yk">
                <div className="css-mga01g">
                  <div className="css-1hwobj4">
                    <input
                      aria-invalid="false"
                      autoComplete="off"
                      id=":r28:"
                      name="email"
                      placeholder={t("newsletter.emailPlaceholder")}
                      type="text"
                      className="css-aj4f8c"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="css-599ba7" tabIndex={0} type="submit" id=":r29:">
              <span className="css-oz8hdd">{t("newsletter.subscribe")}</span>
            </button>
          </div>
          <div className="css-vqmixd">
            <div
              className="css-qj0a7w"
              role="alert"
              style={
                {
                  ["--Paper-shadow" as any]: "var(--shadows-0)",
                  ["--Paper-overlay" as any]: "var(--overlays-0)",
                } as React.CSSProperties
              }
            >
              <div className="css-1zei4i">
                <svg
                  className="css-ia94qz"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 28 28"
                  width="28"
                  height="28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 13L13.0547 12.9733C13.2256 12.8879 13.4175 12.8533 13.6076 12.8735C13.7976 12.8938 13.9779 12.9681 14.127 13.0876C14.2761 13.2071 14.3879 13.3669 14.449 13.548C14.5102 13.7291 14.5181 13.9239 14.472 14.1093L13.528 17.8907C13.4815 18.0762 13.4893 18.2712 13.5503 18.4525C13.6113 18.6338 13.723 18.7938 13.8722 18.9136C14.0214 19.0333 14.2018 19.1077 14.392 19.128C14.5822 19.1483 14.7742 19.1136 14.9453 19.028L15 19M26 14C26 15.5759 25.6896 17.1363 25.0866 18.5922C24.4835 20.0481 23.5996 21.371 22.4853 22.4853C21.371 23.5996 20.0481 24.4835 18.5922 25.0866C17.1363 25.6896 15.5759 26 14 26C12.4241 26 10.8637 25.6896 9.4078 25.0866C7.95189 24.4835 6.62902 23.5996 5.51472 22.4853C4.40042 21.371 3.5165 20.0481 2.91345 18.5922C2.31039 17.1363 2 15.5759 2 14C2 10.8174 3.26428 7.76516 5.51472 5.51472C7.76516 3.26428 10.8174 2 14 2C17.1826 2 20.2348 3.26428 22.4853 5.51472C24.7357 7.76516 26 10.8174 26 14ZM14 9H14.0107V9.01067H14V9Z"
                    stroke="currentColor"
                    strokeWidth="2.125"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="css-127h8j3"></div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Newsletter;
