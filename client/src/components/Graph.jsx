import React, { useState, useEffect, useContext } from "react";
import { Column } from "@ant-design/plots";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

const DemoColumn = () => {
  const [data, setData] = useState([]);
  const { defaultValue } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  }, []);

  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField:
      defaultValue === "Продукт 1"
        ? "product1"
        : defaultValue === "Продукт 2"
        ? "product2"
        : "sum",
    seriesField: "name",
    color: ["red", "blue"],
    legend: {
      position: "bottom",
      flipPage: false,
    },
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    onReady: (plot) => {
      plot.on("element:click", (args) => {
        console.log(args.data.data);
        let data = args.data.data;
        let month = data.date.split("/")[1];
        let name = data.name === "Фабрика А" ? "1" : "2";
        navigate(`/details/${name}/${month}`, {
          state: {
            data,
          },
        });
        window.location.reload();
      });
    },
  };

  return <Column {...config} />;
};

export default DemoColumn;
