//#region Imports

//* React
import { useEffect } from "react";

//* Components/UI
import { Navbar } from "@/components/Index";

//#endregion

export const MainLayout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return (
    <>
      <Navbar />
      <main className="my-8">{children}</main>
    </>
  );
};
