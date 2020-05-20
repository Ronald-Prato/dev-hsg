import { useState, useEffect, useContext } from 'react';
import { CardsStyles } from './styles';

import Input from '../FomInput';

import { CardsT } from './index.d';

import Context from '../../../globalState/context';

const COMPONENT_NAME = 'cards';

let dynamicSelectionInitTypes: boolean[] = [];

const Cards = ({options, value, optionalAnswer, questionKey, multipleAnswers, onChangeHandler}: CardsT) => {
  const { state, actions } = useContext(Context);  
  const [dynamicSelection, setDynamicSelection] = useState(dynamicSelectionInitTypes);
  const [text, setText] = useState('');
  let optionalAnswerStruct = state.project_wizard.optionalAnswers;

  useEffect(() => {
    setText(state.project_wizard.optionalAnswers[questionKey as string]);
  }, [state.project_wizard.optionalAnswers])

  useEffect(() => {
    let aux: any[] = [];
    const optionValues = options?.map(x => x.value);
    const validIndex = optionValues?.indexOf(value);

    if (value.trim().length === 0) {
      options?.forEach((_, index) => {
        aux.push(false);
        index === options.length - 1 &&
        setDynamicSelection(aux);
      })
    } else if (value.trim().length > 0 && validIndex !== -1) {
      options?.forEach((_, index) => {
        index === validIndex ? aux.push(true) : aux.push(false);
        index === options.length - 1 &&
        setDynamicSelection(aux);
      })
    }
  }, [value]);


  const selectOptions = async (index: number) => {
    setText(' ');
    optionalAnswerStruct[questionKey as string] = '';
    actions({
      type: 'setState',
      payload: {
        ...state,
        project_wizard: {
          ...state.project_wizard,
          optionalAnswers: optionalAnswerStruct
        }
      }
    });

    if (!multipleAnswers) {
      changeValue(dynamicSelection[index] ? -1 : index);
      if (index !== dynamicSelection.length - 1) {
        setDynamicSelection(dynamicSelection.map((item, _index) => index === _index ? !item : false));
      }
    } else {
      setDynamicSelection(dynamicSelection.map((item, _index) => index === _index ? !item : item));
    }
  };

  const changeValue = (index: number) => {
    if (index !== -1) {
      if (options && options[index].value) {
        onChangeHandler(options[index].value);
      }
    } else {
      onChangeHandler('');
    }
  };

  const changeTextValue = async (val: string) => {
    onChangeHandler(val);
    setDynamicSelection(dynamicSelection.map(() => false))

    optionalAnswerStruct[questionKey as string] = val;

    await actions({
      type: 'setState',
      payload: {
        ...state,
        project_wizard: {
          ...state.project_wizard,
          optionalAnswers: optionalAnswerStruct
        }
      }
    });
  };

  return (
    <div className={COMPONENT_NAME}>
      <div className={`${COMPONENT_NAME}__cards-render`}>
        {
          options?.map((option, index) => 
            option.value !== 'none' &&
            <div onClick={() => selectOptions(index)} key={index} style={{background: dynamicSelection[index] ? '#32a852' : '#ffffff'}} className={`${COMPONENT_NAME}__cards-render_single-card`}>
              {
                option.icon &&
                <img src={option.icon} className={`${COMPONENT_NAME}__cards-render_single-card_icon`}/>
              }
              <p 
                className={`${COMPONENT_NAME}__cards-render_single-card_name`}
                style={{color: dynamicSelection[index] ? '#ffffff' : '#32a852' }}
              > 
                  {option.name} 
              </p>
            </div>
          )
        }
      </div>
      
      {
        optionalAnswer &&
        <div className={`${COMPONENT_NAME}__another-option-render`}>
          <p className={`${COMPONENT_NAME}__another-option-render_options`}> Otro:  </p>
          <Input
            type={'string'} value={text}
            onChangeHandler={val => changeTextValue(val)} 
          />
        </div>
      }

      {/* <button onClick={() => console.log(state.project_wizard.optionalAnswers)}> AAAAA </button> */}
      {/* <button onClick={() => console.log(optionalAnswerStruct[questionKey as string])}> AAAAA </button> */}

      <style jsx> {CardsStyles} </style>
    </div>
  );
};

export default Cards;
