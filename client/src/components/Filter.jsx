import React, { useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { Context } from "../Context";

const Filter = () => {
  var object = useContext(Context);

  const items = [
    {
      key: "1",
      label: "Все продукты",
      onClick: () => {
        object.setProduct1(false);
        object.setProduct2(false);
      },
    },
    {
      key: "2",
      label: "Продукт 1",
      onClick: () => {
        object.setProduct1(true);
        object.setProduct2(false);
      },
    },
    {
      key: "3",
      label: "Продукт 2",
      onClick: () => {
        object.setProduct1(false);
        object.setProduct2(true);
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["1"],
      }}
    >
      <Typography.Link>
        <Space>
          Фильтр по типу продукции
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default Filter;
