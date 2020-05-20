import { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

import { SignInStyles } from './styles';

import { SignInService } from '../../../utils/session';
import { ValidateEmail, ExceptionHandler } from '../../../utils/formUtils';

import Context from '../../../globalState/context';

const COMPONENT_NAME = 'signin';

const SignIn = () => {
  const { state, actions } = useContext(Context);
  const [fields, setFields] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    setFields({...fields, email: state.sideEmail ? state.sideEmail : ''});
  }, []);

  const validateBeforeSignIn = () => {
    if (!fields.email.length || !fields.password.length) {
      ExceptionHandler('No pueden quedar campos vacíos');
      return;
    } else if (!ValidateEmail(fields.email.trim())) {
      ExceptionHandler('El correo ingresado es inválido');
      return;
    }
    signIn();
  }

  const signIn = () => {
    SignInService(fields.email.trim(), fields.password)
      .then((res) => {
        setUserInternalData(res.attributes.sub);
        changeRoute('home');
      })
      .catch(err => {
        console.log(err);
        ExceptionHandler(ExceptionHandler(err.name, true) as string);
      })
  }

  const setUserInternalData = async (userId: string) => {
    await actions({ 
      type: 'setState',
      payload: {
        user_internal_data: {
          id: userId,
          email: fields.email
        }
      }
    })
  }

  const changeRoute = (route: string) => {
    Router.push(`/${route}`);
  }

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <img className={`${COMPONENT_NAME}__main-content_logo`} src={'/static/images/hsg-logo.png'}/>

        <p className={`${COMPONENT_NAME}__main-content_title`}> Inicio de sesión </p>
        <div className={`${COMPONENT_NAME}__main-content_inputs`}>
          <Input value={fields.email} onChangeHandler={(value) => setFields({...fields, email: value})} type={'string'} title={'Correo Electrónico'}/>
          <Input onChangeHandler={(value) => setFields({...fields, password: value})} type={'password'} title={'Contraseña'}/>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_buttons`}>
          <Button onClickHandler={validateBeforeSignIn} message={'Ingresar'}/>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_secondary-options`}>
          <a onClick={() => changeRoute('forgot-password')} className={`${COMPONENT_NAME}__main-content_secondary-options_message_link`}> 
            ¿Olvidaste tu contraseña? 
          </a> 

          <p className={`${COMPONENT_NAME}__main-content_secondary-options_message`}> 
          ¿No tienes cuenta? 
            <a onClick={() => changeRoute('signup')} className={`${COMPONENT_NAME}__main-content_secondary-options_message_link`}> Regístrate aquí </a> 
          </p>
        </div>
      </section>
      <style jsx> {SignInStyles} </style>
    </div>
  );
};

export default SignIn;
