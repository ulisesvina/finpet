import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google"
import "@/styles/globals.css";

import Header from "@/components/Header";


export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinPet",
  description: "Gameify your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased text-gray-900 bg-white dark:bg-black dark:text-white ${montserrat.variable} ${fraunces.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
