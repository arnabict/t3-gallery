import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import TopNav from "./_components/topnav";
import "@uploadthing/react/styles.css";

export const metadata: Metadata = {
  title: "T3 Gallery",
  description: "Building web app with T3 stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body className="flex flex-col gap-4">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
