// validationUtils.js

export const validateUsername = (username:any) => {
    if (username.trim() === "") {
      return { required: true, message: "Campo obrigatório" };
    } else if (!checkMinLength(username, 4)) {
      return { required: true, message: "Nome deve ter pelo menos 4 caracteres" };
    } else if (!containsOnlyLettersAndNumbers(username)) {
      return { required: true, message: "Nome não pode conter caracteres especiais" };
    } else {
      return { required: false, message: "" };
    }
  };
  
  export const checkMinLength = (str:any, minLength:any) => {
    return str.length >= minLength;
  };
  
  export const containsOnlyLettersAndNumbers = (str:any) => {
    return /^[a-zA-Z0-9]+$/.test(str);
  };
  
  