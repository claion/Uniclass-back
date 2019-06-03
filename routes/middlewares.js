import EmailToken from '../models/user';

export const isCertificated = (req, res, next) => {
  const {
    user: { isCertificated }
  } = req;
  if (isCertificated) next();
  else
    res
      .status(http.NOT_ACCEPTABLE)
      .json({ success: false, message: '이메일 인증이 필요합니다.' });
};

export const isNotCertificated = (req, res, next) => {
  const {
    user: { isCertificated }
  } = req;
  if (!isCertificated) next();
  else
    res
      .status(http.NOT_ACCEPTABLE)
      .json({ success: false, message: '이미 인증되었습니다.' });
};

export const verifyEmailToken = async (req, res, next) => {
  const {
    body: { token, email }
  } = req;
  try {
    const emailToken = EmailToken.findOne({ token, email });
    if (emailToken) {
      next();
    } else {
      res
        .status(http.NOT_ACCEPTABLE)
        .json({ success: false, message: '만료 or 인증되지 않은 토큰' });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
