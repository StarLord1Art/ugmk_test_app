import React, { useState, useEffect, useContext } from "react";
import { Column } from "@ant-design/plots";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

const DemoColumn = () => {
  const [data, setData] = useState([]);
  const { product1, product2 } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let preData = [];

        preData.push(res.factoryA);
        preData.push(res.factoryB);

        setData(preData.flat(Infinity));
      });
  }, []);

  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField:
      product1 === true ? "product1" : product2 === true ? "product2" : "sum",
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
      if (product1 === false && product2 === false) {
        plot.on("element:click", (args) => {
          console.log(args.data.data);
          let data = args.data.data;
          let month = data.date.split("/")[1];
          let name = data.name === "Factory A" ? 1 : 2;
          navigate(`/details/${name}/${month}`, {
            state: {
              data,
            },
          });
        });
      }
    },
  };

  return <Column {...config} />;
};

export default DemoColumn;
