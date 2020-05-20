import css from 'styled-jsx/css';

export const UsersMassiveLoadStyles = css`
  .users-massive-load {
    width: 350px; 
    height: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
    position: absolute;
    z-index: 1000;
    background: white;
    top: 2%; right: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 4% 0;
    transition: 250ms ease-in-out;

    &_title {
      margin: 12px;
      font-size: 15px;
      color: #32a852;
      font-weight: bolder;
      text-align: center;
    }

    &_filepond {
      width: 90%;

      &_loading-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &_button {
      width: 40%;
    }

    &_close-button {
      position: absolute;
      top: 5%; right: 5%;
      cursor: pointer;
    }
  }
`;
