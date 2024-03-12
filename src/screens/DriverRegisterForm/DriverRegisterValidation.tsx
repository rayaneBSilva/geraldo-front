// validationUtils.js
import React from "react";
export const validateUsername = (username:any) => {
    if (username.trim() === "") {
      return { required: true, message: "Nome é obrigatório" };
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
    return /^[a-zA-Z0-9\s]+$/.test(str);
  };
  
  export const validateCPF = (cpf:any) => {
    const isValidLength = cpf.length === 11;
    const isNotAllZeroes = cpf !== '00000000000';
    const containsOnlyNumbers = /^\d+$/.test(cpf);
    
    if(cpf.trim() === ""){
      return { required: true, message: "CPF é obrigatório" };
    }
    if (!isValidLength || !isNotAllZeroes || !containsOnlyNumbers) {
      return { required: true, message: 'CPF inválido' };
    }

  
    return { required: false, message: '' }; 
  };
  
  export const formatCPF = (cpf: any) => {
    // Formatando o CPF como xxx.xxx.xxx-xx
    const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    return formattedCpf;
  };



  export const validateEmail = (email:any) => {
    // checando se o email é vazio
    const isEmpty = email.trim() === '';
    if (isEmpty) {
      return { required: true, message: 'Email é obrigatório' };
    }
  
    // checando a presença de um @
    const hasAtSymbol = email.indexOf('@') !== -1;
    if (!hasAtSymbol) {
      return { required: true, message: 'Email inválido (faltando @)' };
    }
  
    // teste dos caracteres especiais
    const hasSpecialChars = /[^\w@.]/;
    if (hasSpecialChars.test(email)) {
      return { required: true, message: 'Email inválido (caracteres especiais não permitidos)' };
    }
  
    // Assuming a more thorough validation happens elsewhere (e.g., on server-side)
    return { required: false, message: '' };
  };

  export const validateDateOfBirth = (dateOfBirth:any) => {
    // Checando se a data é vazia 
    if (!dateOfBirth.trim()) {
      return { required: true, message: 'Data de nascimento é obrigatória' };
    }

    const isValidLength = dateOfBirth.length === 8;
    const isNotAllZeroes = dateOfBirth !== '000000000000';
    const containsOnlyNumbers = /^\d+$/.test(dateOfBirth);
  
  
  // Split date string using "/" for dd/mm/aaaa format
  const dobParts = dateOfBirth.split("/");
  if (dobParts.length !== 3) {
    return { required: true, message: 'Data inválida, tente no formato dd/mm/aaaa' };
  }

  const [day, month, year] = dobParts.map(Number);
  const birthDate = new Date(year, month - 1, day); // Months are 0-indexed

  // Validate date
  if (isNaN(birthDate.getTime())) {
    return { required: true, message: 'Data inválida' };
  }

  // Check age restrictions
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear() - ((today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) ? 1 : 0);

  if (age < 18) {
    return { required: true, message: 'É necessário ter 18 anos ou mais para se cadastrar' };
  } else if (age > 100) {
    return { required: true, message: 'Idade excede o limite' };
  }
  
    return { required: false, message: '' }; 
  };
  
  export const formatDate = (date: any) => {
    //formatando a data
    const formattedDate = date.replace(/(\d{2})(\d{2})(\d{4})/g, '$1/$2/$3');
    return formattedDate;
  };

  export const formatDateBack = (date:string) => {
    // 20030329
    //29/03/2003
    const day = date.slice(0,2);
    const month = date.slice(3,5);
    const year = date.slice(6, 10)
    
    const newDate = `${year}-${month}-${day}` 
    return newDate;
  }
  
