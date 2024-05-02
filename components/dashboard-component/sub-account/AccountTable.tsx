import { DatePicker, Dropdown, Menu, Modal } from "antd";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import { useGetDashboardQuery, useGetSubaccountQuery } from "@/services/business/index.service";
import { useState } from "react";
import FundModal from "./modal/FundModal";
import WithdrawalModal from "./modal/WithdrawalModal";

const AccountTable = () => {
  const { data: subaccounts, isLoading } = useGetSubaccountQuery({});
  const [openFundsModal, setOpenFundsModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const { data } = useGetDashboardQuery({});
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const handleOpenFunds = (record: any) => {
    setSelectedRecord(record);
    setOpenFundsModal(true);
  };

  const handleOpenWithdrawal = () => {
    setOpenFundsModal(false);
    setOpenWithdrawalModal(true);
  };
  const columns = [
    {
      title: "Account name",
      dataIndex: "account_name",
      sorter: true,
    },
    {
      title: "Sub-account Id",
      dataIndex: "",
      sorter: true,
      render: (text: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Current Balance",
      dataIndex: "current_balance",
      sorter: true,
      render: (current_balance: number) => `NGN ${current_balance?.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      sorter: true,
      render: (created_at: any) => {
        const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Action",
      render: (_: any, record: any) => {
        return (
          <>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <button onClick={() => handleOpenFunds(record)}>
                      View account details
                    </button>
                  </Menu.Item>
                </Menu>
              }
            >
              <button type="button" className="text-base font-semibold">
                ...
              </button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-[1rem] ">
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker className="h-fit !w-[15rem]" placeholder="Start Date" />
        <DatePicker className="h-fit !w-[15rem]" placeholder="End Date" />
        <div className="w-fit">
          <Input className="h-fit w-fit" placeholder="Amount" />
        </div>
        <div className="flex justify-end w-full cursor-pointer">
          <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table
          columns={columns}
          dataSource={subaccounts?.data || []}
          loading={isLoading}
        />
      </div>
      <FundModal
        openFundsModal={openFundsModal}
        close={() => setOpenFundsModal(false)}
        handleOpenWithdrawal={handleOpenWithdrawal}
        data={selectedRecord}
      />

      <WithdrawalModal
        openWithdrawalModal={openWithdrawalModal}
        close={() => setOpenWithdrawalModal(false)}
        accountData={subaccounts?.data || []}
        accountId={data?.data?.main_account?.details?.id}
      />
    </div>
  );
};

export default AccountTable;
