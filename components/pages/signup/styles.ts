import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const SignUpSyles = css`
  .sign-up {
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
        ${getInGrid(1, 7, 6, 9)}
        padding: 0 5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &_name {
          width: 46%;
        }
        &_lastname {
          width: 46%;
        }
        &_email {
          width: 46%;
        }
        &_tlf {
          width: 46%;
        }
        &_pass {
          width: 46%;
        }
        &_pass-repeat {
          width: 46%;
        } 

        &_user-type-message {
          width: 100%;
          margin: 0;
          font-size: 12px;
          margin-top: 1em;
        }

        &_user-type {
          width: 100%;
          display: flex; 
          justify-content: space-around;

          &_option {
            display: flex;
            flex-direction: column;
            align-items: center;

            &_message {
              margin: 12px 0 0 0;
              color: rgba(0, 0, 0, .5);
              font-size: 12px;
            }
          }
        }
      }

      &_buttons {
        ${getInGrid(1, 13, 11, 12)}
        align-self:center;
        justify-self: center;
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
    .sign-up {
      height: 100%;
      overflow: scroll;
      &__main-content {
        width: 100vw;
        

        &_logo {
          ${getInGrid(1, 7, 2, 5)}
        }

        &_title {
          ${getInGrid(1, 7, 5, 6)}
          text-align: center;
          margin: 0;
        }
        

        &_buttons {
          ${getInGrid(1, 13, 10, 11)}
        }

        &_secondary-options {
          ${getInGrid(1, 13, 11, 12)}
        }
      } 
    }
  }

  @media screen and (max-width: 520px) {
    .sign-up {
      height: 100vh;
      overflow: scroll;

      &__main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        &_inputs {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-left: 12px;

          &_name {
            width: 94%;
          }
          &_lastname {
            width: 94%;
          }
          &_email {
            width: 94%;
          }
          &_tlf {
            width: 94%;
          }
          &_pass {
            width: 94%;
          }
          &_pass-repeat {
            width: 94%;
          } 

          &_user-type-message {
            width: 94%;
            margin: 0;
            font-size: 12px;
            margin-top: 1em;
          }

          &_user-type {
            width: 100%;
            display: flex; 
            justify-content: space-around;

            &_option {
              display: flex;
              flex-direction: column;
              align-items: center;

              &_message {
                margin: 12px 0 0 0;
                color: rgba(0, 0, 0, .5);
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
`;
