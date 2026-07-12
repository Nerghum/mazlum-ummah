"use client";

import { useEffect, useState } from "react";
import { CmsSiteSettings, fetchSiteSettings } from "@/lib/cms";

const fallbackSettings: CmsSiteSettings = {
  "site.title": "Mazlum Ummah",
  "site.tagline": "For the Muslim Ummah",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<CmsSiteSettings>(fallbackSettings);

  useEffect(() => {
    fetchSiteSettings().then((data) => setSettings({ ...fallbackSettings, ...data }));
  }, []);

  return settings;
}
