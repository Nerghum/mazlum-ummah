"use client";

import Image from "next/image";
import { mediaUrl } from "@/lib/cms";
import { useSiteSettings } from "@/hooks/use-site-settings";

type SiteLogoProps = {
  alt?: string;
  sizes?: string;
};

const SiteLogo = ({ alt, sizes = "(max-width: 768px) 50vw, 20vw" }: SiteLogoProps) => {
  const settings = useSiteSettings();
  const logoSrc = settings["site.logoMedia"]?.url ? mediaUrl(settings["site.logoMedia"]) : "/logo.png";
  const title = settings["site.title"] || "Mazlum Ummah";

  return <Image src={logoSrc} alt={alt || title} fill sizes={sizes} style={{ objectFit: "contain" }} />;
};

export default SiteLogo;
