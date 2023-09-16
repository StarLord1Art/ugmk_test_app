import React from "react";
import Graph from "./Graph";
import Filter from "./Filter";
import "./styles/Main.css";

function Main() {
  return (
    <>
      <div className="main_div" style={{ width: "53%", textAlign: "right" }}>
        <Filter />
      </div>
      <div className="main_div" style={{ padding: "5px 20px" }}>
        <Graph />
      </div>
    </>
  );
}

export default Main;
