export const urlBuilder = (controller, action, id = undefined) => {
  return `/${controller}/${id ? `${id}/` : ''}${action}`;
}
