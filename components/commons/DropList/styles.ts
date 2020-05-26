import css from 'styled-jsx/css';
import { PRIMARY_COLOR } from '../../../globalConfig';

export const DropListStyles = css`
  .drop-list {
    position: relative;

    &__main-input {
      width: 45%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 14px;
      border: 1px solid ${PRIMARY_COLOR};
      margin: 0 auto 10px auto;
      cursor: pointer;

      &_text {
        margin: 0;
      }
    }

    &__list {
      margin: 0 auto;
      position: absolute;
      left: 0; right: 0;
      width: 45%;
      height: 200px;
      background: white;
      border-radius: 14px;
      padding: 20px 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;


      &_input {
        outline: 0;
        border-radius: 12px;
        border: .5px solid rgba(0, 0, 0, .1);
        box-sizing: border-box;
        padding: 3px 10px;
        font-size: 12px;
        width: 90%;
        color: #909090;

        &::placeholder {
          color: #909090;
        }
      }
      &_options {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;

        &_single-option {
          margin: 0;
          font-size: 14px;
          line-height: 30px;
          cursor: pointer;
          width: 100%;
          transition: 150ms linear;
          flex: auto;
          text-align: center;

          &:hover {
            background: #93e6a9;
            color: white;
            font-weight: bolder;
          }
        }
      }
    }
  }
`;
