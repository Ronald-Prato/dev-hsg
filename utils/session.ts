import { Auth } from 'aws-amplify';
import Router from 'next/router';

export const SignUpService = async (email: string, password: string) => 
  Auth.signUp(email, password);

export const SignInService = async (email: string, password: string) => 
  Auth.signIn(email, password);

export const SendPasswordRecoveryEmail = async (email: string) => 
  Auth.forgotPassword(email);

export const RecoverPassword = async (email: string, code: string, password: string) => 
  Auth.forgotPasswordSubmit(email, code, password);

export const LogOut = () => {
  Router.push('/signin');
  Auth.signOut();
}
