import css from 'styled-jsx/css';

export const ProjectCardsStyles = css`
  .project-cards {
    
    &__square-render {
      width: 100%;
      height: 200px;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      box-shadow: 0  0 10px rgba(0, 0, 0, .2);

      &_icon {
        width: 50px;
      }

      &_title {
        color: #32a852;
        font-weight: bolder;
        font-size: 16px;
        text-align: center;
      }

      &_value {
        font-size: 14px;
        margin: 15px 0 0 0;
        font-weight: bolder;
        color: #909090;
      }
    }

    &__long-render {
      width: 100%;
      height: 90px;
      border-radius: 12px;
      box-shadow: 0  0 10px rgba(0, 0, 0, .2);
      display: flex;
      justify-content: flex-start; 
      align-items: center;

      &_icon {
        width: 30px;
        margin-left: 20px;
      }

      &_value {
        margin-left: 10px;
        font-size: 13px;
        margin: 0 0 0 15px;
      }
    }
  }
`;
