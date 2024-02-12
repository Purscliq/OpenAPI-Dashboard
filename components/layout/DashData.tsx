import Account from "@/assets/svg/Account";
import Auth from "@/assets/svg/Auth";
import Compliance from "@/assets/svg/Compliance";
import Customer from "@/assets/svg/Customer";
import DashIcon from "@/assets/svg/DashIcon";
import DeveloperIcon from "@/assets/svg/DeveloperIcon";
import DisputeIcon from "@/assets/svg/DisputeIcon";
import Home from "@/assets/svg/Home";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import SandIcon from "@/assets/svg/SandIcon";
import SettingIcon from "@/assets/svg/SettingIcon";
import StimulatorIcon from "@/assets/svg/StimulatorIcon";
import Transac from "@/assets/svg/Transac";
import { MenuProps } from "antd";
import Link from "next/link";

export const sidebarData1: MenuProps["items"] = [
  {
    label: <Link href="/get-started">Getting Started</Link>,
    icon: <Home className="mr-1" />,
    key: "get-started",
  },
  {
    label: <Link href="/compliance">Compliance</Link>,
    icon: <Compliance className="mr-1" />,
    key: "compliance",
  },
];
export const sidebarData2: MenuProps["items"] = [
  {
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashIcon className="mr-1" />,
    key: "dashboard",
  },
  {
    label: <Link href="/account">Sub Account</Link>,
    icon: <Account className="mr-1" />,
    key: "account",
  },
  {
    label:"Loan Management",
    icon: <Account className="mr-1" />,
    key: "Loan Management",
    children: [
      {
        label: <Link href="/loans">Loans</Link>,
        key: "loans",
      },
      {
        label: <Link href="/roles">External Loans</Link>,
        key: "external-loans",
      },
    ],
  },
  {
    label: <Link href="/transaction">Transaction</Link>,
    icon: <Transac className="mr-1" />,
    key: "transaction",
  },

  {
    label: <Link href="/dispute">Dispute</Link>,
    icon: <DisputeIcon className="mr-1" />,
    key: "dispute",
  },
  {
    label: <Link href="/developer">Developers</Link>,
    icon: <DeveloperIcon className="mr-1" />,
    key: "developer",
  },

  {
    label: <Link href="/stimulator">Stimulator</Link>,
    icon: <StimulatorIcon className="mr-1" />,
    key: "stimulator",
  },

  {
    label: <Link href="/setting">Settings</Link>,
    icon: <SettingIcon className="mr-1" />,
    key: "setting",
  },
];
export const sidebarData3: MenuProps["items"] = [
  {
    label: <Link href="/sandbox">SandBox</Link>,
    icon: <SandIcon className="mr-1" />,
    key: "sandbox",
  },
  {
    label: <Link href="/logout">Log Out</Link>,
    icon: <LogoutIcon className="mr-1" />,
    key: "logout",
  },
];

export const activeKeys = [
  "dashboard",
  "payroll",
  "setting",
  "dispute",
  "transaction",
  "get-started",
  "developer",
  "developer",
  "sandbox",
  "logout",
  "stimulator",
  "auth",
  "customer",
  "compliance",
  "account",
];
