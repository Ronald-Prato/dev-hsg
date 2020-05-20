import { UserSectionStyles } from './styles';

import { UserSectionT } from './index.d';

const COMPONENT_NAME = 'user-section';

const UserSection = ({renderedName}: UserSectionT) => {

  return (
    <div className={COMPONENT_NAME}>
      
      <h1 className={`${COMPONENT_NAME}__rendered-name`}> 
        <p className={`${COMPONENT_NAME}__rendered-name_greet`}> Bienvenido </p>
        {' ' + renderedName} 
      </h1>
      
      <div className={`${COMPONENT_NAME}__separator`}/>
      <style jsx> {UserSectionStyles} </style>
    </div>
  );
};

export default UserSection;
