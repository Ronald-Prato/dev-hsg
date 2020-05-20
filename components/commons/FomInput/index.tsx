import { useState } from 'react';
import { FormInputT } from "../../../types";
import { InputStyles } from './styles';

const COMPONENT_NAME = 'input';

const FormInput = ({type, title, centered, maxLength, value, onChangeHandler}: FormInputT) => {
  const [localValue, setLocalValue] = useState('')

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (maxLength) {
      if (value.length <= maxLength) {
        onChangeHandler(value);
        setLocalValue(value);
      }
    } else {
      onChangeHandler(value);
      setLocalValue(value);
    }
  }

  return (
    <div className={COMPONENT_NAME}>
      {
        title && 
        <p className={`${COMPONENT_NAME}__title`}> {title} </p>
      }
      {
        !centered ?
          <input onChange={changeValue} value={value || localValue} className={`${COMPONENT_NAME}__input`} type={type}/>
        :
          <input onChange={changeValue} value={value || localValue} className={`${COMPONENT_NAME}__input-centered`} type={type}/>
      }
      

      <style jsx> {InputStyles} </style>
    </div>
  );
};

export default FormInput;
