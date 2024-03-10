// validationUtils.js
import React from "react";
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
  
  export const validateCPF = (cpf:any) => {
    const isValidLength = cpf.length === 11;
    const isNotAllZeroes = cpf !== '00000000000';
    const containsOnlyNumbers = /^\d+$/.test(cpf);
  
    if (!isValidLength || !isNotAllZeroes || !containsOnlyNumbers) {
      return { required: true, message: 'CPF inválido' };
    }

  
    return { required: false, message: '' }; 
  };
  
  export const formatCPF = (cpf: any) => {
    // Formate o CPF como xxx.xxx.xxx-xx
    const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    return formattedCpf;
  };