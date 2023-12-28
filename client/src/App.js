import "./App.css";
import React, { useState } from "react";
import { Context } from "./Context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";

function App() {
  const [defaultValue, setDefaultValue] = useState("");
  const [data, setData] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/details/:id/:month",
      element: <Details />,
    },
  ]);

  return (
    <Context.Provider
      value={{
        defaultValue: defaultValue,
        setDefaultValue: setDefaultValue,
        data: data,
        setData: setData,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Context.Provider>
  );
}

export default App;
