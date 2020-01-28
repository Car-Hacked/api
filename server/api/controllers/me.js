import MeService from '../services/me.service';
import l from '../../common/logger';

export class Controller {
    async me(req, res) {
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
            return res.status(200).json(copy);
        }
        return res
            .status(401)
            .json({ error: 'Missing required header accessToken.', code: 'NOT_AUTH' });
    }
}
export default new Controller();