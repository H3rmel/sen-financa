import { ErrorLayout } from "@/layouts/Index";

export const Error = () => {
  const error = useRouteError();

  return <ErrorLayout pageTitle="Um erro aconteceu!" message={error.message} />;
};
