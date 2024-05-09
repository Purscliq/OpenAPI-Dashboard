import { Line, LineConfig } from "@ant-design/plots";

const data = [
  {
    time: "Sun",
    value: 0,
    category: "Inflow",
  },
  {
    time: "Mon",
    value: 0,
    category: "Outflow",
  },
  {
    time: "Tues",
    value: 0,
    category: "Inflow",
  },
  {
    time: "Wed",
    value: 0,
    category: "Outflow",
  },
  {
    time: "Thurs",
    value: 0,
    category: "Inflow",
  },
  {
    time: "Fri",
    value: 0,
    category: "Outflow",
  },
  {
    time: "Sat",
    value: 0,
    category: "Inflow",
  },
];

const DashbordChart = () => {
  const config: LineConfig = {
    data,
    xField: "time",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v: string) => `${parseInt(v, 10) / 1000}k`,
      },
    },
  };
  return <Line {...config} />;
};

export default DashbordChart;
