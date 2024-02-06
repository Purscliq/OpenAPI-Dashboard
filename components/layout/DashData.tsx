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
    icon: <Home />,
    key: "get-started",
  },
  {
    label: <Link href="/compliance">Compliance</Link>,
    icon: <Compliance />,
    key: "compliance",
  },
];
export const sidebarData2: MenuProps["items"] = [
  {
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashIcon />,
    key: "dashboard",
  },
  {
    label: <Link href="/account">Account</Link>,
    icon: <Account />,
    key: "account",
  },
  {
    label: <Link href="/customer">Customer</Link>,
    icon: <Customer />,
    key: "customer",
  },
  {
    label: <Link href="/auth">Authorization</Link>,
    icon: <Auth />,
    key: "auth",
  },
  {
    label: <Link href="/transaction">Transaction</Link>,
    icon: <Transac />,
    key: "transaction",
  },

  {
    label: <Link href="/dispute">Dispute</Link>,
    icon: <DisputeIcon />,
    key: "dispute",
  },
  {
    label: <Link href="/developer">Developers</Link>,
    icon: <DeveloperIcon />,
    key: "developer",
  },

  {
    label: <Link href="/stimulator">Stimulator</Link>,
    icon: <StimulatorIcon />,
    key: "stimulator",
  },

  {
    label: <Link href="/setting">Settings</Link>,
    icon: <SettingIcon />,
    key: "setting",
  },
];
export const sidebarData3: MenuProps["items"] = [
  {
    label: <Link href="/sandbox">SandBox</Link>,
    icon: <SandIcon />,
    key: "sandbox",
  },
  {
    label: <Link href="/logout">Log Out</Link>,
    icon: <LogoutIcon />,
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
