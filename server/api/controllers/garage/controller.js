import GaragesService from '../../services/garage/garages.service';

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
}
export default new Controller();