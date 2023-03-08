export const validate = (data) => {
  const errors = {};
  const nameRegex = /^([A-Z][a-z]*)( [A-Z][a-z]*)*$/;
  const phone_codeRegex = /^[0-9]*\.?[0-9]+$/;
  const codeRegex = /^[A-Z]{2}$/;

  if (!data.name) {
    errors.name = "Country Name Field is required";
  } else if (!nameRegex.test(data.name)) {
    errors.name =
      "Country Name Field must contains characters Only, words must start with capital letters ";
  }

  if (!data.phone_code) {
    errors.phone_code = "Phone Code Field is required";
  } else if (!phone_codeRegex.test(data.phone_code)) {
    errors.phone_code = "Phone Code Field must contains numbers Only ";
  }

  if (!data.code) {
    errors.code = "Country Code Field is required";
  } else if (!codeRegex.test(data.code)) {
    errors.code = "Country Code Field must contains only 2 Capital letters ";
  }
  return errors;
};
