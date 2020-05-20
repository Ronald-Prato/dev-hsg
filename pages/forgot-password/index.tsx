import Head from 'next/head';
import ForgotPassword from '../../components/pages/forgot-password';

const ForgotPasswordPage = () => {

  return (
    <div>
      <Head>
        <title> Recuperar Contraseña </title>
      </Head>
    
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage;
