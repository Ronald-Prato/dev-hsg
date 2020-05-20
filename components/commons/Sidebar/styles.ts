import css from 'styled-jsx/css';

export const SidebarStyles = css`
  .side-bar {
    min-width: 130px;
    height: 100%;
    box-shadow: 0 1px 15px rgba(0, 0, 0, .1);
    border-right: .4px solid rgba(0, 0, 0, .4);

    &__options-container {

      &_single-option {
        width: 130px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        cursor: pointer;

        &_icon {
          width: 30px;
        }
        &_name {
          margin: 5% 0 0 0;
          font-size: 12px;
          color: rgba(0, 0, 0, .4);
        }
      }
    }
  }
`;
