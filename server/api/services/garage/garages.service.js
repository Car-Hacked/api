import l from '../../../common/logger';
import { Garage } from '../../../common/models/Garage';

class GaragesService {
    async all() {
        l.info(`${this.constructor.name}.all()`);
        return Garage.find({}, (e, r) => r).catch(error => error);
    }

    byId(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        return Garage.findOne({ _id: id }).catch(error => error);
    }

    async create(body) {
        const garageConfig = {
            carsInLot: body.carsInLot || 0,
            capacity: body.capacity
        };
        const garage = await Garage.create(garageConfig).catch(error => error);
        return garage;
    }
}

export default new GaragesService();
