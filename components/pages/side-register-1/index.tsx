import { useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { SideRegisterStyles } from './styles';

import Input from '../../commons/FomInput';
import Button from '../../commons/FormButton';

import { ValidateNotEmptyFiels, ExceptionHandler, ValidatePassword, SideRegisterService, NormalRegister } from '../../../utils/formUtils';
import { SignUpService } from '../../../utils/session';
import { CreateNormalUser } from '../../../utils/dbUtils';

import Context from '../../../globalState/context';
import Loading from '../../commons/Loading';


const COMPONENT_NAME = 'side-register';

let projectInfoInitialProps: {
  admin_type: string,
  creation_date: string,
  division: string,
  division_number: string,
  id_project: string,
  modification_date: string,
  name: string,
  phone_number: string,
  residential_unit_number: string,
  type_user: string
};

const SideRegister1 = () => {
  const { state, actions } = useContext(Context);
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [projectInfo, setProjectInfo] = useState(projectInfoInitialProps);
  const [showContent, setShowContent] = useState(false);
  const [localFields, setLocalFields] = useState({
    name: '', phone: '', pass: '', repeated_pass: '',
    division: '', unit: ''
  });

  useEffect(() => {
    getProjectInfo()
  }, []);

  const getProjectInfo = async () => {
    await NormalRegister(router.query.encrypt, '', '', '', '')
      .then(res => {
        setProjectInfo(res.data);
        console.log(res.data);
        setShowContent(true);
      })
      .catch(err => console.error(err))
  };

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
    NormalRegister(router.query.encrypt, localFields.name, localFields.phone, localFields.division, localFields.unit)
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
              phone_number: localFields.phone.toString(),
              creation_date: currentDate,
              modification_date: currentDate,
              type_user: res.data.type_user,
              division_value: localFields.division,
              residential_unit_number: localFields.unit
            };
            console.log("request => ", request);
            CreateNormalUser({
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
        console.log(err);
        ExceptionHandler('No se pudo crear el usuario, intente de nuevo más tarde 001');
      })
  };

  const adminTypeGet: {[key: string]: string} = {
    "0": "casa",
    "1": "apartamento",
    "2": "local comercial"
  }

  return (
    showContent &&
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
          <div className={`${COMPONENT_NAME}__main-content_inputs_division`}>
            <Input value={localFields.division} onChangeHandler={(value: string) => setLocalFields({...localFields, division: value.trim()})} type={'string'} title={`Número de ${projectInfo.division}`}/>
          </div>
          <div className={`${COMPONENT_NAME}__main-content_inputs_unit`}>
            <Input value={localFields.unit} onChangeHandler={(value: string) => setLocalFields({...localFields, unit: value.trim()})} type={'string'} title={`Número de ${adminTypeGet[projectInfo.admin_type]}`}/>
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

export default SideRegister1;
