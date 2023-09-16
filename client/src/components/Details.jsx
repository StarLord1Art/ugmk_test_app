import React from "react";
import { Pie } from "@ant-design/plots";
import { useLocation } from "react-router-dom";

function Details() {
  const { state } = useLocation();
  console.log({ state });

  const data = [
    {
      type: "Продукт 1",
      value: state.data.product1,
    },
    {
      type: "Продукт 2",
      value: state.data.product2,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    color: ["green", "orange"],
    legend: {
      position: "bottom",
      flipPage: false,
    },
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <h1>
        Статистика по продукции{" "}
        {state.data.name === "Фабрика А" ? "фабрики А" : "фабрики Б"} за{" "}
        {state.data.month}
      </h1>
      <Pie {...config} />
    </>
  );
}

export default Details;
