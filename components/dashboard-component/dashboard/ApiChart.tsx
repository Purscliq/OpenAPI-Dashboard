import { Column, ColumnConfig } from "@ant-design/plots";

interface MonthlyData {
  month: string;
  calls: number;
}
interface ApiCallsData {
  monthly: MonthlyData[];
  total_calls: number;
}

const ApiChart: React.FC<{ data: ApiCallsData }> = ({ data }) => {
  const { monthly } = data;

  const api = monthly.map((item: MonthlyData) => ({
    month: item.month,
    calls: item.calls,
  }));

  const config: ColumnConfig = {
    data: api,
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
