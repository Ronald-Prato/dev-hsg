import css from 'styled-jsx/css';

export const InfoFormStyles = css`
  .info-form {
    
    &__collaborator {
      width: 100%;
      height: 120%;
      display: flex;
      flex-direction: column;
      align-items: center;


      &_options {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5%;

        & p {
          color: #32a852;
          font-size: 14px;

        }
        & img {
          cursor: pointer;
          width: 20px;
        }
      }

      &_top {
        width: 100%;
      }
      &_mid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
      }

      &_bot {
        margin-top: 8%;
        &_title {
          color: #32a852;
          font-size: 15px;
          margin: 0;
        }

        &_permissions-render {
          display: flex;
          justify-content: space-around;
          margin-top: 8%;
        
          &_permission {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 12px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
            cursor: pointer;


            &_text {
              font-size: 12px;
              margin: 12px 0;
            }
          }
        }
      }

      &_add-button {
        padding-top: 10%;
      }
    }

    
  }
`;
