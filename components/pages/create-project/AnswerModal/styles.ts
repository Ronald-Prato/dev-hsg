import css from 'styled-jsx/css';

export const AnswerModalStyles = css`
  @keyframes zoom-in {
    0% { transform: scale(.1) }
    70% { transform: scale(1.1) }
    100% { transform: scale(1) }
  } 
  .answer-modal {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;


    

    &__main-content {
      padding: 5%;
      box-sizing: border-box;
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 16px;
      box-shadow: 0 1px 20px rgba(0, 0, 0, .4);
      animation: zoom-in 250ms;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;

      &_title {
        font-size: 20px;
        font-weight: bolder;
        color: #32a852;
        margin: 0 auto 10% auto;
        justify-self: center;
      }

      &_save-button {
        max-width: 140px;
        width: 100%;
        max-height: 60px;
        padding: 15px 5px;
        border-radius: 12px;
        background: #32a852;
        box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute; 
        margin: 0 auto;
        bottom: 10%; right: 5%;

        &_text {
          color: white;
          margin: 0;
          font-size: 14px;

        }
      }
    }
  }

  .disabled {
    background: #c4c4c4;
    cursor: not-allowed;
  }
`;
