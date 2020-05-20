import css from 'styled-jsx/css';

export const InfoCardStyles = css`
  .info-card {
    width: 100%;
    max-width: 280px;
    min-width: 250px;
    min-height: 100px;
    padding: 0 5%;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
    display: grid;
    grid-template-columns: 1fr 2fr;
    
    &__icon {
      width: 50px;
      justify-self: center;
      align-self: center;
    }

    &__info-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: 15px;

      &_title {
        font-size: 14px;
        margin: 0;
      }

      &_value {
        font-size: 20px;
        font-weight: bolder;
        color: #32a852; 
        margin: 4px 0 0 0;
      }
    }
  }
`;
