import { useContext, useState } from "react";
import Router from 'next/router';
import Context from "../../../../../globalState/context";

import { AppstoreAddOutlined } from '@ant-design/icons';

import { ProjectListStyles } from './styles';

const COMPONENT_NAME = 'project-list';

const ProjectList = () => {
  const { state, actions } = useContext(Context);
  const projects = state.user_internal_data.projects;
  const maxRender = 3;

  const changeRoute = (path: string, toSubRoute?: boolean, subRoute?: string) => {
    if (toSubRoute) {
      Router.push(`/${path}/[name]`, `/${path}/${subRoute}`);
    } else { Router.push(`/${path}`); }
  };

  const setCurrentProject = async (project: any) => {
    window.localStorage.setItem('currentCachedProject', JSON.stringify(project));
    await actions({
      type: 'setState',
      payload: {
        ...state,
        user_internal_data: {
          ...state.user_internal_data,
          currentProject: project
        }
      }
    });
    changeRoute('project-view', true, project.business_name);
  };

  return (
    <div className={COMPONENT_NAME}>
      <div className={`${COMPONENT_NAME}__projects-render`}>
        {
          projects.map((project: any, index: number) =>
            index < maxRender &&
            <div onClick={() => setCurrentProject(project)} className={`${COMPONENT_NAME}__projects-render_single-project`} key={index}>
              <img src={'/static/svg/building.svg'} className={`${COMPONENT_NAME}__projects-render_single-project_icon`}/>
              <p className={`${COMPONENT_NAME}__projects-render_single-project_name`}> {project.business_name} </p>
            </div>  
          )
        }
        <div onClick={() => changeRoute('create-project')} className={`${COMPONENT_NAME}__projects-render_create-another`}>
          <AppstoreAddOutlined style={{color: 'white', fontSize: '50px'}}/>
          <p className={`${COMPONENT_NAME}__projects-render_create-another_name`}> Crear nuevo proyecto </p>
        </div>
      </div>

      <style jsx> {ProjectListStyles} </style>
    </div>
  );
};

export default ProjectList;
