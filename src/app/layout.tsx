import type { Metadata } from "next";
import { Manrope as Font } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import BackgroundImage from "@/components/background/BackgroundImage";
import RootLayoutProvider from "@/providers/RootLayoutProvider";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "./globals.css";
import TopBar from "@/components/TopBar";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wgmi Exchange",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const google_analytics_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  return (
    <html lang="en">
      <body className={`${font.className} overflow-hidden`}>
        {google_analytics_id && <GoogleAnalytics gaId={google_analytics_id} />}
        <BackgroundImage />
        <RootLayoutProvider>
          <div className="overflow-y-scroll h-screen">
            <TopBar />
            {children}
          </div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
