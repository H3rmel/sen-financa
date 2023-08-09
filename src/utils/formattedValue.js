export const getFormattedValue = (value) => {
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  
  return new Intl.NumberFormat("pt-BR", options).format(value);
};
