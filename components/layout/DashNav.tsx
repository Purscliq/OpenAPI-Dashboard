"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { CgMenuRightAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import avatar from "@/assets/png/Avatar.png";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import { useRouter } from "next/navigation";

const DashNav = () => {
  const { replace } = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    replace("/");
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href="#">Profile</Link>,
      key: "0",
    },
    {
      label: <Link href="#">Settings</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center  justify-center"
        >
          Log out
        </button>
      ),
      key: "3",
    },
  ];
  return (
    <>
      <nav className="flex justify-between items-center px-5 py-2">
        <label
          htmlFor="my-drawer-2"
          className="flex lg:hidden text-blue-800 px-3"
        >
          <CgMenuRightAlt size="25" />
        </label>

        <div className="relative">
          <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-[520px] rounded-md border-gray-200 border py-2 pe-0  sm:text-sm pl-8 ring-0   bg-inherit"
          />
        </div>
        <div className="space-x-8 items-center flex">
          <div className="hidden lg:block">
            <Select
              id="create"
              defaultValue="create new"
              options={[
                { value: "create new", label: "Create new business" },
                { value: "existing", label: "Existing business" },
              ]}
              className="p-2 border w-full rounded-md border-none  bg-white text-sm text-[#A7A9AD] shadow-none"
            />
          </div>
          <button
            type="button"
            className="hidden lg:flex space-x-3 p-2 items-center border border-[#EEF1F6] bg-white rounded-full"
          >
            {/* <span className="w-2 h-2 rounded-full bg-green-700"></span> */}
            <NotificationIcon />
          </button>
          <div className="">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="hover:cursor-pointer"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Image alt="Avatar" src={avatar} className="w-12 h-12" />
              </a>
            </Dropdown>
            {/* <Image alt="Avatar" src={avatar} className="w-12 h-12" /> */}
          </div>
        </div>
      </nav>
      <div className=" border border-gray-200" />
    </>
  );
};

export default DashNav;
