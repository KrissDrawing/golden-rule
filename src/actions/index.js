export const removeTask = (id) => {
  return {
    type: "REMOVE_ITEM",
    payload: {
      id,
    },
  };
};
