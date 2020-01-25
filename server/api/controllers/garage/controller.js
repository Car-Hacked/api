import GaragesService from '../../services/garage/garages.service';
import app from '../../../common/server';

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

    create(req, res) {
        GaragesService.create(req.body).then(r =>
            res
                .status(201)
                .location(`/api/v1/examples/${r.id}`)
                .json(r)
        );
    }

    delete(req, res) {
        GaragesService.delete(req.params.id).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }

    update(req, res) {
        GaragesService.update(req.body).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }
}
export default new Controller();