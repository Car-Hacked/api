import UsersService from '../../services/users/users.service';
import MeService from '../../services/me.service';
import Token from '../../../common/models/AccessToken';
import { User } from '../../../common/models/User';
import l from '../../../common/logger';

export class Controller {

    create(req, res) {
        l.info('UsersService.create()');
        if (req.body &&
            ((req.body.username && req.body.username.length > 20) &&
                (req.body.password && req.body.password.length > 20) && (req.body.secret && req.body.secret.length > 20))) {
            return res
                .status(422)
                .json({ error: 'One of the parameters is too long! Keep under 20 characters!', code: 'TOO_LONG' });
        }
        if (req.body &&
            req.body.username &&
            req.body.password &&
            req.body.secret) {
            const usernameRegex = /^[a-z0-9_]+$/i;
            if (req.body.secret !== 'hackmt-2020') {
                return res
                    .status(401)
                    .json({ error: 'Invalid credentials', code: 'NOT_AUTH' });
            }
            if (usernameRegex.test(req.body.username)) {
                return UsersService
                    .create(req.body)
                    .then(r => {
                        if (r.message && (r.message.slice(0, 6) === 'E11000')) {
                            return res
                                .status(409)
                                .json({ error: 'Username already exists!', code: 'ALREADY_EXISTS' });
                        } else if (r instanceof Error) {
                            l.error(r);
                            return res
                                .status(500)
                                .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
                        }
                        return res
                            .status(201)
                            .json(r);
                    });
            }
            return res
                .status(422)
                .json({ error: 'Username is invalid! Only alphanumeric characters and unserscore allowed!', code: 'INVALID_USERNAME' });
        }
        return res
            .status(422)
            .json({ error: 'Missing required parameter.', code: 'INVALID_PARAMS' });
    }

    async remove(req, res) {
        l.info(`UsersService.remove(${req.body.id})`);
        if (req.body && req.body.id) {
            if (req.headers.accesstoken || req.cookies.accesstoken) {
                let result = await MeService.me(req, res);
                if (result instanceof Error && 'code' in result && result.code === 'NOT_AUTH') {
                    return res.status(401).json(result);
                } else if (result instanceof Error) {
                    l.error(result);
                    return res
                        .status(500)
                        .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
                }
                let copy = result.toObject();
                delete copy.password;
                if (result._id.toString() !== req.body.id) {
                    let error = new Error(`User does not have access to delete user with id: ${req.body.id}`);
                    error.error = `User does not have access to delete user with id: ${req.body.id}`;
                    error.code = 'FORBIDDEN';
                    return res.status(403).json(error);
                }
                let secondResult = await User
                    .remove({ _id: result._id })
                    .catch(error => error);
                if (secondResult instanceof Error) {
                    if ('code' in secondResult && secondResult.code === 'NOT_EXIST') {
                        return res
                            .status(404)
                            .json({ error: secondResult.error, code: secondResult.code });
                    }
                    l.error(result);
                    return res
                        .status(500)
                        .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
                }
                await Token.deleteOne({ user: copy._id });
                let response = { message: `User with id of ${copy._id} and all associated data successfully removed!`, code: 'REMOVED' };
                return res.status(200).json(response);
            }
            return res
                .status(401)
                .json({ error: 'Missing required header accessToken.', code: 'NOT_AUTH' });
        }
        return res
            .status(422)
            .json({ error: 'Missing required parameter.', code: 'INVALID_PARAMS' });
    }

    async update(req, res) {
        l.info('UsersService.update()');
        const usernameRegex = /^[a-z0-9_]+$/i;
        if (req.body &&
            ((req.body.username && req.body.username.length > 20) ||
                (req.body.password && req.body.password.length > 20))) {
            return res
                .status(422)
                .json({ error: 'One of the parameters is too long! Keep under 20 characters!', code: 'TOO_LONG' });
        }
        if (req.body && (req.body.username || req.body.password)) {
            if (req.headers.accesstoken || req.cookies.accesstoken) {
                let result = await MeService.me(req, res);
                if (result instanceof Error && 'code' in result && result.code === 'NOT_AUTH') {
                    return res.status(401).json(result);
                } else if (result instanceof Error) {
                    l.error(result);
                    return res
                        .status(500)
                        .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
                }
                if (req.body.username) {
                    if (!usernameRegex.test(req.body.username)) {
                        return res
                            .status(422)
                            .json({ error: 'Username is invalid! Only alphanumeric characters and unserscore allowed!', code: 'INVALID_USERNAME' });
                    }
                    result.username = req.body.username;
                }
                if (req.body.password) result.password = req.body.password;
                let secondResult = await result
                    .save()
                    .catch(error => error);
                if (secondResult instanceof Error) {
                    if ('code' in secondResult && secondResult.code === 'NOT_EXIST') {
                        return res
                            .status(404)
                            .json({ error: secondResult.error, code: secondResult.code });
                    }
                    l.error(result);
                    return res
                        .status(500)
                        .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
                }
                if (secondResult instanceof Error) {
                    return secondResult;
                }
                let copy = secondResult.toObject();
                delete copy.password;
                return res.status(200).json(copy);
            }
            return res
                .status(401)
                .json({ error: 'Missing required header accessToken.', code: 'NOT_AUTH' });
        }
        return res
            .status(422)
            .json({ error: 'Missing required parameter.', code: 'INVALID_PARAMS' });
    }
}
export default new Controller();
