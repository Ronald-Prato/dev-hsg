import css from 'styled-jsx/css';

export const MaskInputStyles = css.global`
  .mask-input {
    display: flex;
    justify-content: center;

    &__input-mask {
      width: 60%;
      height: 35px;
      border-radius: 50%;
      outline: none;
      font-size: 15px;
      border: 1px solid #32a852;
      box-sizing: border-box; 
      text-align: center;
      background: white;
      color: #606060;
      box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
  }
`;
