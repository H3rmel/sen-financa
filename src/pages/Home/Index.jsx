import { useState } from "react";
import { MainLayout } from "@/layouts/Index";

export const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout pageTitle="Home">
      <article>
        <button onClick={() => setOpen(true)}>Launch demo modal</button>
        <dialog open={open}>
          <article>
            <header>
              <button
                aria-label="Close"
                className="close"
                onClick={() => setOpen(false)}
              ></button>
              <h3>Adicionar transação</h3>
            </header>
            <form>
              <div className="grid">
                <label htmlFor="title">
                  Título
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Título"
                    required
                  />
                </label>
                <label htmlFor="type">
                  Tipo
                  <select id="type" name="type" required>
                    <option value="1">Entrada</option>
                    <option value="2">Saída</option>
                  </select>
                </label>
              </div>
              <div className="grid">
                <label htmlFor="title">
                  Categoria
                  <select id="category" name="category" required>
                    <option value="1">A</option>
                    <option value="2">B</option>
                  </select>
                </label>
                <label htmlFor="value">
                  Valor
                  <input
                    type="number"
                    name="value"
                    id="value"
                    placeholder="Valor..."
                    required
                  />
                </label>
              </div>
            </form>
            <footer>
              <button className="secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="" onClick={() => setOpen(false)}>
                Salvar
              </button>
            </footer>
          </article>
        </dialog>
      </article>
    </MainLayout>
  );
};
