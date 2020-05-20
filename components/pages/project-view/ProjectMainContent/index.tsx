import { useContext, useState, useEffect } from "react";
import Router from 'next/router';

import * as _ from 'lodash';

import { WhatsAppOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import { ProjectMainContentStyles } from './styles';

import Context from "../../../../globalState/context";

import ProjectCards from "./ProjectCards";
import UserMassiveLoad from "./UsersMassiveLoad";
import Button from '../../../commons/FormButton';
import MassiveMessage from "./MassiveMessage";

const COMPONENT_NAME = 'project-main-content';

const ProjectMainContent = () => {
  const { state } = useContext(Context);
  const project: any = state.user_internal_data.currentProject;
  const [translation, setTranslation] = useState('translateX(150%)');
  const [showMassiveMessage, setShowMassiveMessage] = useState(false);

  console.log(project);

  const dataStruct = [
    {type: 'square', topPart: '/static/svg/name.svg', value: project.business_name},
    {type: 'square', topPart: '/static/svg/address.svg', value: project.address},
    {type: 'long', topPart: '/static/svg/communicationIcon.svg', value: project.phone_number},
    {type: 'long', topPart: '/static/svg/email.svg', value: project.email},
    {type: 'square', topPart: 'NIT', value: `${project.nit}-${project.verification_nit}`},
    {type: 'square', topPart: 'CIUDAD', value: project.city},
    {type: 'square', topPart: 'DIVISIONES', value: project.division},
    {type: 'square', topPart: 'UNIDADES RESIDENCIALES', value: project.residential_units},
  ];

  useEffect(() => {
    _.isEmpty(project) && Router.push('/home');
  }, []);

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__main-render`}>
        <div className={`${COMPONENT_NAME}__main-render_name`}>
          <ProjectCards {...dataStruct[0]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_address`}>
          <ProjectCards {...dataStruct[1]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_phone`}>
          <ProjectCards {...dataStruct[2]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_email`}>
          <ProjectCards {...dataStruct[3]}/> 
        </div>
        <div className={`${COMPONENT_NAME}__main-render_nit`}>
          <ProjectCards {...dataStruct[4]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_city`}>
          <ProjectCards {...dataStruct[5]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_division`}>
          <ProjectCards {...dataStruct[6]}/>
        </div>
        <div className={`${COMPONENT_NAME}__main-render_units`}>
          <ProjectCards {...dataStruct[7]}/>
        </div>

        <section onClick={() => setTranslation('translateX(0)')} className={`${COMPONENT_NAME}__main-render_upload`}>
          <UsergroupAddOutlined style={{color: 'white', fontSize: '30px'}} />
          <p className={`${COMPONENT_NAME}__main-render_upload_text`}> Cargar Usuarios </p>
        </section>

        <section onClick={() => setShowMassiveMessage(true)} className={`${COMPONENT_NAME}__main-render_messages`}>
          <WhatsAppOutlined style={{color: 'white', fontSize: '30px'}} />
          <p className={`${COMPONENT_NAME}__main-render_messages_text`}> Mensajes </p>
        </section>
      </section>

      <section className={`${COMPONENT_NAME}__massive-load-modal`}>
        <UserMassiveLoad hide={() => setTranslation('translateX(150%)')} translation={translation}/>
      </section>

      {
        showMassiveMessage &&
        <MassiveMessage closeSelf={() => setShowMassiveMessage(false)}/>
      }

      <style jsx> {ProjectMainContentStyles} </style>
    </div>
  );
};

export default ProjectMainContent;
