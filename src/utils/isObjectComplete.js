export const isObjectComplete = (obj, fields) => {
  return fields.every((field) => obj[field] !== "" && obj[field] !== 0);
};
