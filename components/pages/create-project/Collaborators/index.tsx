import { useState, useContext, useEffect } from 'react';

import { PeopleStyles } from './styles';

import { CollaboratorsT } from './index.d';

import InfoForm from './InfoForm';

import Context from '../../../../globalState/context';

const COMPONENT_NAME = 'collaborators';


const Collaborators = ({modules, goToSummary, setHideFromChild, fromModal}: CollaboratorsT) => {
  const { state, actions } = useContext(Context);
  const [creationStep, setCreationStep] = useState(0);

  useEffect(() => {
    state.project_wizard.collaborators.length ?
    goToSummary(false) : goToSummary(true);
  }, [state.project_wizard.collaborators]);

  const deleteCollaborator = (index: number) => {
    actions({
      type: 'setState',
      payload: {
        ...state, 
        project_wizard: {
          ...state.project_wizard,
          collaborators: state.project_wizard.collaborators.filter((_:any, i:number) => i !== index)
        }
      }
    })
  };

  return (
    <div className={COMPONENT_NAME} style={{marginTop: !fromModal ? '10%' : '0'}}>
      {
        creationStep === 0 &&
        <section onClick={() => {setCreationStep(1); setHideFromChild(true)}} className={`${COMPONENT_NAME}__add-new-section`}>
          <img src={'/static/svg/add.svg'} className={`${COMPONENT_NAME}__add-new-section_icon`}/>
          <p className={`${COMPONENT_NAME}__add-new-section_message`}>
            {state.project_wizard.collaborators ? 'Añadir colaborador' : 'Añadir otro colaborador' }
          </p>
        </section>
      }

      {/* Datos del colaborador */}
      {
        creationStep === 1 &&
        <InfoForm 
          activeButton={() => {
            !fromModal && goToSummary(false);
            setHideFromChild(false)
          }} 
          goBack={() => setCreationStep(0)} modules={modules} 
          renderOption={'Colaborador' /*singlePerson.type_user*/}/>
      }

      {/* Lista de colaboradores añadidos */}
      {
        creationStep !== 1 && state.project_wizard.collaborators.length > 0 &&
        <div className={`${COMPONENT_NAME}__collaborators-list`}>
          {
            state.project_wizard.collaborators.map((collaborator: any, index: number) => 
              <div key={index} className={`${COMPONENT_NAME}__collaborators-list_single-collaborator`}>
                <p className={`${COMPONENT_NAME}__collaborators-list_single-collaborator_email`}> { collaborator.receiver_address } </p>
                <img onClick={() => deleteCollaborator(index)} className={`${COMPONENT_NAME}__collaborators-list_single-collaborator_delete-icon`} src={'/static/svg/delete.svg'}/>
              </div>
            )
          }
        </div>
      }
      
      <style jsx> {PeopleStyles} </style>
    </div>
  );
};

export default Collaborators;
