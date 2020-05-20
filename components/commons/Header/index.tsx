import { useState } from 'react';

import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const COMPONENT_NAME = 'header';

import { HeaderStyles } from './styles';

import { LogOut } from '../../../utils/session';

const Header = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__content`}>
        <img src={'/static/images/hsg-logo.png'} className={`${COMPONENT_NAME}__content_logo`}/>
        <img src={'/static/svg/bell.svg'} className={`${COMPONENT_NAME}__content_bell`}/>
        <img onClick={() => setShowUserOptions(!showUserOptions)} src={'/static/svg/user.svg'} className={`${COMPONENT_NAME}__content_user`}/>

        {
          showUserOptions &&
          <section className={`${COMPONENT_NAME}__content_user-options`}>
            <div onClick={LogOut} className={`${COMPONENT_NAME}__content_user-options_single-option`}>
              <LogoutOutlined style={{color: 'rgba(0, 0, 0, .4)'}} />
              <p className={`${COMPONENT_NAME}__content_user-options_single-option_text`}> Cerrar sesión </p>
            </div>
            <div className={`${COMPONENT_NAME}__content_user-options_single-option`}>
              <SettingOutlined style={{color: 'rgba(0, 0, 0, .4)'}} />
              <p className={`${COMPONENT_NAME}__content_user-options_single-option_text`}> Configuración </p>
            </div>
          </section>
        }
      </section>


      <style jsx> { HeaderStyles } </style>
    </div>
  );
};

export default Header;
