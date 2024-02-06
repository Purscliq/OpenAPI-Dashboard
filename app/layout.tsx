import "./globals.css";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import AntdConfig from "@/lib/AntdConfig";

const zen = Zen_Kaku_Gothic_Antique({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Pursfi Open API ",
  description: "Purs Finance Open Api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${zen.className} !bg-[#FAFAFA]`}>
        <AntdConfig>{children}</AntdConfig>
      </body>
    </html>
  );
}
