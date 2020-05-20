import Header from "../../components/commons/Header";

import { ProjectLayoutStyles } from './styles';
 
import { ProjectLayoutT } from './index.d';

const COMPONENT_NAME = 'project-layout';

const ProjectLayout:  ProjectLayoutT = ({children}) => {

  return (
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__header`}>
        <Header />
      </section>

      <section className={`${COMPONENT_NAME}__main-component`}>
        { children }
      </section>

      <style jsx> {ProjectLayoutStyles} </style>
    </div>
  );
};

export default ProjectLayout;
