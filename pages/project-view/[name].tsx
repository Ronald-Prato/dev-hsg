import { useContext } from 'react';
import Context from '../../globalState/context';
import Head from 'next/head';
import ProjectLayout from '../../layouts/ProjectLayout';
import ProjectMainContent from '../../components/pages/project-view/ProjectMainContent';

const ProjectName = () => {
  const { state } = useContext(Context);
  const projectName = state.user_internal_data.currentProject.business_name;

  return (
    <div>
      <Head>
        <title> {projectName} </title>
      </Head>

      <ProjectLayout>
        <ProjectMainContent />
      </ProjectLayout>
    </div>
  );
};

export default ProjectName;
