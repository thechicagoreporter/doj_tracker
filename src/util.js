export const addClass = function addCssClass(els, className) {
  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className);
    }
    else {
      el.className += ' ' + className;
    }
  });
};

export const removeClass = function removeCssClass(els, className) {
  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className);
    }
    else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' +
          className.split(' ')
            .join('|') +
          '(\\b|$)', 'gi'
        ),
        ' '
      );
    }
  });
};

export const addEventListener = function addEventListenerForEls(
  els,
  eventName,
  eventHandler
) {
  els.forEach((el) => {
    el.addEventListener(eventName, eventHandler);
  });
};
