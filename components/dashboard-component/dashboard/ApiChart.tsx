import React from "react";
import { Column } from "@ant-design/plots";

const ApiChart = () => {
  const data = [
    {
      type: "Jan",
      sales: 6000,
    },
    {
      type: "Feb",
      sales: 15000,
    },
    {
      type: "Mar",
      sales: 4000,
    },
    {
      type: "Apr",
      sales: 25000,
    },
    {
      type: "Mei",
      sales: 9000,
    },
    {
      type: "Jun",
      sales: 45000,
    },
    {
      type: "July",
      sales: 10000,
    },
    {
      type: "Aug",
      sales: 25000,
    },
    {
      type: "Sep",
      sales: 30000,
    },
    {
      type: "Oct",
      sales: 5000,
    },
    {
      type: "Nov",
      sales: 23000,
    },
    {
      type: "Dec",
      sales: 24000,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    isStack: true,
    color: "black",
    columnWidthRatio: 1,
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: null,
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
