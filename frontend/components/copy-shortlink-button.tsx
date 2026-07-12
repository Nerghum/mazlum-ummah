"use client";

import { useState } from "react";

type CopyShortlinkButtonProps = {
  shortUrl?: string;
  fallbackPath?: string;
  className?: string;
  iconClassName?: string;
};

function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const rootShortPath = cleanPath.replace(/^\/(?:n|b)\//, "/");
  return `${window.location.origin}${rootShortPath}`;
}

function fallbackCopy(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  input.style.top = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

const CopyShortlinkButton = ({
  shortUrl,
  fallbackPath,
  className = "",
  iconClassName = "",
}: CopyShortlinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const value = absoluteUrl(shortUrl || fallbackPath || window.location.pathname);

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      fallbackCopy(value);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      className={className}
      type="button"
      aria-label={copied ? "Shortlink copied" : "Copy shortlink"}
      title={copied ? "Copied" : "Copy shortlink"}
      onClick={handleCopy}
    >
      <svg className={iconClassName} focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <path
          d="M7.58 12.42a.83.83 0 0 1 0-1.18l3.66-3.66a.83.83 0 1 1 1.18 1.18l-3.66 3.66a.83.83 0 0 1-1.18 0Z"
          fill="currentColor"
        />
        <path
          d="M6.7 16.76a4.16 4.16 0 0 1-2.94-7.1l2.36-2.35a4.16 4.16 0 0 1 5.4-.4.83.83 0 1 1-.98 1.34 2.5 2.5 0 0 0-3.25.24l-2.35 2.35a2.5 2.5 0 0 0 3.53 3.54l1.02-1.02a.83.83 0 1 1 1.18 1.18l-1.02 1.02a4.14 4.14 0 0 1-2.94 1.2Z"
          fill="currentColor"
        />
        <path
          d="M11.04 14.3a4.15 4.15 0 0 1-2.47-.82.83.83 0 1 1 .98-1.34 2.5 2.5 0 0 0 3.25-.23l2.35-2.36a2.5 2.5 0 0 0-3.53-3.53L10.6 7.03a.83.83 0 0 1-1.18-1.18l1.02-1.02a4.16 4.16 0 1 1 5.89 5.9l-2.36 2.35a4.14 4.14 0 0 1-2.93 1.22Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default CopyShortlinkButton;
