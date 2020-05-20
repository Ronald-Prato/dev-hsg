import { SidebarStyles } from './styles';

import sidebar from '../../../public/static/sidebarOptions.json';

const COMPONENT_NAME = 'side-bar';

const Sidebar = () => {
  const sideBarOptions = sidebar.options;

  return (
    <div className={COMPONENT_NAME}>

      <div className={`${COMPONENT_NAME}__options-container`}>
        {
          sideBarOptions.map((option, index) => 
            <div className={`${COMPONENT_NAME}__options-container_single-option`} key={index}>
              <img className={`${COMPONENT_NAME}__options-container_single-option_icon`} src={option.icon}/>
              <p className={`${COMPONENT_NAME}__options-container_single-option_name`}> {option.name} </p>
            </div>
          )
        }
      </div>

      <style jsx> {SidebarStyles} </style>
    </div>
  );
};

export default Sidebar;
