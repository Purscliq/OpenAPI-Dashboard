import { useGetDashboardQuery } from "@/services/business/index.service";
import { Line, LineConfig } from "@ant-design/plots";
import { SetStateAction, useState } from "react";

const Chart = ({ transactionData, period }: any) => {
  let data: { time: string; amount: any; type: string }[] = [];

  // if (
  //   transactionData &&
  //   transactionData.daily_transactions &&
  //   transactionData.daily_transactions.length > 0
  // ) {
  //   const dailyData = transactionData.daily_transactions[0].months[0].weeks[0];

  //   const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  //   daysOfWeek.forEach((day) => {
  //     const inflowData = dailyData.inflow.find(
  //       (entry: { day: string }) => entry.day === day
  //     );
  //     const outflowData = dailyData.outflow.find(
  //       (entry: { day: string }) => entry.day === day
  //     );

  //     const inflowAmount = inflowData ? inflowData.amount : 0;
  //     const outflowAmount = outflowData ? outflowData.amount : 0;

  //     // Push the data for the current day
  //     data.push({ time: day, amount: inflowAmount, type: "Inflow" });
  //     data.push({ time: day, amount: outflowAmount, type: "Outflow" });
  //   });
  // } else {
  //   const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  //   daysOfWeek.forEach((day) => {
  //     data.push({ time: day, amount: 0, type: "Inflow" });
  //     data.push({ time: day, amount: 0, type: "Outflow" });
  //   });
  // }

  if (transactionData) {
    if (
      period === "daily" &&
      transactionData.daily_transactions &&
      transactionData.daily_transactions.length > 0
    ) {
      const dailyData =
        transactionData.daily_transactions[0].months[0].weeks[0];
      const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

      daysOfWeek.forEach((day) => {
        const inflowData = dailyData.inflow.find(
          (entry: { day: string }) => entry.day === day
        );
        const outflowData = dailyData.outflow.find(
          (entry: { day: string }) => entry.day === day
        );

        const inflowAmount = inflowData ? inflowData.amount : 0;
        const outflowAmount = outflowData ? outflowData.amount : 0;

        data.push({ time: day, amount: inflowAmount, type: "Inflow" });
        data.push({ time: day, amount: outflowAmount, type: "Outflow" });
      });
    } else if (
      period === "monthly" &&
      transactionData.monthly_transactions &&
      transactionData.monthly_transactions.length > 0
    ) {
      const monthlyData = transactionData.monthly_transactions[0].months[0];
      const monthsOfYear = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      monthsOfYear.forEach((month) => {
        
        const inflowAmount = monthlyData.inflow || 0;
        const outflowAmount = monthlyData.outflow || 0;

        data.push({ time: month, amount: inflowAmount, type: "Inflow" });
        data.push({ time: month, amount: outflowAmount, type: "Outflow" });
      });
    }
  }

  const config: LineConfig = {
    data,
    xField: "time",
    yField: "amount",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v: string) => `${parseInt(v, 10) / 1000}k`,
      },
    },
  };

  return <Line {...config} />;
};

const DashboardChart = () => {
  const { data } = useGetDashboardQuery({});
  const transactionData = data?.data?.transaction_charts;

  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const handlePeriodChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <article className="border border-gray-200 p-4 rounded-[20px]  flex flex-col space-y-4 bg-white">
      <div className="flex  justify-between items-center p-2">
        <p className="text-[20px] font-bold">Transaction Analytics</p>
        <select
          className="select text-[#3A3F51]  w-fit h-[2em] !border !border-gray-300 !min-h-[1rem] rounded-[6px]"
          title="Period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Chart transactionData={transactionData} period={selectedPeriod} />
    </article>
  );
};

export default DashboardChart;
