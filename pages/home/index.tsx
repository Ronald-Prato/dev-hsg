import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';

import Home from '../../components/pages/home';
import MainLayout from '../../layouts/MainLayout';

import Context from '../../globalState/context';

import { Auth } from 'aws-amplify';

import { ExceptionHandler } from '../../utils/formUtils';
import { ListProjects } from '../../utils/dbUtils';

const HomePage = () => {
  const { state, actions } = useContext(Context);
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    await Auth.currentAuthenticatedUser()
      .then(async res => {
        await ListProjects(res.attributes.sub)
          .then(request => {
            saveSessionData(res.attributes.sub, res.attributes.email, request.data.projects);
          })
          .catch(err => console.log(err));
      })
      .catch(() => {
        ExceptionHandler('Su sesión ha expirado, ingrese nuevamente');
        Router.push('/signin');
      })
  };

  const saveSessionData = async (userId: string, userEmail: string, projects: any) => {
    await actions({
      type: 'setState',
      payload: {
        ...state,
        user_internal_data: {
          id: userId,
          email: userEmail,
          projects: projects,
          currentProject: {}
        },
        project_wizard: {
          optionalAnswers: {},
          settings: {},
          collaborators: []
        }
      }
    })
    setProjectsLoaded(true);
  }

  return (
    <div>
      <Head>
        <title> Inicio </title>
      </Head>

      <MainLayout>
        <Home projectsLoaded={projectsLoaded}/>
      </MainLayout>
    </div>
  )
}

export default HomePage;
