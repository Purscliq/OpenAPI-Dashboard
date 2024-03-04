import "./globals.css";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "@/context/StoreProvider";

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
        <AntdRegistry>
          <StoreProvider>{children}</StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
