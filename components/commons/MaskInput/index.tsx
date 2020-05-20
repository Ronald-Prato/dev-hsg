import { useState } from 'react';
import InputMask from 'react-input-mask';

import { MaskInputT } from './index.d';

import { MaskInputStyles } from './styles';

const COMPONENT_NAME = 'mask-input';

const MaskInput = ({mask, maskChar, onChageHandler, type, value}: MaskInputT) => {
  const [localValue, setLocalValue] = useState('');
  const checkifValid = (val: string) => {
    setLocalValue(val);
    const typeValidator: {[key: string]: () => void} = {
      "nit": () => {
        (/^([0-9]){0,9}-([0-9]){1}/).test(val) ?
        onChageHandler(val) : onChageHandler('');
      },
      "phone_number": () => {
        (/\([0-9]{3}\) [0-9]{7}/).test(val) ?
        onChageHandler(val) : onChageHandler('');
      }
    }
    typeValidator[type]();
  }

  return (
    <div className={COMPONENT_NAME}>
      <InputMask value={value.trim() || localValue} onChange={e => checkifValid(e.target.value)} maskChar={maskChar} className={`${COMPONENT_NAME}__input-mask`} mask={mask}/>
      <style jsx> {MaskInputStyles} </style>
    </div>
  );
};

export default MaskInput;
