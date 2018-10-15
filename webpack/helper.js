const urlBuilder = (controller, action, id = undefined) =>
  `/${controller}/${id ? `${id}/` : ''}${action}`;

export default { urlBuilder };
