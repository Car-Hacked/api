import LoginService from '../services/login.service';
import l from '../../common/logger';

export class Controller {
    async login(req, res) {
        if (req.body && req.body.username &&
            req.body.password) {
            const result = await LoginService.login(req, res).catch(error => error);
            if (result instanceof Error && 'code' in result) {
                switch (result.code) {
                    case 'INVALID_CREDS':
                        return res.status(401).json(result);
                    case 'LOGGED_IN':
                        return res.status(422).json(result);
                    case 'NO_USER':
                        return res.status(404).json(result);
                    default:
                        return res.status(400).json(result);
                }
            } else if (result instanceof Error) {
                l.error(result);
                return res
                    .status(500)
                    .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
            }
            return res.status(201).json(result);
        }
        return res
            .status(422)
            .json({ error: 'Missing required parameter.' });
    }
}
export default new Controller();
