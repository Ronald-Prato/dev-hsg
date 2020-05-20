import { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { CodeConfirmationStyles } from './styles';

import Context from '../../../globalState/context';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

import { ExceptionHandler } from '../../../utils/formUtils';
import Router from 'next/router';

const COMPONENT_NAME = 'code-confirmation';

const CodeConfirmation = () => {
  const {  state } = useContext(Context);
  const [code, setCode] = useState('');

  const confirmCode = () => {
    Auth.confirmSignUp(state.signup.email, code)
      .then(() => {
        alert("Usuario validado exitosamente");
        Router.push('/signin');
      })
      .catch(err => {
        ExceptionHandler(ExceptionHandler(err.name, true) as string);
        console.log(err);
      })
  }

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <img className={`${COMPONENT_NAME}__main-content_logo`} src={'/static/images/hsg-logo.png'}/>

        <p className={`${COMPONENT_NAME}__main-content_title`}> Ingrese el código de verificación </p>
        
        <div className={`${COMPONENT_NAME}__main-content_input`}>
          <Input value={code} type={'string'} centered maxLength={6} onChangeHandler={(value) => setCode(value.trim())}/>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_button`}>
          <Button onClickHandler={confirmCode} disabled={code.length < 6} message={'Confirmar'}/>
        </div>
      </section>
      <style jsx> { CodeConfirmationStyles} </style>
    </div>
  );
};

export default CodeConfirmation;
