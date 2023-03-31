import GaragesService from '../../services/garage/garages.service.js';
import MeService from '../../services/me.service.js';
import l from '../../../common/logger.js';

export class Controller {
    all(req, res) {
        GaragesService.all().then(r => res.json(r));
    }

    byId(req, res) {
        GaragesService.byId(req.params.id).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }

    async create(req, res) {
        const user = await MeService.me(req).catch(error => error);
        if (user instanceof Error && 'code' in user && user.code === 'NOT_AUTH') {
            return res.status(401).json(user);
        } else if (user instanceof Error) {
            l.error(user);
            return res
                .status(500)
                .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
        }
        GaragesService.create(req.body).then(r =>
            res
                .status(201)
                .location(`/api/v1/examples/${r.id}`)
                .json(r)
        );
    }

    async delete(req, res) {
        const user = await MeService.me(req).catch(error => error);
        if (user instanceof Error && 'code' in user && user.code === 'NOT_AUTH') {
            return res.status(401).json(user);
        } else if (user instanceof Error) {
            l.error(user);
            return res
                .status(500)
                .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
        }
        GaragesService.delete(req.params.id).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }

    async update(req, res) {
        const user = await MeService.me(req).catch(error => error);
        if (user instanceof Error && 'code' in user && user.code === 'NOT_AUTH') {
            return res.status(401).json(user);
        } else if (user instanceof Error) {
            l.error(user);
            return res
                .status(500)
                .json({ error: 'An internal server error occured!', code: 'INTERNAL' });
        }
        GaragesService.update(req.body).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }
}
export default new Controller();