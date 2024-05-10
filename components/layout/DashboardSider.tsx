"use client";
import Image from "next/image";
import logo from "@/assets/svg/logo.svg";
import { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { activeKeys, sidebarData2, sidebarData3 } from "./DashData";
import { CustomMenu as Menu } from "@/lib/AntdComponents";
import Link from "next/link";
import Compliance from "@/assets/svg/Compliance";
import Home from "@/assets/svg/Home";
import { useGetComplainceStatQuery } from "@/services/business/index.service";

const DashboardSider = () => {
  const pathName = usePathname();
  const [activePath, setActivePath] = useState("");
  useLayoutEffect(() => {
    setActivePath(activeKeys.filter((value) => pathName.includes(value))[0]);
  }, [pathName]);
  const { data, isLoading } = useGetComplainceStatQuery({});
  const textColor = data?.data?.status === "Completed" ? "green" : "red";
  return (
    <div className="drawer-side z-10 ">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="flex flex-col space-y-4 w-[15rem]  h-screen overflow-hidden  shadow-xl bg-white border-r border-r-gray-300 py-2 overflow-y-scroll items-center justify-center">
        <Image src={logo} alt="logo" className="mx-auto" />
        <div className=" border border-gray-200 mt-6" />
        <div className=" overflow-y-scroll space-y-5 flex flex-col">
          <Menu
            selectedKeys={[activePath]}
            items={[
              {
                label: <Link href="/getting-started">Getting Started</Link>,
                icon: <Home className="mr-1" />,
                key: "getting-started",
              },
              {
                label: (
                  <Link href="/compliance">
                    Compliance
                    <span style={{ color: textColor }} className="ml-1">
                      ({data?.data?.status})
                    </span>
                  </Link>
                ),
                icon: <Compliance className="mr-1" />,
                key: "compliance",
              },
            ]}
            className="!space-y-3 !w-full"
            mode="inline"
          />
          <div className=" border border-gray-200 mt-6" />

          <Menu
            selectedKeys={[activePath]}
            items={sidebarData2}
            className="!space-y-3 !w-full"
            mode="inline"
          />
          <div className=" border border-gray-200 mt-6" />

          <Menu
            selectedKeys={[activePath]}
            items={sidebarData3}
            className="!space-y-3 !w-full"
            mode="inline"
          />
        </div>
      </aside>
    </div>
  );
};

export default DashboardSider;
