import { useState, useContext, useEffect } from 'react';
import { FormInputT } from "../../../types";
import { InputStyles } from './styles';
import Context from '../../../globalState/context';

const COMPONENT_NAME = 'input';

const FormInput = ({type, title, centered, maxLength, value, onChangeHandler, ownerCheck}: FormInputT) => {
  const { state } = useContext(Context)
  const [localValue, setLocalValue] = useState('');
  const [owner, setOwner] = useState(false);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>, other?: string) => {
    let value = event.target.value;
    if (value !== 'on') {
      if (maxLength) {
        if (value.length <= maxLength) {
          onChangeHandler(value);
          setLocalValue(value);
        }
      } else {
        onChangeHandler(value);
        setLocalValue(value);
      }
    } else if (other) {
      if (maxLength) {
        if (other.length <= maxLength) {
          onChangeHandler(other);
          setLocalValue(other);
        }
      } else {
        onChangeHandler(other);
        setLocalValue(other);
      }
    }
  }

  useEffect(() => {
    if (value) {
      setOwner(true);
    }
  }, []);

  const changeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!owner) {
      changeValue(event, state.user_internal_data.email);
      setOwner(!owner);
    } else {
      setOwner(!owner);
      changeValue(event, ' ');
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

      {
        ownerCheck &&
        <div className={`${COMPONENT_NAME}__owner-check`}>
          <p className={`${COMPONENT_NAME}__owner-check_title`}> Yo soy la persona a cargo </p>
          <input checked={owner} onChange={(e) => changeState(e)} type={'checkbox'}/>
        </div>
      }
      

      <style jsx> {InputStyles} </style>
    </div>
  );
};

export default FormInput;
