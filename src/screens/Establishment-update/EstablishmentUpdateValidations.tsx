export const validateName = (name: any) =>  {
    if(!name.trim()){
        return "O nome não pode ser vazio"
    }
    return "";
};
export const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.trim()){
        return "O email não pode ser vazio"
    }else if (!emailRegex.test(email)){
        return "Formato de e-mail inválido"
    }
    return "";
};


export const validateCEP = (cep: any) =>{
    if(!cep.trim()){
        return "O CEP não pode ser vazio"
    }else if(!(cep.length == 8)){
        return "O CEP deve ter 8 dígitos"
    }
        return "";
}

export const formatCEP = (cep:any) =>{
    if(cep && cep.length === 8){
        return cep.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3");
    }
    return cep;
}