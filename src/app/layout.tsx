import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { cookies } from "next/headers";

import Header from "@/components/Header";
import { SESSION_COOKIE_NAME } from "@/constants";
import { AuthProvider } from "@/context/AuthProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const fraunces = Fraunces({
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
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <html lang="en">
      <body
        className={`antialiased text-gray-900 bg-white dark:bg-black dark:text-white ${montserrat.className} ${fraunces.variable}`}
      >
        <AuthProvider session={session}>
          <Header />
          <main className="max-w-screen-lg mx-auto p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
