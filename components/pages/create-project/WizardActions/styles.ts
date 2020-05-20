import css from 'styled-jsx/css';

export const WizardActionsStyle = css`
  .wizard-actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    
    &__button-primary {
      width: 120px;
      height: 50px;
      border-radius: 14px;
      background: #32a852;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      transition: linear 250ms;

      &_text {
        color: white;
        margin: 0;
      }
    }

    &__button-secondary {
      width: 120px;
      height: 50px;
      border-radius: 14px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid #32a852;

      &_text {
        color: #32a852;
        margin: 0;
      }
    }
  }
  .disabled {
    background: #c4c4c4;
    cursor: not-allowed;
  }
`;
