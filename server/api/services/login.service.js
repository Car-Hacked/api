import { v4 as uuidv4 } from 'uuid';
import l from '../../common/logger.js';
import { User } from '../../common/models/User.js';
import Token from '../../common/models/AccessToken.js';

class LoginService {
    async login(req, res) {
        l.info(`${this.constructor.name}.login()`);
        let user = await User.authenticate(req.body.username, req.body.password)
            .catch(err => {
                if (err.message && (err.message.slice(0, 6) === 'E11000')) {
                    let error = new Error();
                    error.error = 'You are still logged in! Log out!';
                    error.code = 'LOGGED_IN';
                    return error;
                }
                l.error(err);
                return err;
            });
        if (user && !(user instanceof Error)) {
            const tokenNum = uuidv4();
            const tokenData = { token: tokenNum, user: user._id };
            let token = await Token.create(tokenData).catch(error => error);
            if (token && !(token instanceof Error)) {
                token.user = user;
                res.cookie('accesstoken', tokenNum, { maxAge: (36000 * 1000), httpOnly: true });
                let clone = token.toObject();
                // Some fun es6 spoofing to put accessToken at the top of our
                // response. It is the star of the show, after all. We want
                // people to know that they need a header named accessToken.
                clone = Object.assign({ accessToken: clone.token }, clone);
                delete clone.token;
                delete clone.user.password;
                return clone;
            }
        }
        if (user instanceof Error) return user;
        let error = new Error();
        error.error = 'User not found!';
        error.code = 'NO_USER';
        return error;
    }
}

export default new LoginService();
