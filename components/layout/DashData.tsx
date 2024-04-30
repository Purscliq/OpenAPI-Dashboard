import Account from "@/assets/svg/Account";
import Auth from "@/assets/svg/Auth";
import Compliance from "@/assets/svg/Compliance";
import Customer from "@/assets/svg/Customer";
import CustomersIcon from "@/assets/svg/CustomersIcon";
import DashIcon from "@/assets/svg/DashIcon";
import DeveloperIcon from "@/assets/svg/DeveloperIcon";
import DisputeIcon from "@/assets/svg/DisputeIcon";
import Home from "@/assets/svg/Home";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import SandIcon from "@/assets/svg/SandIcon";
import SettingIcon from "@/assets/svg/SettingIcon";
import Transac from "@/assets/svg/Transac";
import { MenuProps } from "antd";
import Link from "next/link";

export const sidebarData1: MenuProps["items"] = [
  {
    label: <Link href="/getting-started">Getting Started</Link>,
    icon: <Home className="mr-1" />,
    key: "getting-started",
  },
  {
    label: <Link href="/compliance">Compliance (pending)</Link>,
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
    label: <Link href="/loan-account">Loan Account</Link>,
    icon: <Account className="mr-1" />,
    key: "loan-account",
  },
  // {
  //   label: "Loan Management",
  //   icon: <Account className="mr-1" />,
  //   key: "loan-management",
  //   children: [
  //     {
  //       label: <Link href="/loan-management/loans">Loans</Link>,
  //       key: "loans",
  //     },
  //     {
  //       label: (
  //         <Link href="/loan-management/external-loans">External Loans</Link>
  //       ),
  //       key: "external-loans",
  //     },
  //   ],
  // },
  {
    label: <Link href="/customers">Customers</Link>,
    icon: <CustomersIcon className="mr-1" />,
    key: "customers",
  },
  {
    label: <Link href="/transactions">Transactions</Link>,
    icon: <Transac className="mr-1" />,
    key: "transactions",
  },

  // {
  //   label: <Link href="/disputes">Disputes</Link>,
  //   icon: <DisputeIcon className="mr-1" />,
  //   key: "disputes",
  // },
  {
    label: <Link href="/developers">Developers</Link>,
    icon: <DeveloperIcon className="mr-1" />,
    key: "developers",
  },

  {
    label: <Link href="/settings">Settings</Link>,
    icon: <SettingIcon className="mr-1" />,
    key: "settings",
  },
];
export const sidebarData3: MenuProps["items"] = [
  // {
  //   label: <Link href="">SandBox</Link>,
  //   icon: <SandIcon className="mr-1" />,
  //   key: "sandbox",
  // },
  {
    label: <Link href="/">Log Out</Link>,
    icon: <LogoutIcon className="mr-1" />,
    key: "logout",
  },
];

export const activeKeys = [
  "dashboard",
  "payroll",
  "settings",
  "transactions",
  "loan-account",
  "loans",
  "getting-started",
  "developers",
  "sandbox",
  "logout",
  "auth",
  "customer",
  "compliance",
  "account",
];
