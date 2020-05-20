import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const ForgotPasswordStyles = css`
  .forgot-password {
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

      &_inputs-container {
        ${getInGrid(1, 7, 7, 8)}
        display: flex;
        justify-content: center;
        margin-left: -10px;
        &_input {
          min-width: 250px;
          &_code {
            width: 100%;
          }
        }
      }

      &_button {
        ${getInGrid(1, 7, 8, 9)}
        display: flex;
        justify-content: center;
      }

      &_secondary-options {
        ${getInGrid(1, 13, 12, 13)}
        display: flex;
        justify-content: center;
        align-items: center;

        &_message {
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

  @media screen and (max-width: 768px) {
    .forgot-password {

      &__main-content {
        width: 100vw;

        &_logo {
          ${getInGrid(1, 7, 2, 5)}
        }

        &_inputs-container {
          ${getInGrid(1, 7, 7, 8)}
          display: flex;
          justify-content: center;
          margin-left: -10px;
          &_input {
            &_code {
              width: 100%;
            }
          }
        }

        &_title {
          ${getInGrid(1, 7, 6, 7)}
          text-align: center;
          margin: 0;
        }

        &_button {
          ${getInGrid(3, 5, 8, 9)}

        }

        &_secondary-options {
          ${getInGrid(1, 13, 9, 10)}
        }
      }
    }
  }

  @media screen and (max-width: 568px) {
    .forgot-password {


        
      &__main-content {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        overflow: hidden;

        &_inputs-container {
          width: 80%;
          &_input {
            width: 100%;
            
          }
        }

        &_button {
          width: 70%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;
