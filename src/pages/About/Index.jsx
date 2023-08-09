import { MainLayout } from "@/layouts/Index";

export const About = () => {
  return (
    <MainLayout pageTitle="Sobre">
      <section className="container">
        <h1 className="text-3xl font-semibold tracking-wider">
          Sobre o projeto
        </h1>
        <div className="divider mt-2" />
        <article className="flex gap-8 items-center">
          <div className="tooltip tooltip-bottom" data-tip="E aí, beleza?">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img
                  src="/images/isaac-hermel.jpg"
                  loading="lazy"
                  alt="Isaac Hermel's picture"
                />
              </div>
            </div>
          </div>
          <p className="w-[65%]">
            O <span className="italic">SenFinança </span>🪙 é um webapp
            desenvolvindo por mim (Isaac Hermel Reginato) como parte do teste
            técnico realizado no processo seletivo para a vaga de Analista Front
            End Pleno da{" "}
            <a
              href="https://sensedata.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SenseData
            </a>
            , empresa especialista no segmento de Sucesso e Experiência do
            Cliente (ou Customer Success e Customer Experience, em inglês).
          </p>
        </article>
        <h2 className="text-2xl mt-4">Tecnologias 🛠️</h2>
        <div className="divider mt-2" />
        <p>Para este projeto foram utilizadas as seguintes tecnologias:</p>
        <ul className="list-disc list-inside mt-4">
          <li>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <ul className="list-disc list-inside ml-4">
              <li>
                <a
                  href="https://reactrouter.com/en/main"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Router
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TailwindCSS
            </a>
            <ul className="list-disc list-inside ml-4">
              <li>
                <a
                  href="https://postcss.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Postcss
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/postcss/autoprefixer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autoprefixer
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://daisyui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DaisyUI
            </a>
          </li>
          <li>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ViteJS
            </a>
          </li>
          <li>
            <a
              href="https://phosphoricons.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Phosphor Icons
            </a>
          </li>
          <li>
            <a
              href="https://eslint.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESLint
            </a>
          </li>
        </ul>
      </section>
    </MainLayout>
  );
};
