import { useEffect } from 'react';
import Router from 'next/router';

import { Auth } from 'aws-amplify';

const Index = () => {

  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    await Auth.currentAuthenticatedUser()
      .then(() => {
        Router.push('/home');
      })
      .catch(() => {
        Router.push('/signin');
      })
  };

  return (
    <div className='main'>
      <p className='message'> Redireccionando... </p>

      <style jsx>{`
        .main {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        } 
        .message {
          font-size: 20px;
        }
      `}</style>
    </div>
  )
}

export default Index;
