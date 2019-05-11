import EmailToken from '../models/user';


export const isNotLoggedIn = (req, res, next) => {
}

export const inLoggedIn = (req, res, next) => {

}

export const verifyEmailToken = async (req, res, next) => {
    const {body: {token, email}} = req;
    try {
        const emailToken = EmailToken.findOne({ token, email })
        if (emailToken) {
            next()
        } else {
            res.status(http.NOT_ACCEPTABLE).json({success: false, message: '만료 or 인증되지 않은 토큰'})
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}
