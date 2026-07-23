"use client";

import React, { useState } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import "./style.css";

const Newsletter = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
      const res = await fetch(`${apiUrl}/public/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language: locale, source: "footer" }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage(t("newsletter.success"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || t("newsletter.error"));
      }
    } catch (error) {
      setStatus("error");
      setMessage(t("newsletter.error"));
    }
    
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

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
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="css-3tnzis">
            <div className="css-1sb3j1f">
              <div className="css-1jke4yk">
                <div className="css-mga01g">
                  <div className="css-1hwobj4">
                    <input
                      aria-invalid="false"
                      autoComplete="off"
                      name="email"
                      placeholder={t("newsletter.emailPlaceholder")}
                      type="email"
                      required
                      className="css-aj4f8c"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="css-599ba7" tabIndex={0} type="submit" disabled={status === "loading"}>
              <span className="css-oz8hdd">{status === "loading" ? "..." : t("newsletter.subscribe")}</span>
            </button>
          </div>
          {status !== "idle" && message && (
            <div className="css-vqmixd mt-4">
              <div
                className="css-qj0a7w"
                role="alert"
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: status === "success" ? "#E8F5E9" : "#FFEBEE",
                  color: status === "success" ? "#2E7D32" : "#C62828",
                  border: `1px solid ${status === "success" ? "#A5D6A7" : "#EF9A9A"}`
                }}
              >
                <div className="css-1zei4i">
                  {status === "success" ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                </div>
                <div className="css-127h8j3 text-sm font-medium">{message}</div>
              </div>
            </div>
          )}
        </form>
      </section>
    </section>
  );
};

export default Newsletter;
