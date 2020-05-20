import { InfoCardT } from './index.d';

import { InfoCardStyles } from './styles';

const COMPONENT_NAME = 'info-card';

const InfoCard = ({icon, title, value}: InfoCardT) => {

  return (
    <div className={COMPONENT_NAME}>
      <img src={icon} className={`${COMPONENT_NAME}__icon`} />
      
      <div className={`${COMPONENT_NAME}__info-section`}>
        <p className={`${COMPONENT_NAME}__info-section_title`}> {title} </p>
        <p className={`${COMPONENT_NAME}__info-section_value`}> {value} </p>
      </div>

      <style jsx> { InfoCardStyles } </style> 
    </div>
  );
};

export default InfoCard;
