import Head from 'next/head';
import CodeConfirmation from '../../components/pages/code-confirmation';

const CodeConfirmationPage = () => {

  return (
    <div>
      <Head>
        <title> Confirmación de código </title>
      </Head>
      
      <CodeConfirmation />
    </div>
  );
};

export default CodeConfirmationPage;
