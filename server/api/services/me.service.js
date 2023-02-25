import l from '../../common/logger.js';
import { User } from '../../common/models/User.js';
import Token from '../../common/models/AccessToken.js';

class MeService {
    async me(req, res) {
        l.info(`${this.constructor.name}.me()`);
        if (req.headers.accesstoken || req.cookies.accesstoken) {
            let token = await Token
                .findOne({ token: req.headers.accesstoken || req.cookies.accesstoken }).catch(err => {
                    let error = new Error();
                    error.error = 'Token not valid! Log in User!';
                    error.code = 'NOT_AUTH';
                    return error;
                });
            if (!token) {
                let error = new Error();
                error.error = 'Token not valid! Log in User!';
                error.code = 'NOT_AUTH';
                return error;
            }
            let user = await User.findOne({ _id: token.user }).catch(error => error);
            if (user && !(user instanceof Error)) {
                return user;
            }
            let error = new Error();
            error.error = 'An uknown error occurred';
            error.code = 'UKNOWN_ERROR';
            return error;
        }
        let error = new Error();
        error.error = 'Token not valid! Log in User!';
        error.code = 'NOT_AUTH';
        return error;
    }
}

export default new MeService();