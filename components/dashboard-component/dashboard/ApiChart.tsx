import { Column, ColumnConfig } from "@ant-design/plots";
import { useGetApiCallsQuery } from "@/services/business/index.service";

interface MonthlyData {
  month: string;
  calls: number;
}

const ApiChart = () => {
  const { data: ApiCallsData } = useGetApiCallsQuery({});

  let data = [];

  if (ApiCallsData?.data?.monthly && ApiCallsData.data.monthly.length > 0) {
    // If monthly data is available, use it
    data = ApiCallsData.data.monthly.map((item: MonthlyData) => ({
      month: item.month,
      calls: item.calls,
    }));
  }

  const config: ColumnConfig = {
    data,
    xField: "month",
    yField: "calls",
    isStack: true,
    color: "black",
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (value) => `${value}`, // Format the labels as desired
      },
    },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
    tooltip: false,
    minColumnWidth: 30,
    maxColumnWidth: 30,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return <Column {...config} />;
};

export default ApiChart;
