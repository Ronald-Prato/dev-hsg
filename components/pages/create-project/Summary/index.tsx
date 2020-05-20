import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';

import { SummaryT } from './index.d';

import { SummaryStyles } from './styles';

import formStructure from '../../../../public/static/formStructure.json';

import Cards from '../../../commons/Cards';
import AnswerModal from '../AnswerModal';
import Input from '../../../commons/FomInput';
import MaskInput from '../../../commons/MaskInput';
import Collaborators from '../Collaborators';
import Loading from '../../../commons/Loading';

import Context from '../../../../globalState/context';

import { CreateNewProjectService, AddCollaboratorsService } from '../../../../utils/dbUtils';
import { ExceptionHandler } from '../../../../utils/formUtils';

const COMPONENT_NAME = 'summary';

let indexesInitialProps: {[key: string]: number} = {};

const Summary = ({hideActions}: SummaryT) => {
  const { state } = useContext(Context);
  const questions = formStructure.questions;
  const [localAnswers, setLocalAnswers] = useState(state.project_wizard.settings);
  const [showModal, setShowModal] = useState(false);
  const [indexes, setIndexes] = useState(indexesInitialProps);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  let stepComponent: any[] = [];


  const bringName: {[key: string]: string} = {
    "business_name": "Nombre del proyecto",
    "nit": "NIT del proyecto",
    "address": "Dirección del proyectoº",
    "phone_number": "Número de teléfono del proyecto",
    "admin_type": "Tipo de proyecto",
    "residential_units": "Divisiones residenciales",
    "in_charge": "Correo de la persona a cargo",
    "collaborators": "Colaboradores del proyecto",
    "email": "Correo del conjunto",
    "division": "Divisones del proyecto",
    "country": "País del proyecto",
    "city": "País del proyecto"
  };
  

  const [pstate, setPstate] = useState('');

  useEffect(() => {
    let aux: { [key: string]: number } = {};
    questions.forEach((_, i) => {
      aux[_.key] = i;
      i === questions.length - 1 && setIndexes(aux);
    });
  }, []);


  useEffect(() => {
    setLocalAnswers(state.project_wizard.settings);
  }, []);

  useEffect(() => {
    hideActions(true);
  }, [state.project_wizard.collaborators]);

  const pushComponent = (type: string, index: number) => {
    let specificKey = questions[index].key;
    const relateComponent: {
      [key: string]: () => void 
    } = {
      "string": () => stepComponent.push(
        <Input 
          type={'string'} 
          value={localAnswers[specificKey]}
          onChangeHandler={val => setLocalAnswers({...localAnswers, [specificKey]: val})}/>
      ),
      "mask": () => stepComponent.push(
        <MaskInput 
          value={localAnswers[specificKey] as string || ''}
          onChageHandler={(val) => setLocalAnswers({...localAnswers, [specificKey]: val})}
          maskChar={questions[index].maskChar as string} 
          mask={questions[index].mask as string} 
          type={questions[index].key}/>
      ),
      "email": () => stepComponent.push(
        <Input 
          type={'email'} 
          centered 
          value={localAnswers[specificKey]}
          onChangeHandler={val => setLocalAnswers({...localAnswers, [specificKey]: val})}/>
      ),
      "number": () => stepComponent.push(
        <Input 
          centered={specificKey ==='residential_units'} 
          type={'number'} 
          value={localAnswers[specificKey]}
          onChangeHandler={val => setLocalAnswers({...localAnswers, [specificKey]: val})}/>
      ),
      "phone": () => stepComponent.push(
        <Input 
          type={'number'} 
          maxLength={10} 
          value={localAnswers[specificKey]}
          onChangeHandler={val => setLocalAnswers({...localAnswers, [specificKey]: val})}/>
      ),
      "file": () => stepComponent.push(
        <h2> file </h2>
      ),
      "cards": () => stepComponent.push(
        <Cards 
          value={localAnswers[specificKey] as string}
          onChangeHandler={val => setLocalAnswers({...localAnswers, [specificKey]: val})} 
          options={questions[index].options}
          multipleAnswers={questions[index].multipleAnswers}
          questionKey={questions[index].key}
          optionalAnswer={questions[index].optionalAnswer}/>
      ),
      "collaborators": () => stepComponent.push(
        <Collaborators 
          setHideFromChild={(state) => hideActions(state)} 
          goToSummary={() => {}}
          fromModal
          modules={questions[index].modules}/>
      ),
      "summary": () => stepComponent.push(
        <Summary hideActions={(state) => hideActions(state)}/>
      ),
    }
    relateComponent[type]();
  };

  questions.forEach((question, index) => {
    pushComponent(question.type, index);
  });

  const createProject = () => {
    //Añadimos al responsable como colaborador 
    let collaborators = state.project_wizard.collaborators;
    collaborators.push({
      receiver_address: state.project_wizard.settings.in_charge, 
      role: '', area: '', permissions: {}
    });
      

    setLoading(true);
    let currentDate = new Date().toISOString();
    let answers = localAnswers;
    let currentNit = localAnswers.nit;
    answers['id_user'] = state.user_internal_data.id;
    answers['creation_date'] = currentDate;
    answers['modification_date'] = currentDate;
    answers['url_logo'] = '';
    answers['nit'] = parseInt(currentNit.split('-')[0]);
    answers['verification_nit'] = parseInt(currentNit.split('-')[1]);
    answers['phone_number'] = parseInt(answers.phone_number.toString().replace(/ /g, '').split('(')[1].replace(')', ''));
    answers['residential_units'] = parseInt(answers.residential_units as string);
    answers['city'] = 'Bogota' //answers.city.charAt(0).toUpperCase() + answers.city.slice(1);
    answers['country'] = 'Colombia' //answers.country.charAt(0).toUpperCase() + answers.country.slice(1);
    delete answers['collaborators'];
    delete answers['summary'];
    delete answers['collaborators'];
    delete answers['collaborators'];

    console.log(answers);

    CreateNewProjectService({
      ...answers
    })
      .then(res => {
        if (res.data.includes('Error')) {
          setLoading(false);
          ExceptionHandler("Hubo un error creando el proyecto. Intente de nuevo más tarde");
          console.log(res.data);
        } else {
          sendCollaboratorsRequest(res.data, collaborators)
        }
      })
  };
  
  const sendCollaboratorsRequest = (id_project: string, collaborators: any) => {
    let currentDate = new Date().toISOString();

    collaborators.forEach((x:any, i:number) => {
      x['type_user'] = i === collaborators.length - 1 ? 'delegado' : 'colaborador';
      x['creation_date'] = currentDate;
      x['modification_date'] = currentDate;
      x['id_project'] = id_project;
      x['division'] = state.project_wizard.settings.division;
      x['admin_type'] = state.project_wizard.settings.admin_type;
      x['invitations'] = 1;

      i === collaborators.length - 1 &&
      AddCollaboratorsService({usersArray: collaborators})
        .then(() => {
          setLoading(false);
          alert("Proyecto creado existosamente");
          Router.push('/home');
        })
        .catch(err => {
          setLoading(false);
          ExceptionHandler("Hubo un error creando el proyecto. Intente de nuevo más tarde");
          console.log(err);
        });
    });
  };

  const openModal = (answerKey: string) => {
    setCurrentIndex(indexes[answerKey]);
    setShowModal(true);
  }

  return (
    <div className={COMPONENT_NAME}>

      <div className={`${COMPONENT_NAME}__answers-render`}>
        {
          Object.keys(localAnswers).map((answerKey, index) => 
            answerKey !== 'id_user' && answerKey !== 'creation_date' && answerKey !== 'url_logo' && 
            answerKey !== 'modification_date' && answerKey !== 'collaborators' && answerKey !== 'verification_nit' &&
            <div className={`${COMPONENT_NAME}__answers-render_single-answer`} key={index}>
              <p className={`${COMPONENT_NAME}__answers-render_single-answer_title`}> 
                { bringName[answerKey] }
              </p>

              <div className={`${COMPONENT_NAME}__answers-render_single-answer_preview`}>
                <p className={`${COMPONENT_NAME}__answers-render_single-answer_preview_text`}> { localAnswers[answerKey] } </p>
                <img onClick={() => openModal(answerKey)} src={'/static/svg/edit.svg'} className={`${COMPONENT_NAME}__answers-render_single-answer_preview_edit-icon`}/> 
              </div>

            </div>
          )
        }
        <div className={`${COMPONENT_NAME}__answers-render_single-answer`}>
          <p className={`${COMPONENT_NAME}__answers-render_single-answer_title`}> 
            { bringName['collaborators'] }
          </p>

          <div className={`${COMPONENT_NAME}__answers-render_single-answer_preview`}>
            <p className={`${COMPONENT_NAME}__answers-render_single-answer_preview_text`}>
              { state.project_wizard.collaborators.length || 0 }
            </p>
            <img onClick={() => openModal('collaborators')} src={'/static/svg/edit.svg'} className={`${COMPONENT_NAME}__answers-render_single-answer_preview_edit-icon`}/> 
          </div>

        </div>
      </div>

      {
        showModal &&
        <AnswerModal 
          disableButton={questions[currentIndex].key === 'collaborators' && !state.project_wizard.collaborators.length}
          closeSelf={() => setShowModal(false)} 
          answerTitle={questions[currentIndex].visibleName}
        >
          { stepComponent[currentIndex] }
        </AnswerModal>
      }

      {
        !showModal &&
        <div onClick={() => createProject()} className={`${COMPONENT_NAME}__create-button`}>
          <p className={`${COMPONENT_NAME}__create-button_text`}> Crear Proyecto </p>
        </div>
      }


      {
        loading &&
        <Loading message={'Creando proyecto'}/>
      }

      {/* <button style={{padding: '20px', position: 'absolute'}} onCliwck={() => console.log(pstate)}> Check Data </button> */}
      <style jsx> {SummaryStyles} </style>
    </div>
  );
};

export default Summary;
