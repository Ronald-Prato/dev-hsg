import React, { useState, useEffect, useContext } from 'react';

import Input from '../../commons/FomInput';
import Cards from '../../commons/Cards';
import MaskInput from '../../commons/MaskInput';
import Summary from './Summary';
import Collaborators from './Collaborators';

import { ProjectWizardStyles } from './styles';

import formStructure from '../../../public/static/formStructure.json';

import WizardActions from './WizardActions';

import { ValidateEmail } from '../../../utils/formUtils';

import Context from '../../../globalState/context';

import { QuestionStruct } from '../../../types';

const COMPONENT_NAME = 'project-wizard';

let cachedAnswersInitialProps: string[] = [];

const ProjectWizard = () => {
  const { state, actions } = useContext(Context);
  const questions = formStructure.questions;
  const [componentStepNumber, setComponentStepNumber] = useState(0);
  const [currentValue, setCurrentValue] = useState('');
  const [cachedAnswers, setCachedAnswers] = useState(cachedAnswersInitialProps);
  const [finalValidation, setFinalValidation] = useState(true);
  const [hideFromChild, setHideFromChild] = useState(false);
  let stepComponent: any[] = [];

  //Este useEffect pone en currentValue la pregunta cacheada y actualiza el estado global
  useEffect(() => {
    cachedAnswers[componentStepNumber] &&
    setCurrentValue(cachedAnswers[componentStepNumber]);
  }, [componentStepNumber]);

  //Este useEffect trae todas las preguntas opcionales
  useEffect(() => {
    let aux: {[key:string]:string} = {};
    questions.forEach((el, i) => {
      if (el.type === 'cards') {
        if (el.optionalAnswer) {
          aux[el.key] = ''
        }
      }
      i === questions.length - 1 && 
      actions({
        type: 'setState',
        payload: {
          ...state,
          project_wizard: {
            ...state.project_wizard,
            optionalAnswers: aux
          } 
        }
      })
    })
  }, [])

  //Este useEffect trae todas las llaves de las preguntas de la estructura
  useEffect(() => {
    let aux: {[key:string]:string} = {};
    questions.forEach((el, i) => {
      aux[el.key] = '';
      i === questions.length - 1 && 
      actions({
        type: 'setState',
        payload: {
          ...state,
          project_wizard: {
            ...state.project_wizard,
            settings: aux
          } 
        }
      })
    })
  }, []);

  const pushComponent = (type: string, index: number) => {
    const relateComponent: {
      [key: string]: () => void 
    } = {
      "string": () => stepComponent.push(
        <Input type={'string'} value={currentValue} onChangeHandler={val => setCurrentValue(val)}/>
      ),
      "mask": () => stepComponent.push(
        <MaskInput 
          onChageHandler={(val) => setCurrentValue(val)}
          value={currentValue}
          maskChar={questions[index].maskChar as string} 
          mask={questions[index].mask as string} 
          type={questions[index].key}/>
      ),
      "email": () => stepComponent.push(
        <Input type={'email'} centered value={currentValue} onChangeHandler={val => setCurrentValue(val)}/>
      ),
      "number": () => stepComponent.push(
        <Input centered={questions[componentStepNumber].key==='residential_units'} type={'number'} value={currentValue} onChangeHandler={val => setCurrentValue(val)}/>
      ),
      "phone": () => stepComponent.push(
        <Input type={'number'} maxLength={10} value={currentValue} onChangeHandler={val => setCurrentValue(val)}/>
      ),
      "file": () => stepComponent.push(
        <h2> file </h2>
      ),
      "cards": () => stepComponent.push(
        <Cards 
          onChangeHandler={val => setCurrentValue(val)} 
          options={questions[index].options}
          multipleAnswers={questions[index].multipleAnswers}
          value={currentValue}
          questionKey={questions[index].key}
          optionalAnswer={questions[index].optionalAnswer}/>
      ),
      "collaborators": () => stepComponent.push(
        <Collaborators setHideFromChild={(state) => setHideFromChild(state)} goToSummary={(state) => setFinalValidation(state)} modules={questions[index].modules}/>
      ),
      "summary": () => stepComponent.push(
        <Summary hideActions={(state) => setHideFromChild(state)}/>
      ),
    }
    relateComponent[type]();
  };

  questions.forEach((question, index) => {
    pushComponent(question.type, index);
  });

  const addValueToAnswers = async (key: string) => {
    //Aquí comprobamos que si nos regresamos una pregunta atrás, no la vuelva a introducir al menos que la cambie
    if (!cachedAnswers[componentStepNumber]) {
      setCachedAnswers([...cachedAnswers, currentValue.toString().trim()]);

      
      await actions({
        type: 'setState',
        payload: {
          ...state,
          project_wizard: {
            ...state.project_wizard,
            settings: {
              ...state.project_wizard.settings,
              [questions[componentStepNumber].key]: currentValue.toString().trim()
            }
          }
        }
      })

    } else {
      cachedAnswers[componentStepNumber] = currentValue.toString().trim();
    }

    // Aquí reseteamos el valor vacío para la siguiente pregunta
    setCurrentValue(' ');
    setComponentStepNumber(componentStepNumber + 1);
  };

  const goToPrevQuestion = () => {
    componentStepNumber > 0 && setComponentStepNumber(componentStepNumber - 1);
  };


  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-content`}>
        <p className={`${COMPONENT_NAME}__main-content_visible-name`}> {questions[componentStepNumber].visibleName} </p>
        <div className={`${COMPONENT_NAME}__main-content_input-container`}>
          { stepComponent[componentStepNumber] }
        </div>

        <section className={`${COMPONENT_NAME}__main-content_wizard-actions`}>
          {
            !hideFromChild &&
            <WizardActions 
              isFirstQuestion={componentStepNumber === 0}
              isLastQuestion={componentStepNumber === questions.length -1}
              onClickNext={() => addValueToAnswers(questions[componentStepNumber].key)}
              onClickPrevious={goToPrevQuestion}
              isValid={
                questions[componentStepNumber].type !== 'email' && questions[componentStepNumber].type !== 'collaborators' ?
                  currentValue.trim().length > 0
                : questions[componentStepNumber].type === 'email' ?
                  ValidateEmail(currentValue)
                :
                  !finalValidation
              }
            />
          }
          {/* <button onClick={() => console.log(state.project_wizard)}> CHECK </button> */}
        </section>
      </section>

      <section className={`${COMPONENT_NAME}__side-icon`}>

      </section>

      <style jsx> {ProjectWizardStyles} </style>
    </div>
  );
};

export default ProjectWizard;
