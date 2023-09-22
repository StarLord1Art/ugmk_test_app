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
      Фильтр по типу продукции
      <Select
        defaultValue={cookies.get("defaultValue")}
        style={{ marginLeft: "5px" }}
        onSelect={(value) => {
          if (value === "Все продукты") {
            object.setDefaultValue("Все продукты");
            cookies.set("defaultValue", "Все продукты", { path: "/" });
          } else if (value === "Продукт 1") {
            object.setDefaultValue("Продукт 1");
            cookies.set("defaultValue", "Продукт 1", { path: "/" });
          } else if (value === "Продукт 2") {
            object.setDefaultValue("Продукт 2");
            cookies.set("defaultValue", "Продукт 2", { path: "/" });
          }
        }}
      >
        <Option value="Все продукты">Все продукты</Option>
        <Option value="Продукт 1">Продукт 1</Option>
        <Option value="Продукт 2">Продукт 2</Option>
      </Select>
    </>
  );
};

export default Filter;
