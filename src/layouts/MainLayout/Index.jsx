//#region Imports

import { useEffect } from "react";

import { Navbar } from "@/components/Index";

//#endregion

export const MainLayout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
};
