import css from 'styled-jsx/css';

export const LoadingStyles = css`
  .loading {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_text {
      color: #32a852;
      margin: 20px 0 0 0;
      padding: 10px;
    }
  } 
`;
