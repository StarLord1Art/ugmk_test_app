import "./App.css";
import React, { useState } from "react";
import { Context } from "./Context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";

function App() {
  const [product1, setProduct1] = useState(false);
  const [product2, setProduct2] = useState(false);

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
        product1: product1,
        setProduct1: setProduct1,
        product2: product2,
        setProduct2: setProduct2,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Context.Provider>
  );
}

export default App;
