const COMPONENT_NAME = 'form-button';
import { FormButtonStyles } from './styles';

import { FormButtonT } from '../../../types';

const FormButton = ({message, disabled, onClickHandler}: FormButtonT) => {

  return (
    <div onClick={() => !disabled && onClickHandler()} className={`${COMPONENT_NAME} ${disabled ? 'disabled' : ''}`}>
      <p className={`${COMPONENT_NAME}__message`}> {message} </p>

      <style jsx> {FormButtonStyles} </style>
    </div>
  );
};

export default FormButton;
