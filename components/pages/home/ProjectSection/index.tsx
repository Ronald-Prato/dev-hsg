import { useContext, useState, useEffect } from 'react';
import { ProjectSectionStyles } from './styles';

import { LoadingOutlined } from '@ant-design/icons';

import Context from '../../../../globalState/context';

import Router from 'next/router';
import { HomeT } from '../index.d';

import ProjectList from './ProjectList';

const COMPONENT_NAME = 'project-section';

const ProjectSection = ({projects, projectsLoaded}: HomeT) => {
  const { state } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsLoaded &&
    setLoading(!projectsLoaded);
  }, [projectsLoaded]);

  const changeRoute = () => {
    Router.push('/create-project');
    console.log(state);
  };

  const DynamicRender = () => {
    if (loading) {
      return (
        <div className={`${COMPONENT_NAME}__square-empty`}>
          <LoadingOutlined style={{color: '#32a852', fontSize: '40px'}}/>
          <style jsx> {ProjectSectionStyles} </style>
        </div>
      )
    } else if (!loading && !state.user_internal_data.projects.length) {
      return (
        <div className={`${COMPONENT_NAME}__square`}>
          <div className={`${COMPONENT_NAME}__square_content`}>
            <img className={`${COMPONENT_NAME}__square_content_empty-icon`} src={'/static/svg/empty.svg'}/>
            <p className={`${COMPONENT_NAME}__square_content_empty-message`}> Sin proyectos aún </p>
            <div onClick={changeRoute} className={`${COMPONENT_NAME}__square_content_empty-button`}>
              <p className={`${COMPONENT_NAME}__square_content_empty-button_text`}> Crear nuevo proyecto </p>
            </div>
            <style jsx> {ProjectSectionStyles} </style>
          </div>
        </div>
      )
    } else if (!loading && state.user_internal_data.projects.length) {
      return (
        <div className={`${COMPONENT_NAME}__square`}>
          <h2 className={`${COMPONENT_NAME}__square_title`}> Proyectos recientes </h2>
          <ProjectList />
          <p className={`${COMPONENT_NAME}__square_optional-text`}> Ver todos los proyectos </p>
          <style jsx> {ProjectSectionStyles} </style>
        </div>
      )
    }
  }

  return (
    <div className={COMPONENT_NAME}>
      {DynamicRender()}
      <style jsx> {ProjectSectionStyles} </style>
    </div>
  );
};

export default ProjectSection;
