require('dotenv').config();
export const BASE_URL = `http://localhost:${process.env.PORT}/`;

export const auth = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  FIND_ID: '/find_id',
  FORGOT_PW: '/forgot_pw',
  RESET_PW: '/reset_pw'
};

export const users = {
  PROFILE: '/profile',
  SEND_TOKEN: '/email_token',
  CERTIFICATION: '/certification'
};
