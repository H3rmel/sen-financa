//#region Imports

import { useEffect } from "react";

import { Link } from "react-router-dom";

//#endregion

export const ErrorLayout = ({ pageTitle, message }) => {
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <article className="card w-5/12 bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{pageTitle}</h2>
          <p>{message}</p>
          <div className="card-actions mt-4">
            <Link to="/" className="btn btn-error w-full">
              Voltar
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};
