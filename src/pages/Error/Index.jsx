//#region Imports

import { ErrorLayout } from "@/layouts/Index";

import { useRouteError } from "react-router-dom";

//#endregion

export const Error = () => {
  const error = useRouteError();

  return <ErrorLayout pageTitle="Um erro aconteceu!" message={error.message} />;
};
