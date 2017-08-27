export const makeFull = (path, staticUrl) => {
  let url = staticUrl;
  if (url[url.length - 1] !== '/') {
    url = `${url}/`;
  }

  return `${staticUrl}${path}`;
};

export const updateUrl = (el, staticUrl, attr) => {
  const link = el.getAttribute(attr);
  if (link) {
    el.setAttribute(attr, makeFull(link, staticUrl));
  }

  return el;
};
