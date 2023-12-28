import React from "react";
import Graph from "./Graph";
import Filter from "./Filter";
import "./styles/Main.css";
import Papa from "papaparse";
import { Context } from "../Context";
import { useContext } from "react";

function Main() {
  let object = useContext(Context);

  return (
    <>
      <div
        className="main_div"
        style={{ width: "62%", textAlign: "right", padding: "5px" }}
      >
        <Filter />
      </div>
      <div className="main_div" style={{ padding: "5px 20px" }}>
        <Graph />
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          onChange={(event) => {
            let file = event.target.files[0];
            Papa.parse(file, {
              header: true,
              complete: function (results) {
                console.log(results.data);
                let info = results.data;

                let result = info.filter(
                  (data) =>
                    data.indicator1 !== "" &&
                    data.indicator2 !== "" &&
                    data.indicator3 !== "" &&
                    data.date !== "" &&
                    data.object_id !== "" &&
                    data.id !== ""
                );

                for (let i = 0; i <= 2; i++) {
                  result.sort((a, b) => {
                    a = a.date.split("/");
                    b = b.date.split("/");

                    return Number(a[i]) > Number(b[i])
                      ? 1
                      : Number(a[i]) < Number(b[i])
                      ? -1
                      : 0;
                  });
                }
                console.log(result);

                let object1 = [];
                let object2 = [];

                for (let i = 0; i < result.length; i++) {
                  const element = result[i];
                  if (element.object_id === "1") {
                    object1.push(element);
                  } else if (element.object_id === "2") {
                    object2.push(element);
                  }
                }

                console.log(object1);
                console.log(object2);

                object1 = object1.filter(
                  (item, i, object1) =>
                    i === object1.findIndex((n) => n.date === item.date)
                );
                object2 = object2.filter(
                  (item, i, object2) =>
                    i === object2.findIndex((n) => n.date === item.date)
                );

                console.log(object1);
                console.log(object2);

                let reducedIndicators1 = [];
                let reducedIndicators2 = [];

                function reduceIndicators(name, month, monthName, arr, newArr) {
                  let indicator1 = arr.reduce((acc, item) => {
                    if (item.date.split("/")[1] === month) {
                      return acc + Math.round(Number(item.indicator1) / 1000);
                    } else {
                      return acc;
                    }
                  }, 0);
                  console.log(indicator1);
                  let indicator2 = arr.reduce((acc, item) => {
                    if (item.date.split("/")[1] === month) {
                      return acc + Math.round(Number(item.indicator2) / 1000);
                    } else {
                      return acc;
                    }
                  }, 0);
                  console.log(indicator2);
                  let sum = indicator1 + indicator2;
                  newArr.push({
                    name: name,
                    sum: sum,
                    month: monthName,
                    date: ` /${month}/2022`,
                    indicator1: indicator1,
                    indicator2: indicator2,
                  });
                }

                reduceIndicators(
                  "Объект 1",
                  "1",
                  "Янв",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "2",
                  "Фев",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "3",
                  "Мар",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "4",
                  "Апр",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "5",
                  "Май",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "6",
                  "Июн",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "7",
                  "Июл",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "8",
                  "Авг",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "9",
                  "Сен",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "10",
                  "Окт",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "11",
                  "Ноя",
                  object1,
                  reducedIndicators1
                );
                reduceIndicators(
                  "Объект 1",
                  "12",
                  "Дек",
                  object1,
                  reducedIndicators1
                );

                reduceIndicators(
                  "Объект 2",
                  "1",
                  "Янв",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "2",
                  "Фев",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "3",
                  "Мар",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "4",
                  "Апр",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "5",
                  "Май",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "6",
                  "Июн",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "7",
                  "Июл",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "8",
                  "Авг",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "9",
                  "Сен",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "10",
                  "Окт",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "11",
                  "Ноя",
                  object2,
                  reducedIndicators2
                );
                reduceIndicators(
                  "Объект 2",
                  "12",
                  "Дек",
                  object2,
                  reducedIndicators2
                );

                console.log(reducedIndicators1);
                console.log(reducedIndicators2);

                let data = reducedIndicators1.concat(reducedIndicators2);
                object.setData(data);
              },
            });
          }}
        />
      </div>
    </>
  );
}

export default Main;
