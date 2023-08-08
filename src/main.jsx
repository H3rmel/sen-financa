//#region Imports

//* React.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//* React Router
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

//* ContextAPI
import { TransactionProvider } from "./contexts/transactions";

//#endregion

import "@/styles/main.css";

const app = createRoot(document.getElementById("app"));

app.render(
  <StrictMode>
    <TransactionProvider>
      <RouterProvider router={router} />
    </TransactionProvider>
  </StrictMode>
);
