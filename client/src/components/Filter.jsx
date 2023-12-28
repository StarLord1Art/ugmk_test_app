import React, { useContext, useEffect } from "react";
import { Select } from "antd";
import { Context } from "../Context";
import Cookies from "universal-cookie";

const Filter = () => {
  let object = useContext(Context);

  const { Option } = Select;
  const cookies = new Cookies();

  useEffect(() => {
    object.setDefaultValue(cookies.get("defaultValue"));
  }, []);

  return (
    <>
      Фильтр по типу показателей
      <Select
        defaultValue={cookies.get("defaultValue")}
        style={{ marginLeft: "5px" }}
        onSelect={(value) => {
          if (value === "Все показатели") {
            object.setDefaultValue("Все показатели");
            cookies.set("defaultValue", "Все показатели", { path: "/" });
          } else if (value === "Показатель 1") {
            object.setDefaultValue("Показатель 1");
            cookies.set("defaultValue", "Показатель 1", { path: "/" });
          } else if (value === "Показатель 2") {
            object.setDefaultValue("Показатель 2");
            cookies.set("defaultValue", "Показатель 2", { path: "/" });
          }
        }}
      >
        <Option value="Все показатели">Все показатели</Option>
        <Option value="Показатель 1">Показатель 1</Option>
        <Option value="Показатель 2">Показатель 2</Option>
      </Select>
    </>
  );
};

export default Filter;
