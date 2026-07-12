export function formatDate(date: Date | string, locale: string = "bn"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const localeCode = locale === "bn" ? "bn-BD" : "en-BD";

  return new Intl.DateTimeFormat(localeCode, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatNumber(num: number, locale: string = "bn"): string {
  const localeCode = locale === "bn" ? "bn-BD" : "en-BD";
  return new Intl.NumberFormat(localeCode).format(num);
}
