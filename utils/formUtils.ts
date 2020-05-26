import Axios from "axios";
import { sendEncryptRegisterURL } from "../globalVariables";

export const ValidateNotEmptyFiels = (obj: any) => {
  let flag = true;
  Object.values(obj).map((field:any) => {
    if (field.trim() === '')
      flag = false;
  })
  return flag;
};

export const ValidateEmail = (email: string) => {
  return (
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .test(email)
  )
};

export const ValidatePassword = (password: string, minLength: number) => {
  return (password.length >= minLength && /\d/.test(password))
};


export const ExceptionHandler = (message: string, strictInfo?: boolean) => {
  
  if (strictInfo) {
    const optionsMapper: { [key: string]: string } = {
      "CodeMismatchException": "El código ingresado es incorrecto",
      "UserNotFoundException": "El correo ingresado no ha sido registrado",
      "NotAuthorizedException": "Contraseña incorrecta",
      "UsernameExistsException": "El correo ingresado ya está registrado"
    }
    return optionsMapper[message];
  } else {
    alert(message);
  }
};

export const SideRegisterService = (link?: string | string[], name?: string, phone_number?: string) => 
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: sendEncryptRegisterURL,
    data: {
      link,
      name,
      phone_number
    }
  })

export const NormalRegister = (link?: string | string[], name?: string, phone_number?: string, division_number?: string, residential_unit_number?: string) => 
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: sendEncryptRegisterURL,
    data: {
      link,
      name,
      phone_number,
      division_number,
      residential_unit_number,
    }
  })

export const RemoveSpecialCharacters = (str: string) => {
  return (
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
};
