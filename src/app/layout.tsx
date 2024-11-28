import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

import { Header } from "./components";

const chakraPetch = localFont({
  src: [
    {
      path: "./fonts/chakra-petch-v11-latin-regular.woff2",
      weight: "300",
    },
    {
      path: "./fonts/chakra-petch-v11-latin-500.woff2",
      weight: "500",
    },
    {
      path: "./fonts/chakra-petch-v11-latin-700.woff2",
      weight: "700",
    },
  ],
  display: "swap",
});

const cormorant = localFont({
  src: [
    {
      path: "./fonts/cormorant-infant-v17-latin-italic.woff2",
      weight: "400",
    },
    {
      path: "./fonts/cormorant-infant-v17-latin-600italic.woff2",
      weight: "600",
    },
    {
      path: "./fonts/cormorant-infant-v17-latin-regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/cormorant-infant-v17-latin-600.woff2",
      weight: "600",
    },
  ],
  display: "swap",
});

const chathura = localFont({
  src: [
    {
      path: "./fonts/chathura-v20-latin-100.woff2",
      weight: "100",
    },
    {
      path: "./fonts/chathura-v20-latin-300.woff2",
      weight: "300",
    },
    {
      path: "./fonts/chathura-v20-latin-regular.woff2",
      weight: "400",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jovan Jocic",
  description: "A somewhat experimental personal website.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chakraPetch.className} ${cormorant.className} ${chathura.className}`}
      >
        <Header />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
