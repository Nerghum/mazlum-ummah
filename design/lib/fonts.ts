import localFont from "next/font/local";

export const bornomala = localFont({
  src: [
    {
      path: "./fonts/Bornomala-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Bornomala-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bornomala",
});

export const ubuntuSans = localFont({
  src: "./fonts/UbuntuSans.woff2",
  variable: "--font-ubuntu",
});
