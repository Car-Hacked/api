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
        l.info(`${this.constructor.name}.create()`);
        const garageConfig = {
            garageName: body.garageName,
            carsInLot: body.carsInLot || 0,
            capacity: body.capacity
        };
        const garage = await Garage.create(garageConfig).catch(error => error);
        return garage;
    }

    async delete(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        const result = await Garage.deleteOne({ _id: id }).catch(error => error);
        if (result instanceof Error){
            return result;
        }
        const response = { message: `Garage with id ${id} and all associated data successfully removed!`, code: 'REMOVED' };
        return response;
    }
}

export default new GaragesService();
