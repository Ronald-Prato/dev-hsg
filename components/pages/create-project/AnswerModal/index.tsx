import { AnswerModalStyles } from './styles';

import { AnswerModalT } from './index.d';

const COMPONENT_NAME = 'answer-modal';

const AnswerModal = ({children, answerTitle, closeSelf, disableButton}: AnswerModalT) => {

  return (
    <div className={COMPONENT_NAME}>
      <div className={`${COMPONENT_NAME}__main-content`}>
        <p className={`${COMPONENT_NAME}__main-content_title`}> {answerTitle} </p>
        { children }

        <div onClick={() => {!disableButton && closeSelf()}} className={`${COMPONENT_NAME}__main-content_save-button ${disableButton ? 'disabled' : ''}`}>
          <p className={`${COMPONENT_NAME}__main-content_save-button_text`}> 
            Guardar 
          </p>
        </div>
      </div>

      <style jsx> {AnswerModalStyles} </style>
    </div>
  );
};

export default AnswerModal;
