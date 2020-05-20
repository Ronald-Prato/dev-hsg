import { useContext } from "react";
import Context from "../../../globalState/context";

import InfoSection from "./InfoSection";
import UserSection from "./UserSection";
import ProjectSection from "./ProjectSection";

import { HomeStyles } from './styles';
import { HomeT } from "./index.d";

const COMPONENT_NAME = 'home';

const Home = ({projectsLoaded}: HomeT) => {
  const { state } = useContext(Context);
  const provisionalInfo = [
    { icon: '/static/svg/projectsIcon.svg', title: 'Proyectos', value: state.user_internal_data.projects ? state.user_internal_data.projects.length : 0},
    { icon: '/static/svg/users.svg', title: 'Usuarios', value: '0' },
    { icon: '/static/svg/credits.svg', title: 'Créditos', value: '$29,400.00' },
    { icon: '/static/svg/plan.svg', title: 'Plan', value: 'Basic' }
  ];

  

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__user-section`}>
        <UserSection renderedName={'Jefferson Gutierritos'} />
      </section>

      <section className={`${COMPONENT_NAME}__info-section`}>
        <InfoSection info={provisionalInfo}/>
      </section>

      <section onClick={() => console.log("PROJECTS => ", state.user_internal_data.projects)} className={`${COMPONENT_NAME}__project-section`}>
        <ProjectSection projectsLoaded={projectsLoaded} projects={state.user_internal_data.projects}/>
      </section>

      <style jsx> {HomeStyles} </style>
    </div>
  );
};

export default Home;
