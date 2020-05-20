import css from 'styled-jsx/css';

export const InputStyles = css`
  .input {
    width: 100%;
    &__title {
      margin: 0 0 5px 5px;
      font-size: 12px;
      width: 100%;
      color: rgba(0, 0, 0, .6);
    }
    
    &__input {
      outline: none;
      width: 100%;
      height: 35px;
      font-size: 15px;
      box-sizing: border-box;
      color: rgba(0, 0, 0, .5);
      padding: 0 20px;
      border-radius: 20px;
      border: .5px solid rgba(0, 0, 0, .2);
      margin-bottom: 5%;
    }

    &__input-centered {
      outline: none;
      height: 35px;
      width: 100%;
      box-sizing: border-box;
      font-size: 15px;
      color: rgba(0, 0, 0, .5);
      border-radius: 20px;
      border: .5px solid rgba(0, 0, 0, .2);
      margin-bottom: 5%;
      text-align: center;
    }
  }
`;
