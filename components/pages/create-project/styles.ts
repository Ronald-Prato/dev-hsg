import css from 'styled-jsx/css';

export const ProjectWizardStyles = css`
  .project-wizard {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background: #32a852;


    &__main-content {
      width: 50%;
      height: 100%;
      display: grid;
      grid-template-rows: repeat(8, 1fr);
      box-shadow: 10px 0 8px rgba(0, 0, 0, .1);
      background: white;


      &_visible-name {
        grid-row: 2/3;
        justify-self: center;
        font-size: 20px;
        font-weight: bolder;
        color: #32a852;
      }

      &_input-container {
        width: 80%;
        grid-row: 3/7;
        justify-self: center;
        align-self: center;

      }

      &_wizard-actions {
        width: 100%;
        grid-row: 7/8; 
        justify-self: center;
        align-self: center;
      }
    }
    &__side-icon {
      width: 50%;
      height: 100%;
    }
  }
`;
