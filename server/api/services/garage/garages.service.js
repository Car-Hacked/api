import l from '../../../common/logger.js';
import { Garage } from '../../../common/models/Garage.js';

class GaragesService {
    async all() {
        l.info(`${this.constructor.name}.all()`);
        const result = await Garage.find({}).catch(error => error);
        if(result instanceof Error) {
          l.error(result);
        }
        return result;
    }

    async byId(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        const result = await Garage.findOne({ _id: id }).catch(error => error);
        if(result instanceof Error) {
          l.error(result);
        }
        return result;
    }

    async create(body) {
        l.info(`${this.constructor.name}.create()`);
        const garageConfig = {
            garageName: body.garageName,
            address: body.address,
            carsInLot: body.carsInLot || 0,
            capacity: body.capacity
        };
        const garage = await Garage.create(garageConfig).catch(error => error);
        if(result instanceof Error) {
          l.error(result);
        }
        return garage;
    }

    async delete(id) {
        l.info(`delete ${this.constructor.name}.byId(${id})`);
        const result = await Garage.deleteOne({ _id: id }).catch(error => error);
        if(result instanceof Error) {
          l.error(result);
          return result;
        }
        const response = { message: `Garage with id ${id} and all associated data successfully removed!`, code: 'REMOVED' };
        return response;
    }

    async update(body) {
        l.info(`update ${this.constructor.name}.byId(${body._id})`);
        const result = await Garage.updateOne({ _id: body._id }, body, { upsert: true }).catch(error => error);
        if(result instanceof Error) {
          l.error(result);
          return result;
        }
        const garage = await Garage.findOne({ _id: body._id }).catch(error => error);
        if(garage instanceof Error) {
          l.error(garage);
          return garage;
        }
        if(garage) {
            garage.save();
            return garage;
        }
        return new Error("failed");
    }
}

export default new GaragesService();
