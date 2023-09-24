const express = require("express");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  let results = [];
  let factoryA = [];
  let factoryB = [];

  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);

      let result = results.filter(
        (data) =>
          data.product1 !== "" &&
          data.product2 !== "" &&
          data.product3 !== "" &&
          data.date !== "" &&
          data.factory_id !== "" &&
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

      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        if (element.factory_id === "1") {
          factoryA.push(element);
        } else if (element.factory_id === "2") {
          factoryB.push(element);
        }
      }

      console.log(factoryA);
      console.log(factoryB);

      factoryA = factoryA.filter(
        (item, i, factoryA) =>
          i === factoryA.findIndex((n) => n.date === item.date)
      );
      factoryB = factoryB.filter(
        (item, i, factoryB) =>
          i === factoryB.findIndex((n) => n.date === item.date)
      );

      console.log(factoryA);
      console.log(factoryB);

      let reducedProductsA = [];
      let reducedProductsB = [];

      function reduceProducts(name, month, monthName, arr, newArr) {
        let product1 = arr.reduce((acc, item) => {
          if (item.date.split("/")[1] === month) {
            return acc + Math.round(Number(item.product1) / 1000);
          } else {
            return acc;
          }
        }, 0);
        console.log(product1);
        let product2 = arr.reduce((acc, item) => {
          if (item.date.split("/")[1] === month) {
            return acc + Math.round(Number(item.product2) / 1000);
          } else {
            return acc;
          }
        }, 0);
        console.log(product2);
        let sum = product1 + product2;
        newArr.push({
          name: name,
          sum: sum,
          month: monthName,
          date: ` /${month}/2022`,
          product1: product1,
          product2: product2,
        });
      }

      reduceProducts("Фабрика А", "1", "Янв", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "2", "Фев", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "3", "Мар", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "4", "Апр", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "5", "Май", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "6", "Июн", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "7", "Июл", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "8", "Авг", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "9", "Сен", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "10", "Окт", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "11", "Ноя", factoryA, reducedProductsA);
      reduceProducts("Фабрика А", "12", "Дек", factoryA, reducedProductsA);

      reduceProducts("Фабрика Б", "1", "Янв", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "2", "Фев", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "3", "Мар", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "4", "Апр", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "5", "Май", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "6", "Июн", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "7", "Июл", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "8", "Авг", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "9", "Сен", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "10", "Окт", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "11", "Ноя", factoryB, reducedProductsB);
      reduceProducts("Фабрика Б", "12", "Дек", factoryB, reducedProductsB);

      console.log(reducedProductsA);
      console.log(reducedProductsB);

      let data = reducedProductsA.concat(reducedProductsB);

      res.send({ data: data });
    });
});

app.listen(5000, console.log("Server is listening on port 5000..."));
