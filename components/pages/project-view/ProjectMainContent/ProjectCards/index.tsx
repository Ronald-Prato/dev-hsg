import { ProjectCardsT } from './index.d';

import { ProjectCardsStyles } from './styles';

const COMPONENT_NAME = 'project-cards';

const ProjectCards = ({topPart, value, type}: ProjectCardsT) => {

  return (
    <div className={COMPONENT_NAME}>
      {
        type === 'square' ? 
        <div className={`${COMPONENT_NAME}__square-render`}>
          {
            topPart.includes('static')
              ? <img src={topPart} className={`${COMPONENT_NAME}__square-render_icon`}/>
              : <p className={`${COMPONENT_NAME}__square-render_title`}> {topPart} </p>
          }
          <p className={`${COMPONENT_NAME}__square-render_value`}> {value} </p>
        </div>
        :
        <div className={`${COMPONENT_NAME}__long-render`}>
          <img src={topPart} className={`${COMPONENT_NAME}__long-render_icon`}/>
          <p className={`${COMPONENT_NAME}__long-render_value`}> {value} </p>
        </div>
      }
      <style jsx> {ProjectCardsStyles} </style>
    </div>
  );
};

export default ProjectCards;
