export const addClass = function addCssClass(els, className) {
  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className);
    } else {
      // eslint-disable-next-line no-param-reassign
      el.className += ` ${className}`;
    }
  });
};

export const removeClass = function removeCssClass(els, className) {
  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      const classNameOptions = className.split(' ').join('|');
      // eslint-disable-next-line no-param-reassign
      el.className = el.className.replace(
        new RegExp(
          `(^|\\b)${classNameOptions}(\\b|$)`,
          'gi',
        ),
        ' ',
      );
    }
  });
};

export const addEventListener = function addEventListenerForEls(
  els,
  eventName,
  eventHandler,
) {
  els.forEach((el) => {
    el.addEventListener(eventName, eventHandler);
  });
};
