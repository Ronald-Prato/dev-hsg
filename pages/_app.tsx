import { useEffect } from 'react';
import { AppProps } from '../types/index.d';
import Head from 'next/head';

import config from '../aws-exports';
import Amplify from 'aws-amplify';

import useGlobalState from '../globalState/useGlobalState';
import Context from '../globalState/context';

import 'antd/dist/antd.css';
import 'filepond/dist/filepond.min.css';

const PortalApp = ({Component, pageProps}: AppProps) => {
  const store = useGlobalState();

  useEffect(() => {
    Amplify.configure(config);
  }, []);

  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
      </Head>

      <Context.Provider value={store}>
        <Component {...pageProps}/>
      </Context.Provider>

      <style global jsx>{`
        html {
          width: 100%;
          height: 100%
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default PortalApp;
