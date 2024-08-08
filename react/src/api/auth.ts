import api from './api';
import Cookies from 'js-cookie';

type SignUpParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export const signUp = (params: SignUpParams) => {
  return api.post('/auth', params);
};

export const signIn = (params: SignInParams) => {
  console.log(params);
  return api.post('/auth/sign_in', params);
};

export const signOut = () => {
  return api.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};

export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return;

  return api.get('/auth/sessions', {
    headers: {
      "access-token": Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};