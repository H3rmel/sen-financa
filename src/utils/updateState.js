export const updateState = (event, setState) => {
  const { name, value } = event.target;

  console.log(value)

  setState((prevState) => ({ ...prevState, [name]: value }));
};
