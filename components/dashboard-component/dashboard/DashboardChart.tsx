import { Line, LineConfig } from "@ant-design/plots";

const data = [
  {
    time: "Sun",
    value: 10000,
    category: "Label 1",
  },
  {
    time: "Mon",
    value: 5000,
    category: "Label 2",
  },
  {
    time: "Tues",
    value: 15000,
    category: "Label 1",
  },
  {
    time: "Wed",
    value: 20000,
    category: "Label 2",
  },
  {
    time: "Thurs",
    value: 1000,
    category: "Label 1",
  },
  {
    time: "Fri",
    value: 20000,
    category: "Label 2",
  },
  {
    time: "Sat",
    value: 18000,
    category: "Label 1",
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
