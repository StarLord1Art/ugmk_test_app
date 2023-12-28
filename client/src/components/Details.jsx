import React from "react";
import { Pie } from "@ant-design/plots";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Details() {
  const { state } = useLocation();
  console.log({ state });

  const data = [
    {
      type: "Показатель 1",
      value: state.data.indicator1,
    },
    {
      type: "Показатель 2",
      value: state.data.indicator2,
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
      <Link
        to={"/"}
        style={{
          color: "black",
          textDecoration: "none",
          textAlign: "left",
        }}
      >
        <h3 style={{ marginLeft: "50px" }}>Назад</h3>
      </Link>
      <h1>
        Статистика по показателям{" "}
        {state.data.name === "Объект 1" ? "Объекта 1" : "Объекта 2"} за{" "}
        {state.data.month}
      </h1>
      <Pie {...config} />
    </>
  );
}

export default Details;
