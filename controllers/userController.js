import http from 'http-status-codes';

export const getProfile = (req, res, next) => {
  res.status(http.ACCEPTED).json({ success: true, data: { user: req.user } });
};

export const verifyEmail = (req, res, next) => {};
