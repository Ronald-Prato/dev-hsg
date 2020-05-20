import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const  CodeConfirmationStyles = css`
  .code-confirmation {
    width: 100vw;
    height: 100vh;
    background: #32a852;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &__main-content {
      max-height: 100vh;
      width: 50vw;
      height: 100%;
      background: white;
      box-shadow: 0 1px 15px 2px rgba(0, 0, 0, .2);
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(12, 1fr);

      &_logo {
        ${getInGrid(1, 7, 1, 5)}
        width: 160px;
        align-self: center;
        justify-self: center;
      }

      &_title {
        ${getInGrid(1, 7, 5, 6)}
        margin: 0 0 0 5%;
        font-size: 18px;
      }

      &_input {
        ${getInGrid(3, 5, 7, 8)}
      }

      &_button {
        ${getInGrid(1, 7, 8, 9)}
        display: flex;
        justify-content: center;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .code-confirmation {
      &__main-content {
        width: 100vw;

        &_logo {
          ${getInGrid(1, 7, 2, 5)}
        }

        &_title {
          ${getInGrid(1, 7, 6, 7)}
          text-align: center;
          margin: 0;
        }
      } 
    }
  }
`;
