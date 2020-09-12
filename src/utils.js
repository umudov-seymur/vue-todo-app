export default {
  parseError: (errors) => {
    let ERRORS = [];

    for (const message of Object.values(errors)) {
      ERRORS.push(message[0]);
    }
    return ERRORS;
  },
  textToUppercase: (value) => {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};
