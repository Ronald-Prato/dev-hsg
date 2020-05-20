import css from 'styled-jsx/css';

export const ProjectSectionStyles = css`
  .project-section {
    margin: 30px 34px;

    &__square-empty {
      width: 750px;
      height: 300px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__square {
      width: 750px;
      height: 300px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
      background: white;
      padding: 2% 3%;

      &_title {
        color: #32a852;
      }

      &_optional-text {
        margin: 5% 0 0 0;
        color: #32a852;
        font-size: 12px;
        cursor: pointer;
      }

      &_content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &_empty-icon {
          width: 100px;
        }

        &_empty-message {
          margin: 10px 0 0 0;
          font-size: 14px;
          color: rgba(0, 0, 0, .2);
        }

        &_empty-button {
          padding: 0 2%;
          display: flex;
          margin-top: 4%;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background: #32a852;
          
          &_text {
            color: white;
            font-size: 12px;
            font-weight: bolder;
            margin: 10px 0;
          }
        }
      }
      

      
    }
  }
`;
