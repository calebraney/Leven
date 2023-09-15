// checks an element to see if it has a valid color mode and sets the same color mode on another element
export const transferColorMode = function (inputEl, updateEl, attribute = 'section-mode') {
  const validModes = ['1', '2', '3', '4'];
  const pageWrap = document.querySelector('.page_wrap');
  const inputColorMode = inputEl.getAttribute(attribute);
  const pageColorMode = pageWrap.getAttribute('section-mode');
  // if the input color mode is valid apply it to the updateEl
  if (validModes.includes(inputColorMode)) {
    updateEl.setAttribute('section-mode', inputColorMode);
  } else if (validModes.includes(pageColorMode)) {
    // otherwise get the color mode from the pagewrap
    updateEl.setAttribute('section-mode', pageColorMode);
  } else {
    // otherwise use the default color mode
    updateEl.setAttribute('section-mode', '1');
  }
};

// attribute value checker
export const attr = function (defaultVal, attrVal) {
  const defaultValType = typeof defaultVal;
  if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal;
  if (attrVal === 'true' && defaultValType === 'boolean') return true;
  if (attrVal === 'false' && defaultValType === 'boolean') return false;
  if (isNaN(attrVal) && defaultValType === 'string') return attrVal;
  if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal;
  return defaultVal;
};
