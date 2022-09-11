const validator = (data) => {
  const errors = {};

  if (!data.username.trim()) {
    errors.username = "please enter your username";
  } else {
    delete errors.username;
  }

  if (!data.password) {
    errors.password = "please enter your password";
  } else if (data.password.length < 6) {
    errors.password = "passwords should be more than 6 charracters";
  } else {
    delete errors.password;
  }

  return errors;
};

const validatorSignup = (data) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const errors = {};

  if (!data.name.trim()) {
    errors.name = "please enter your name";
  } else {
    delete errors.name;
  }

  if (!data.family.trim()) {
    errors.family = "please enter your family name";
  } else {
    delete errors.family;
  }

  if (!data.username.trim()) {
    errors.username = "please enter your username";
  } else if (!emailRegex.test(data.username)) {
    errors.username = "Email Address is invalid!";
  } else {
    delete errors.username;
  }

  if (!data.password) {
    errors.password = "please enter your password";
  } else if (data.password.length < 6) {
    errors.password = "passwords should be more than 6 charracters";
  } else {
    delete errors.password;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords does not Match!";
  } else {
    delete errors.confirmPassword;
  }

  return errors;
};

export { validator, validatorSignup };
