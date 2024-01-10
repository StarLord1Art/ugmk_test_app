import React, { useContext, useState } from "react";
import { Column } from "@ant-design/plots";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

const DemoColumn = () => {
  const { data } = useContext(Context);
  const { defaultValue } = useContext(Context);
  const navigate = useNavigate();
  const [redirectToPie, setRedirectToPie] = useState(false);

  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField:
      defaultValue === "Показатель 1"
        ? "indicator1"
        : defaultValue === "Показатель 2"
        ? "indicator2"
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
        let data = args.data.data;
        let month = data.date.split("/")[1];
        let name = data.name === "Объект 1" ? "1" : "2";
        setRedirectToPie({ month, name, data });
      });
    },
  };

  if (redirectToPie) {
    navigate(`/details/${redirectToPie.name}/${redirectToPie.month}`, {
      state: {
        data: redirectToPie.data,
      },
    });
  }

  return <Column {...config} />;
};

export default DemoColumn;
