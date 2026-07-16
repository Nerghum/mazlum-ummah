import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { bornomala, ubuntuSans } from "@/lib/fonts";

import NextTopLoader from "nextjs-toploader";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { cookies } from "next/headers";
import CopyProtection from "@/components/copy-protection";
import { fetchSiteSettings, mediaUrl } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const faviconUrl = settings["site.faviconMedia"]
    ? mediaUrl(settings["site.faviconMedia"])
    : "/favicon.ico";

  return {
    title: settings["site.title"] || "Mazlum Ummah",
    description: settings["site.description"] || "A platform to support the oppressed and marginalized communities around the world.",
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
    other: {
      "theme-color": "#b82027",
      "msapplication-navbutton-color": "#b82027",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#b82027",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "bn";

  return (
    <html lang="bn" className={cn("h-full", "antialiased", ubuntuSans.variable, "font-sans")}>
      <body className={cn("min-h-full flex flex-col", ubuntuSans.variable, bornomala.variable)}>
        <NextTopLoader color="#c0392b" height={3} showSpinner={false} />
        <LocaleProvider initialLocale={initialLocale}>
          <CopyProtection />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
