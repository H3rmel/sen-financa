export const updateState = (event, setState) => {
  const { name, value } = event.target;

  setState((prevState) => ({ ...prevState, [name]: value }));
};

export const updateStateMaskedInput = (value, event, setState) => {
  const name = event.target.name;
  if (name !== undefined)
    setState((prevState) => ({ ...prevState, [name]: value }));
};
