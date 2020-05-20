import { useState } from 'react';
import {ForgotPasswordStyles } from './styles';

import Router from 'next/router';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

import { ValidateEmail, ExceptionHandler, ValidatePassword } from '../../../utils/formUtils';
import { SendPasswordRecoveryEmail, RecoverPassword } from '../../../utils/session';

const COMPONENT_NAME = 'forgot-password';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState({first: '', repeated: ''});
  const [code, setCode] = useState('');
  const [validStep, setValidStep] = useState(false);

  const changeRoute = () => {
    Router.push('/signin');
  };

  const validateBeforeSendRequest = (option: string) => {
    if (option === 'email') {
      if (!ValidateEmail(email)) {
        ExceptionHandler('El correo electrónico es inválido');
        return;
      }
      SendPasswordRecoveryEmail(email)
        .then(() => {
          alert("Se ha enviado un código de confirmación a " + email);
          setValidStep(true);
        })
        .catch(err => ExceptionHandler(ExceptionHandler(err.name, true) as string))
    } else if (option === 'pass') {
      if (!ValidatePassword(pass.first, 6)) {
        ExceptionHandler('La contraseña debe ser de al menos 6 caracteres y tener el menos un número');
        return;
      } else if (pass.first !== pass.repeated) {
        ExceptionHandler('Las contraseñas no coinciden');
        return;
      }
      RecoverPassword(email, code, pass.first)
        .then(() => {
          alert("Contraseña cambiada exitosamente");
          Router.push('/signin');
        })
        .catch(err => console.log(err))
    }
  };


  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <img className={`${COMPONENT_NAME}__main-content_logo`} src={'/static/images/hsg-logo.png'}/>

        <p className={`${COMPONENT_NAME}__main-content_title`}> Recuperación de contraseña </p>
        <div className={`${COMPONENT_NAME}__main-content_inputs-container`}>
          {
            !validStep ?
              <div className={`${COMPONENT_NAME}__main-content_inputs-container_input`}>
                <Input type={'string'} onChangeHandler={(val) => setEmail(val)} title={'Correo electrónico'}/>
              </div>
            :
              <div className={`${COMPONENT_NAME}__main-content_inputs-container_input`}>
                <div className={`${COMPONENT_NAME}__main-content_inputs-container_input_code`}>
                  <Input value={code} maxLength={6} centered type={'string'} onChangeHandler={(val) => setCode(val)} title={'Código de verificación'}/>
                </div>
                <Input value={pass.first} type={'password'} onChangeHandler={(val) => setPass({...pass, first: val})} title={'Nueva Contraseña'}/>
                <Input value={pass.repeated} type={'password'} onChangeHandler={(val) => setPass({...pass, repeated: val})} title={'Repita Contraseña'}/>
              </div>
          }
        </div>
        <div className={`${COMPONENT_NAME}__main-content_button`}>
          <Button 
            onClickHandler={() => {
              !validStep ? validateBeforeSendRequest('email') : validateBeforeSendRequest('pass')
            }}
            disabled={
              validStep && (code.length < 6 || pass.first.length < 2 || pass.repeated.length < 2)
            }
            message={
              !validStep ? 'Recuperar contraseña' : 'Establecer'
            } />
        </div>
        
        <div className={`${COMPONENT_NAME}__main-content_secondary-options`}>
          <p className={`${COMPONENT_NAME}__main-content_secondary-options_message`}> 
          ¿Ya tienes cuenta? 
            <a onClick={changeRoute} className={`${COMPONENT_NAME}__main-content_secondary-options_message_link`}> Ingresa aquí </a> 
          </p>
        </div>
      </section>
      <style jsx> {ForgotPasswordStyles} </style>
    </div>
  );
};

export default ForgotPassword;
