import css from 'styled-jsx/css';

export const SummaryStyles = css`
  .summary {
    position: relative;
    
    &__answers-render {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      
      &_single-answer {
        width: 48%;
        margin: 10px 5px;
        box-sizing: border-box;

        &_title {
          margin: 0 0 8px 5px;
          font-size: 12px;
          color: #32a852;
        }

        &_preview {
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          border-radius: 12px;
          padding: 10px 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
          position: relative;

          &_text {
            margin: 0;
            font-size: 14px;
            color: #505050;
          }

          &_edit-icon {
            display: none;
            width: 20px;
            background: white;
            box-sizing: border-box;
            position: absolute;
            margin: auto;
            top: 0; bottom: 0; right: 6%;
            transition: ease-in-out 150ms;
            cursor: pointer;
          }

          &:hover &_edit-icon {
            display: block;
          }
        }

        
      }
    }

    &__create-button {
      max-width: 140px;
      width: 100%;
      max-height: 60px;
      padding: 10px 5px;
      background: #32a852;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: absolute;
      z-index: 0; 
      margin: 0 auto;
      bottom: -15%; left: 0; right: 0;

      &_text {
        color: white;
        margin: 0;
        font-size: 14px;

      }
    }
  }
`;
