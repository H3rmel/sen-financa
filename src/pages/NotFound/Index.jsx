//#region Imports

import { ErrorLayout } from "@/layouts/Index";

import { Link } from "react-router-dom";

//#endregion

export const NotFound = () => {
  return (
    <ErrorLayout>
      <article>
        <header>
          <h1>Página não encontrada!</h1>
        </header>
        <p>
          Infelizmente não encontramos a página que você pesquisoua ☹️ clique no
          botão abaixo para voltar à Home.
        </p>
        <footer>
          <Link to="/" role="button">
            Voltar
          </Link>
        </footer>
      </article>
    </ErrorLayout>
  );
};
