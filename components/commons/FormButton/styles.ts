import css from 'styled-jsx/css';

export const FormButtonStyles = css`
  .form-button {
    min-width: 150px;
    max-width: 300px;
    width: 100%;
    height: 35px;
    outline: none;
    background: #32a852;
    border-radius: 20px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: linear 250ms;
    padding: 0 6px;
    box-sizing: border-box;
    
    &__message {
      color: white;
      font-weight: bolder;
      font-size: 14px;
      margin: 0;
    }
  }

  .disabled {
    background: #a3a3a3;
    cursor: auto;
  }
`;
