import Head from 'next/head';
import SignIn from '../../components/pages/signin';

const SignInPage = () => {

  return (
    <div>
      <Head>
        <title> Iniciar sesión </title>
      </Head>

      <SignIn />
    </div>
  );
};

export default SignInPage;
