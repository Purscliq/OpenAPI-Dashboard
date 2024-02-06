"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const AntdConfig = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default AntdConfig;
