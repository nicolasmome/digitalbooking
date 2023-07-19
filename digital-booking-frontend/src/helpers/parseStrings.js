const removeHyphens = (text) => {
  return text.split("-").join(" ");
};

const convertFirstLetterToUpperCase = (text) => {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
};

const convertToUpperCase = (text) => {
  return text.toUpperCase();
};

const convertToLowerCase = (text) => {
  return text.toLowerCase();
};


export {
  removeHyphens,
  convertFirstLetterToUpperCase,
  convertToUpperCase,
  convertToLowerCase,
};
