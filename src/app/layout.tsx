import type { Metadata } from "next";
import { Fraunces, DM_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnugBug — Sooth the stuffiness. Stop the bleed.",
  description:
    "SnugBug nasal inserts for children — gentle, effective relief for stuffy noses and nosebleeds. Designed by parents, loved by kids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${nunito.variable}`}
    >
      <body className="font-body text-snugbug-dark bg-snugbug-cream antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
