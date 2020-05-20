import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number) => `
  grid-column: ${i_c}/${f_c};
`;

export const HeaderStyles = css`
  @keyframes show-in {
    from { opacity: 0 }
    to { opacity: 1 }
  }
  .header {
    width: 100vw;
    max-height: 100px;
    height: 100%;
    z-index: 1000;
    box-shadow: 0 1px 15px rgba(0, 0, 0, .1);

    &__content {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      position: relative;

      &_logo {
        margin: auto;
        position: absolute;
        top: 50%; bottom: 50%;
        left: 45px;
        width: 50px;
        cursor: pointer;
      }
      &_bell {
        ${getInGrid(19, 20)}
        width: 25px;
        align-self: center;
        cursor: pointer;
      }
      &_user {
        ${getInGrid(20, 21)}
        width: 25px;
        align-self: center;
        cursor: pointer;
      }

      /* Opciones del usuario */
      &_user-options {
        position: absolute;
        right: 1%;
        bottom: -40%;
        width: 150px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
        border-radius: 8px;
        background: white;
        animation: show-in 200ms;

        &_single-option {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 5px 10px;
          transition: 200ms ease;
          cursor: pointer;

          &:hover {
            background: rgba(50, 168, 83, .2);
          }

          &_text {
            margin: 0 0 0 10px;
            color: rgba(0, 0, 0, .4);
          }
        }
      }
    }
  }
`;
