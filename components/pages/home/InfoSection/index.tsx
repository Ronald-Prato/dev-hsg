import { InfoSectionStyles } from './styles';

import { InfoSectionT } from './index.d';
import InfoCard from '../../../commons/InfoCard';

const COMPONENT_NAME = 'info-section';

const InfoSection = ({info}: InfoSectionT) => {

  return (
    <div className={COMPONENT_NAME}>
      {
        info.map((card, index) => 
          <div key={index} className={`${COMPONENT_NAME}__single-card`}>
            <InfoCard {...card}/>
          </div>
        )
      }
      <style jsx> { InfoSectionStyles } </style>
    </div>
  );
};

export default InfoSection;
