//#region Imports

//* React.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//* React Router
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "@picocss/pico"
import "@/styles/main.css";

//#endregion

const app = createRoot(document.getElementById("app"));

app.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
