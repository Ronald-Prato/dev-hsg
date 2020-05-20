import css from 'styled-jsx/css';

export const CardsStyles = css`
  .cards {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__cards-render {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;

      &_single-card {
        min-width: 180px;
        min-height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        border: 1.4px solid #32a852;
        margin-bottom: 5%;
        cursor: pointer;
        box-shadow: 0 2px 8px 4px rgba(0, 0, 0, .1);
        &_icon {

        }
        &_name {
          font-size: 14px;
          margin: 0;
        }
      }
    }

    &__another-option-render {
      width: 60%;
      margin-top: 5%;
      
      &_options {
        margin: 0 0 2% 4%;
        color: #32a852;
        font-size: 15px;
        cursor: pointer;
        justify-self: center;
      }
    }
  }
`;
