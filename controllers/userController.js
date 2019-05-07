import http from 'http-status-codes'

export const getProfile = (req, res, next) => {
    res.status(http.ACCEPTED).json("success");
}