import { useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import Router from 'next/router';

import Head from 'next/head';

import MainLayout from '../../layouts/MainLayout';
import ProjectWizard from '../../components/pages/create-project';
import { ExceptionHandler } from '../../utils/formUtils';

import Context from '../../globalState/context';

const CreateProjectPage = () => {
  const { state, actions } = useContext(Context);
  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    await Auth.currentAuthenticatedUser()
      .then(res => {
        saveSessionData(res.attributes.sub, res.attributes.email);
      })
      .catch(() => {
        ExceptionHandler('Su sesión ha expirado, ingrese nuevamente');
        Router.push('/signin');
      })
  };

  const saveSessionData = async (userId: string, userEmail: string) => {
    await actions({
      type: 'setState',
      payload: {
        ...state,
        user_internal_data: {
        ...state.user_internal_data,
          id: userId,
          email: userEmail
        },
        project_wizard: {
          optionalAnswers: {},
          settings: {},
          collaborators: []
        }
      }
    })
  }
  
  return (
    <div>
      <Head>
        <title> Crear Nuevo Proyecto </title>
      </Head>

      <MainLayout>
        <ProjectWizard />
      </MainLayout>
    </div>
  )
}

export default CreateProjectPage;
