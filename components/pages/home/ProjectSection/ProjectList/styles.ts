import css from 'styled-jsx/css';

export const ProjectListStyles = css`
  .project-list {
    &__projects-render {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 20px;

      &_single-project {
        width: 100%;
        height: 150px;
        max-width: 160px;
        padding: 2% 4%;
        background: #69d184;
        margin-left: 10px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
        cursor: pointer;

        &:hover &_icon{
          transform: scale(1.5);
        }
        &:hover &_name{
          font-size: 13px;
          transform: translateY(30%);
        }

        &:first-child {
          margin-left: 0;
        }
        &_icon {
          width: 50px;
          transition: 250ms ease-in-out;
        }
        &_name {
          margin: 10px 0 0 0;
          color: white;
          font-size: 14px;
          transition: 250ms ease-in-out;
        }
      }
      &_create-another {
        width: 100%;
        height: 150px;
        max-width: 160px;
        padding: 2% 4%;
        background: #c1c1c1;
        margin-left: 10px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
        text-align: center;
        cursor: pointer;

        &:hover &_name {
          font-size: 14px;
        }

        &_name {
          font-size: 0px;
          margin: 10px 0 0 0;
          color: white;
          line-height: 100%;
          transition: 150ms ease-in-out;
        }
      }
    }
  }
  .icon {
    font-size: 40px;
  }
`;
