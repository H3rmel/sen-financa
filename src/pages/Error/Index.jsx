//#region Imports

import { ErrorLayout } from "@/layouts/Index";

import { Link, useRouteError } from "react-router-dom";

//#endregion

export const Error = () => {
  const error = useRouteError();

  return (
    <ErrorLayout pageTitle={error.message}>
      <article>
        <header>
          <h1>Um erro ocorreu!</h1>
        </header>
        <p>{error.message}</p>
        <footer>
          <Link to="/" role="button">
            Voltar
          </Link>
        </footer>
      </article>
    </ErrorLayout>
  );
};
