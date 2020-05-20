import Router from 'next/router';

const ProjectViewPage = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
      <p> Debe seleccionar un proyecto desde <a onClick={() => Router.push('/home')}> Home </a> </p>
    </div>
  );
};

export default ProjectViewPage;
