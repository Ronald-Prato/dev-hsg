import { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import { SideRegisterStyles } from './styles';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

import { ValidateNotEmptyFiels, ExceptionHandler, ValidatePassword, SideRegisterService } from '../../../utils/formUtils';
import { SignUpService } from '../../../utils/session';
import { CreateNewUserService } from '../../../utils/dbUtils';

import Context from '../../../globalState/context';
import Loading from '../../commons/Loading';


const COMPONENT_NAME = 'side-register';

const SideRegister = () => {
  const { state, actions } = useContext(Context);
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [localFields, setLocalFields] = useState({
    name: '', phone: '', pass: '', repeated_pass: ''
  });

  const validateBeforeSignup = () => {
    if (!ValidateNotEmptyFiels(localFields)) {
      ExceptionHandler('No pueden quedar campos vacíos');
      return;
    } else if (localFields.phone.trim().length !== 10) {
      ExceptionHandler('El número de celular es inválido');
      return;
    } else if (!ValidatePassword(localFields.pass, 6)) {
      ExceptionHandler('La contraseña debe ser de al menos 6 caracteres y tener el menos un número');
      return;
    } else if (localFields.pass !== localFields.repeated_pass) {
      ExceptionHandler('Las contraseñas no coinciden');
      return;
    }
    sendRequest();
  };

  const sendRequest = () => {
    setShowLoading(true);
    SideRegisterService(router.query.encrypt, localFields.name, localFields.phone)
      .then(res => {
        console.log("USER => ", res.data);
        SignUpService(res.data.email[0], localFields.pass)
          .then((user) => {
            let currentDate = new Date().toISOString();
            let request = {
              id_user: user.userSub,
              id_project: res.data.id_project,
              name: localFields.name,
              email: res.data.email[0],
              phone_number: localFields.phone,
              creation_date: currentDate,
              modification_date: currentDate,
              type_user: res.data.type_user,
              areas: res.data.areas[0],
              role: res.data.role[0],
              permissions: JSON.parse(res.data.permissions[0].replace(/'/g, '"'))
            };
            console.log("request => ", request);
            CreateNewUserService({
              ...request
            })
              .then(async () => {
                alert("Se ha enviado un código de verificación a " + res.data.email[0]);
                setShowLoading(false);
                await actions({
                  type: 'setState',
                  payload: {
                    ...state,
                    signup: {
                      email: res.data.email[0],
                      password: localFields.pass
                    },
                    sideEmail: res.data.email[0]
                  }
                })
                Router.push('/code-confirmation');
              })
              .catch(err => {
                setShowLoading(false);
                console.log(err);
                ExceptionHandler(ExceptionHandler(err.name, true) as string);
              })
          })
          .catch(err => {
            setShowLoading(false);
            console.log(err);
            ExceptionHandler('No se pudo crear el usuario, intente de nuevo más tarde 002');
          })
      })
      .catch(err => {
        setShowLoading(false);
        console.error(err);
        ExceptionHandler('No se pudo crear el usuario, intente de nuevo más tarde 001');
      })
  };

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <img className={`${COMPONENT_NAME}__main-content_logo`} src={'/static/images/hsg-logo.png'}/>

        <p className={`${COMPONENT_NAME}__main-content_title`}> Invitación a registro </p>

        <div className={`${COMPONENT_NAME}__main-content_inputs`}>
          <div className={`${COMPONENT_NAME}__main-content_inputs_name`}>
            <Input value={localFields.name} onChangeHandler={(value: string) => setLocalFields({...localFields, name: value})} type={'string'} title={'Nombre Completo'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_tlf`}>
            <Input value={localFields.phone} maxLength={10} onChangeHandler={(value: string) => setLocalFields({...localFields, phone: value.trim()})} type={'number'} title={'Número de celular'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_pass`}>
            <Input value={localFields.pass} onChangeHandler={(value: string) => setLocalFields({...localFields, pass: value.trim()})} type={'password'} title={'Contraseña'}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_pass-repeat`}>
            <Input value={localFields.repeated_pass} onChangeHandler={(value: string) => setLocalFields({...localFields, repeated_pass: value.trim()})} type={'password'} title={'Confirme Contraseña'}/>
          </div>
        </div>

        <div className={`${COMPONENT_NAME}__main-content_buttons`}>
          <Button onClickHandler={validateBeforeSignup} message={'Registrarse'}/>
        </div>
      </section>

      {
        showLoading &&
        <Loading message={'Creando el usuario'}/>
      }

      <style jsx> {SideRegisterStyles} </style>
    </div>
  );
};

export default SideRegister;
