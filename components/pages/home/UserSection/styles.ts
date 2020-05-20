import css from 'styled-jsx/css';

export const UserSectionStyles = css`
  .user-section {
    margin-left: 40px;
    
    &__rendered-name {
      font-size: 18px;
      margin: 0 0 0 10px;
      color: #32a852;
      margin-right: 12px;

      &_greet {
        margin: 0;
        font-size: 18px;
        color: black;
        display: inline-block;
      }
    }

    &__separator {
      width: 90%;
      height: .8px;
      background: rgba(0, 0, 0, .1);
      margin: 1.8% 0;
    }
  }
`;
