import css from 'styled-jsx/css';

export const MassiveMessageStyles = css`
  @keyframes zoom-in {
    0% { transform: scale(.1) }
    70% { transform: scale(1.15) }
    100% { transform: scale(1) }
  }

  .massive-message {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__opacity {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      z-index: -1;
    } 

    &__main-section {
      width: 450px;
      height: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      padding: 2% 3%;
      display: flex; 
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      animation: zoom-in 350ms;

      &_close-icon {
        position: absolute;
        z-index: 100;
        top: 4%;
        right: 4%;
        cursor: pointer;
      }

      &_send-channel {
        width: 100%;
        display: flex;
        flex-direction: column;
        
        &_title {
          font-weight: bolder;
          color: #32a852;
          font-size: 14px; 
        }

        &_options {
          display: flex;
          justify-content: space-around;

          &_option {
            display: flex;
            align-items: center;

            &_text {
              margin: 0 10px 0 0;
              color: #32a852;
            }
          }
        }
      }

      &_filters {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        &_top-part {
          display: flex;
          align-items: center;


          &_title {
            margin: 0 0 0 10px;
            color: #32a852;
            font-size: 14px; 
            font-weight: bolder;
          }
        }

        &_active {
          margin-top: 10px;

          &_input-container {
            width: 50%;
          }
        }
      }

      &_message {
        &_title {
          margin: 0 0 5px 10px;
          color: #32a852;
          font-size: 14px; 
          font-weight: bolder;
        }

        &_text-area {
          width: 100%;
          resize: none;
          outline: none;
          border: .5px solid rgba(0, 0, 0, .2);
          border-radius: 12px;
          box-sizing: border-box;
          padding: 10px 10px;
          color: #828282;
          min-height: 200px;
          max-height: 300px;
          height: 100%;
        }
      }

      &_send-button {
        width: 100%;
        margin-top: 10px;
        
        &_button-container {
          width: 40%;
        }
      }
    }
  }
`;
