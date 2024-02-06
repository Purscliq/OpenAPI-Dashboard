import React from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import logo from "@/assets/png/People@2x.png";
import Image from "next/image";
const DashNav = () => {
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
            className="w-full md:w-[320px] rounded-md border-gray-200 border py-2 pe-0  sm:text-sm pl-8 ring-0   bg-inherit"
          />
        </div>
        <div className="space-x-8 items-center flex">
          <div className="hidden lg:flex space-x-3 py-2  px-4 items-center border border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-700"></span>
            <span>Notifications</span>
          </div>
          <div className="avatar">
            <Image alt="" src={logo} />
          </div>
        </div>
      </nav>
      <div className=" border border-gray-200" />
    </>
  );
};

export default DashNav;
