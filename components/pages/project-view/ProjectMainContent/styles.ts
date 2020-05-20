import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const ProjectMainContentStyles = css`
  .project-main-content {
    padding: 2% 5%;
    position: relative;
    
    &__main-render {
      display: grid; 
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(12, 1fr);
      grid-gap: 20px;

      &_name {
        ${getInGrid(1, 3, 1, 5)}
        width: 100%;
        height: 200px;
      }
      &_address {
        ${getInGrid(3, 5, 1, 5)}
        width: 100%;
        height: 200px;
      }
      &_phone {
        ${getInGrid(5, 9, 1, 3)}
        width: 100%;
        height: 100%;
      }
      &_email {
        ${getInGrid(5, 9, 3, 5)}
        width: 100%;
        height: 100%;
      }
      &_nit {
        ${getInGrid(1, 3, 5, 9)}
      }
      &_city {
        ${getInGrid(3, 5, 5, 9)}
      }
      &_division {
        ${getInGrid(5, 7, 5, 9)}
      }
      &_units {
        ${getInGrid(7, 9, 5, 9)}
      }

      &_upload {
        ${getInGrid(11, 13, 1, 3)}
        background: #32a852;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        cursor: pointer;
        padding: 0 30px;

        &_text {
          margin: 0 0 0 20px;
          color: white;
          font-size: 14px;
        }
      }

      &_messages {
        ${getInGrid(11, 13, 3, 5)}
        background: #32a852;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        cursor: pointer;
        padding: 0 30px;

        &_text {
          margin: 0 0 0 20px;
          color: white;
          font-size: 14px;
        }
      }
    }

  
  }
`;
