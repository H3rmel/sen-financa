import { useEffect } from "react";

export const ErrorLayout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return <main className="error">{children}</main>;
};
