import { BASE_URL, auth, users } from './routes/endPoints';

export const makeEmailToken = () => {
  let token = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return token;
};

export const makeEmailContent = (type, email, token) => {
  const actionUrl =
    BASE_URL +
    (type === 'forgot'
      ? 'auth' + auth.RESET_PW
      : 'users' + users.CERTIFICATION);
  console.log(actionUrl);
  return ` 
    <div class="container">
            <div>${
              type === 'forgot'
                ? '앱에서 토큰을 입력하시면 아래 토큰으로 비밀번호가 임시 변경됩니다. 반드시 비밀번호를 변경해주세요.'
                : '이메일 인증을 위해 아래 토큰을 입력해주세요.'
            }</div>
            <div class="token-box">인증 토큰: ${token}</div>
      </div>
      
      <style>
        .token-box {
          heigth: 30px;
          border: 2px solid black;
        }
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      `;
};
