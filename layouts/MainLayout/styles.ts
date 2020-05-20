import css from 'styled-jsx/css';

const getInGrid = (i_c: number, f_c: number, i_r: number, f_r: number) => `
  grid-column: ${i_c}/${f_c};
  grid-row: ${i_r}/${f_r};
`;

export const MainLayoutStyles = css`
  .main-layout {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(24, 1fr);


    &__header {
      ${getInGrid(1, 13, 1, 4)}
    }

    &__side-bar {
      ${getInGrid(1, 2, 4, 25)}
    }

    &__main-component {
      ${getInGrid(2, 13, 4, 25)}
    }
  }
`;
