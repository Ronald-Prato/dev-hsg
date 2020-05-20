import { WizardActionsStyle } from './styles';

import { WizardActionsT } from './index.d';

const COMPONENT_NAME = 'wizard-actions';

const WizardActions = ({onClickNext, onClickPrevious, isValid, isFirstQuestion, isLastQuestion}: WizardActionsT) => {

  return (
    <div className={COMPONENT_NAME}>
      {
        !isFirstQuestion &&
        <div onClick={onClickPrevious} className={`${COMPONENT_NAME}__button-secondary`}>
          <p className={`${COMPONENT_NAME}__button-secondary_text`}> Anterior </p>
        </div>
      }

      <div onClick={() => isValid && onClickNext()} className={`${COMPONENT_NAME}__button-primary ${!isValid ? 'disabled' : ''}`}>
        <p className={`${COMPONENT_NAME}__button-primary_text`}>
          { !isLastQuestion && 'Siguiente' }
        </p>
      </div>
      <style jsx> {WizardActionsStyle} </style>
    </div>
  );
};

export default WizardActions;
