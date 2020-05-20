import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const SignInStyles = css `
  .signin {
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

      &_inputs {
        ${getInGrid(2, 6, 7, 8)}
      }

      &_buttons {
        ${getInGrid(3, 5, 9, 10)}
        margin-bottom: 4%;
      }

      &_secondary-options {
        ${getInGrid(1, 13, 10, 11)}
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &_message {
          margin-top: 10%;
          font-size: 12px;
          &_link {
            font-size: 12px;
            text-decoration: underline;
            color: steelblue;
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
    }
  }

  /* Tablet */
  @media screen and (max-width: 768px) {
    .signin {
      &__main-content {
        width: 100vw;

        &_title {
          ${getInGrid(1, 7, 6, 7)}
          text-align: center;
          margin: 0;
        }

        &_inputs {
          ${getInGrid(3, 5, 7, 8)}
        }

      }
    }
  }

 /* Mobile */
  @media screen and (max-width: 568px) {
    .signin {
      background: blue;

      &__main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        &_inputs {
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        &_buttons {
        }
        &_secondary-options {
        }
      }

      
    }
  }
`;
