import { useState, useContext } from 'react';
import Router from 'next/router';

import Context from '../../../globalState/context';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

const COMPONENT_NAME = 'sign-up';

import { SignUpSyles } from './styles';

import { SignUpService } from '../../../utils/session';
import { ValidateNotEmptyFiels, ExceptionHandler, ValidateEmail, ValidatePassword } from '../../../utils/formUtils';

import { CreateNewUserService } from '../../../utils/dbUtils';

const SignUp = () => {
  const { actions } = useContext(Context);
  const [fields, setFields] = useState({
    name: '', lastname: '', email: '', tlf: '', pass: '', repeated_pass: ''
  });
  const [checkedOption, setCheckedOption] = useState({o1: false, o2: false});

  const changeRoute = () => {
    Router.push('/signin');
  };

  const validateBeforeSignup = () => {
    if (!ValidateNotEmptyFiels(fields)) {
      ExceptionHandler('No pueden quedar campos vacíos');
      return;
    } else if (!ValidateEmail(fields.email)) {
      ExceptionHandler('El correo electrónico no es válido');
      return;
    } else if (fields.tlf.trim().length !== 10) {
      ExceptionHandler('El número de celular es inválido');
      return;
    } else if (!ValidatePassword(fields.pass, 6)) {
      ExceptionHandler('La contraseña debe ser de al menos 6 caracteres y tener el menos un número');
      return;
    } else if (fields.pass !== fields.repeated_pass) {
      ExceptionHandler('Las contraseñas no coinciden');
      return;
    } else if (!checkedOption.o1 && !checkedOption.o2) {
      ExceptionHandler('Debe seleccionar un el tipo de usuario');
      return;
    }
    SignUp();
  };

  const SignUp = () => {
    SignUpService(fields.email, fields.pass)
      .then((res) => {
        actions({
          type: 'setState',
          payload: {
            signup: {
              email: fields.email,
              password: fields.pass
            }
          }
        })
        sendRequestToDB(res.userSub);
        alert("Se ha enviado un código de verificación a " + fields.email);
        Router.push('/code-confirmation');
      })
      .catch((err) => {
        if (err.name === "UsernameExistsException") {
          ExceptionHandler(ExceptionHandler(err.name, true) as string);
          setFields({...fields, email: ''});
        } else {
          console.log(err);
          ExceptionHandler('Hubo un error creando el usuario, intente de nuevo más tarde')
        }
      })
  };

  const sendRequestToDB = async (userId: string) => {
    let date = new Date().toISOString();
    await CreateNewUserService({
      id_user: userId,
      id_project: '',
      name: `${fields.name} ${fields.lastname}`,
      email: fields.email,
      phone_number: fields.tlf,
      creation_date: date,
      modification_date: date,
      type_user: checkedOption.o1 ? 'admin' : 'copropietario',
      areas: '',
      role: '',
      permissions: {}
    })
      .then(res => console.log('%c success', 'color: green;', res.data))
      .catch(err => console.log(err))
  };

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <img className={`${COMPONENT_NAME}__main-content_logo`} src={'/static/images/hsg-logo.png'}/>

        <p className={`${COMPONENT_NAME}__main-content_title`}> Registro </p>
        <div className={`${COMPONENT_NAME}__main-content_inputs`}>
          <div className={`${COMPONENT_NAME}__main-content_inputs_name`}>
            <Input value={fields.name} onChangeHandler={(value) => setFields({...fields, name: value.trim()})} type={'string'} title={'Nombre'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_lastname`}>
            <Input value={fields.lastname} onChangeHandler={(value) => setFields({...fields, lastname: value.trim()})} type={'string'} title={'Apellido'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_email`}>
            <Input value={fields.email} onChangeHandler={(value) => setFields({...fields, email: value.trim()})} type={'string'} title={'Correo Electrónico'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_tlf`}>
            <Input value={fields.tlf} maxLength={10} onChangeHandler={(value) => setFields({...fields, tlf: value.trim()})} type={'number'} title={'Número de celular'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_pass`}>
            <Input value={fields.pass} onChangeHandler={(value) => setFields({...fields, pass: value.trim()})} type={'password'} title={'Contraseña'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_pass-repeat`}>
            <Input value={fields.repeated_pass} onChangeHandler={(value) => setFields({...fields, repeated_pass: value.trim()})} type={'password'} title={'Confirme Contraseña'}/>
          </div>
          
          <div className={`${COMPONENT_NAME}__main-content_inputs_user-type`}>
            <div className={`${COMPONENT_NAME}__main-content_inputs_user-type_option`}>
              <p className={`${COMPONENT_NAME}__main-content_inputs_user-type_option_message`}> Soy Administrador </p>
              <input 
                onChange={() => setCheckedOption({o1: true, o2: false})}
                checked={checkedOption.o1}
                type={'checkbox'} 
                className={`${COMPONENT_NAME}__main-content_inputs_user-type_option_checkbox`}/>
            </div>

            <div className={`${COMPONENT_NAME}__main-content_inputs_user-type_option`}>
              <p className={`${COMPONENT_NAME}__main-content_inputs_user-type_option_message`}> Soy Co - Propietario </p>
              <input 
                onChange={() => setCheckedOption({o1: false, o2: true})}
                checked={checkedOption.o2}
                type={'checkbox'} 
                className={`${COMPONENT_NAME}__main-content_inputs_user-type_option_checkbox`}/>
            </div>
          </div>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_buttons`}>
          <Button onClickHandler={validateBeforeSignup} message={'Registrarse'}/>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_secondary-options`}>
          <p className={`${COMPONENT_NAME}__main-content_secondary-options_message`}> 
          ¿Ya tienes cuenta? 
            <a onClick={changeRoute} className={`${COMPONENT_NAME}__main-content_secondary-options_message_link`}> Ingresa aquí </a> 
          </p>
        </div>
      </section>
      <style jsx> {SignUpSyles} </style>
    </div>
  );
};

export default SignUp;
