import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;


export const SideRegisterStyles = css`
  .side-register {
    width: 100vw;
    height: 100vh;
    background: #32a852;
    display: grid;
    grid-template-columns: 1fr 1fr;


    &__main-content {
      max-height: 100vh;
      width: 50vw;
      height: 100%;
      overflow: scroll;
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
        &_tlf {
          width: 46%;
        }
        &_pass {
          width: 46%;
        }
        &_pass-repeat {
          width: 46%;
        }
        &_division {
          width: 46%;
        }
        &_unit {
          width: 46%;
        }
      }

      &_buttons {
        ${getInGrid(1, 13, 10, 11)}
        justify-self: center;
      }
    }
  }
`;
