export const createSave = async (id: string) => {
  await fetch(`/api/save/${id}`, {
    method: "PUT",
  });
};

export const deleteSave = async (id: string) => {
  await fetch(`/api/save/${id}`, {
    method: "DELETE",
  });
};
