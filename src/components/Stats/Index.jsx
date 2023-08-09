//#region Imports

//* React
import { useMemo } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Stat } from "../Index";

//* Services
import { getEntries } from "@/services/transactions";

//* Utils
import { getFormattedValue } from "@/utils/formattedValue";

//#endregion

export const Stats = () => {
  const { transactions } = useApp();

  //#region useMemos

  const totalEntries = useMemo(() => {
    return getEntries();
  }, [transactions]);

  const totalIncomes = useMemo(() => {
    return getEntries("income");
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return getEntries("expense");
  }, [transactions]);

  //#endregion

  return (
    <article className="stats w-full overflow-x-auto border-[1px] border-neutral shadow-xl mt-8 mx-auto">
      <Stat
        title="Total"
        value={getFormattedValue(totalEntries)}
        description="Valor total das entradas e saídas."
      />
      <Stat
        title="Entradas"
        value={getFormattedValue(totalIncomes)}
        description="Valor total somente das entradas."
      />
      <Stat
        title="Saídas"
        value={getFormattedValue(totalExpenses)}
        description="Valor total somente das saídas."
      />
    </article>
  );
};
