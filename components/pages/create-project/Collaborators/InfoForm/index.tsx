import { useState, useEffect, useContext } from 'react';
import { InfoFormStyles } from './styles';

import { InfoFormT } from '../index.d'; 

import Button from '../../../../commons/FormButton';

import Input from '../../../../commons/FomInput';
import { ExceptionHandler, ValidateEmail } from '../../../../../utils/formUtils';

import Context from '../../../../../globalState/context';

const COMPONENT_NAME = 'info-form';

let dynamicStateInitialProps: boolean[] = [];

const InfoForm = ({renderOption, activeButton, modules, goBack}: InfoFormT) => {
  const { state, actions } = useContext(Context);
  const [dynamicState, setDynamicState] = useState(dynamicStateInitialProps);
  const [collaborator, setCollaborator] = useState({
    receiver_address: '', role: '', area: '', permissions: {}
  });
  let currentCollaborators = state.project_wizard.collaborators;

  useEffect(() => {
    let aux: any[] = [];
    modules?.length &&
    modules.forEach((_, index) => {
      aux.push(false);
      index === modules.length - 1 && setDynamicState(aux);
    })
  }, [])

  const validateForm = () => {
    if (Object.values(collaborator).map(x => typeof x === 'string' && x.trim()).includes('')) {
      ExceptionHandler('No pueden haber campos vacíos');
      return;
    } else if (!ValidateEmail(collaborator.receiver_address)) {
      ExceptionHandler('El correo electrónico ingresado es inválido');
      return;
    } else if (!dynamicState.includes(true)) {
      ExceptionHandler('Debe seleccionar al menos un módulo de acceso');
      return;
    }
    addCollaborator();
  };

  const addCollaborator = async () => {
    currentCollaborators.push(collaborator);

    await actions({
      type: 'setState',
      payload: {
        ...state, 
        project_wizard: {
          ...state.project_wizard,
          collaborators: currentCollaborators
        }
      }
    })
    activeButton();
    goBack();
  }

  const checkPermission = (index: number) => {
    let newState = dynamicState.map((_, i) => i === index ? !_ : _);
    setDynamicState(newState);
    generateAccessStruct(newState);
  };

  const generateAccessStruct = (newState: boolean[]) => {
    let validIndexes: number[] = [];
    let permissionsObj: { [key: string]: string } = {};
    
    if (newState.includes(true)) {
      newState.forEach((_, i) => _ ? validIndexes.push(i) : null);
      if (modules) {
        validIndexes.forEach((_, i) => {
          permissionsObj[ modules[_] ] = '1111';
          if (i === validIndexes.length - 1)
            setCollaborator({...collaborator, permissions: permissionsObj})
        })
      }
    } else {
      setCollaborator({...collaborator, permissions: {}})
    }
  };


  return (
    <div className={COMPONENT_NAME}>

      {
        renderOption === "Colaborador" && 
        <div className={`${COMPONENT_NAME}__collaborator`}>
          <div className={`${COMPONENT_NAME}__collaborator_options`}>
            <p> {renderOption} </p>
            <img onClick={goBack} src={'/static/svg/return.svg'}/>
          </div>
          <div className={`${COMPONENT_NAME}__collaborator_top`}>
            <Input value={collaborator.receiver_address} centered title={'Correo electrónico'} onChangeHandler={(val) => setCollaborator({...collaborator, receiver_address: val})} type={'string'}/>
          </div>
          <div className={`${COMPONENT_NAME}__collaborator_mid`}>
            <Input value={collaborator.area} title={'Area'} onChangeHandler={(val) => setCollaborator({...collaborator, area:val})} type={'string'}/>
            <Input value={collaborator.role} title={'Cargo'} onChangeHandler={(val) => setCollaborator({...collaborator, role:val})} type={'string'}/>
          </div>
          <div className={`${COMPONENT_NAME}__collaborator_bot`}>
            <p className={`${COMPONENT_NAME}__collaborator_bot_title`}> Acceso a módulos </p>
            <div className={`${COMPONENT_NAME}__collaborator_bot_permissions-render`}>
              {
                modules?.map((module, index) => 
                  <div 
                    key={index}
                    onClick={() => checkPermission(index)} 
                    style={{background: dynamicState[index] ? '#32a852' : 'white'}} 
                    className={`${COMPONENT_NAME}__collaborator_bot_permissions-render_permission`}
                  >
                    <p 
                      className={`${COMPONENT_NAME}__collaborator_bot_permissions-render_permission_text`}
                      style={{color: dynamicState[index] ? 'white' : '#32a852'}}
                      > {module} </p>
                  </div>
                )
              }
            </div>
          </div>

          <div className={`${COMPONENT_NAME}__collaborator_add-button`}>
            <Button onClickHandler={validateForm} message={'Agregar'}/>
          </div>
          {/* <button onClick={() => console.log(collaborator)}> Checlssss </button> */}
        </div>
      }
      
      <style jsx> {InfoFormStyles} </style>
    </div>
  );
};

export default InfoForm;
