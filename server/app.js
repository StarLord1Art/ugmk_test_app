const express = require("express");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join("../client/build")));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  const results = [];
  const factoryA = [];
  const factoryB = [];
  let sum = [];
  let sum2 = [];

  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);

      const result = results.filter(
        (data) =>
          data.product1 !== "" && data.product2 !== "" && data.date !== ""
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

      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        if (element.factory_id === "1") {
          factoryA.push(element);
        } else if (element.factory_id === "2") {
          factoryB.push(element);
        }
      }

      function addSum(name, month, element, arr) {
        arr.push({
          name: name,
          sum: Number(element.product1) + Number(element.product2),
          month: month,
          date: element.date,
          product1: Number(element.product1),
          product2: Number(element.product2),
        });
      }

      for (let i = 0; i < factoryA.length; i++) {
        const element = factoryA[i];
        if (element.date.split("/")[1] === "1") {
          addSum("Фабрика А", "Янв", element, sum);
        } else if (element.date.split("/")[1] === "2") {
          addSum("Фабрика А", "Фев", element, sum);
        } else if (element.date.split("/")[1] === "3") {
          addSum("Фабрика А", "Мар", element, sum);
        } else if (element.date.split("/")[1] === "4") {
          addSum("Фабрика А", "Апр", element, sum);
        } else if (element.date.split("/")[1] === "5") {
          addSum("Фабрика А", "Май", element, sum);
        } else if (element.date.split("/")[1] === "6") {
          addSum("Фабрика А", "Июн", element, sum);
        } else if (element.date.split("/")[1] === "7") {
          addSum("Фабрика А", "Июл", element, sum);
        } else if (element.date.split("/")[1] === "8") {
          addSum("Фабрика А", "Авг", element, sum);
        } else if (element.date.split("/")[1] === "9") {
          addSum("Фабрика А", "Сен", element, sum);
        } else if (element.date.split("/")[1] === "10") {
          addSum("Фабрика А", "Окт", element, sum);
        } else if (element.date.split("/")[1] === "11") {
          addSum("Фабрика А", "Ноя", element, sum);
        } else if (element.date.split("/")[1] === "12") {
          addSum("Фабрика А", "Дек", element, sum);
        }
      }
      sum = sum.filter(
        (item, i, sum) => i === sum.findIndex((n) => n.month === item.month)
      );

      for (let i = 0; i < factoryB.length; i++) {
        const element = factoryB[i];
        if (element.date.split("/")[1] === "1") {
          addSum("Фабрика Б", "Янв", element, sum2);
        } else if (element.date.split("/")[1] === "2") {
          addSum("Фабрика Б", "Фев", element, sum2);
        } else if (element.date.split("/")[1] === "3") {
          addSum("Фабрика Б", "Мар", element, sum2);
        } else if (element.date.split("/")[1] === "4") {
          addSum("Фабрика Б", "Апр", element, sum2);
        } else if (element.date.split("/")[1] === "5") {
          addSum("Фабрика Б", "Май", element, sum2);
        } else if (element.date.split("/")[1] === "6") {
          addSum("Фабрика Б", "Июн", element, sum2);
        } else if (element.date.split("/")[1] === "7") {
          addSum("Фабрика Б", "Июл", element, sum2);
        } else if (element.date.split("/")[1] === "8") {
          addSum("Фабрика Б", "Авг", element, sum2);
        } else if (element.date.split("/")[1] === "9") {
          addSum("Фабрика Б", "Сен", element, sum2);
        } else if (element.date.split("/")[1] === "10") {
          addSum("Фабрика Б", "Окт", element, sum2);
        } else if (element.date.split("/")[1] === "11") {
          addSum("Фабрика Б", "Ноя", element, sum2);
        } else if (element.date.split("/")[1] === "12") {
          addSum("Фабрика Б", "Дек", element, sum2);
        }
      }
      sum2 = sum2.filter(
        (item, i, sum2) => i === sum2.findIndex((n) => n.month === item.month)
      );

      res.send({ factoryA: sum, factoryB: sum2 });
    });
});

app.listen(5000, console.log("Server is listening on port 5000..."));
