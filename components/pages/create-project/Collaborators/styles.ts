import css from 'styled-jsx/css';

export const PeopleStyles = css`
  .collaborators {
    display: flex; 
    flex-direction: column;
    align-items: center;

    &__collaborators-list {
      width: 94%;
      padding: 2% 5%;
      max-height: 200px;
      height: 200px;
      overflow: scroll;

      &_single-collaborator {
        width: 100%;
        padding: 3% 5%;
        background: white;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        margin-top: 3%;
        box-sizing: border-box;
        position: relative;

        &:first-child {
          margin-top: 0;
        }  

        &_email {
          color: #32a852;
          margin: 0;
          font-size: 14px;
        }

        &_delete-icon {
          margin: auto;
          position: absolute;
          top: 0; bottom: 0;
          right: 3%;
          width: 20px;
          cursor: pointer;
        }
      }
    }

    
    &__add-new-section {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 6px; 
      cursor: pointer;
      


      &_icon {
        width: 18px;
      }
      &_message {
        color: #32a852;
        margin: 0 0 0 10px;
        font-size: 14px;
      }
    }

   
  }
`;
