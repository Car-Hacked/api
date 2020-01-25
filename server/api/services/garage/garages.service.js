import l from '../../../common/logger';
import { Garage } from '../../../common/models/Garage';

class GaragesService {
    async all() {
        l.info(`${this.constructor.name}.all()`);
        const result = await Garage.find({}, (e, r) => r).catch(error => error);
        return result;
    }

    byId(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        return Garage.findOne({ _id: id }).catch(error => error);
    }

    async create(body) {
        l.info(`${this.constructor.name}.create()`);
        const garageConfig = {
            carsInLot: body.carsInLot || 0,
            capacity: body.capacity
        };
        const garage = await Garage.create(garageConfig).catch(error => error);
        return garage;
    }

    async delete(id) {
        l.info(`delete ${this.constructor.name}.byId(${id})`);
        const result = await Garage.deleteOne({ _id: id }).catch(error => error);
        if (result instanceof Error){
            return result;
        }
        const response = { message: `Garage with id ${id} and all associated data successfully removed!`, code: 'REMOVED' };
        return response;
    }

    async update(body) {
        l.info(`update ${this.constructor.name}.byId(${body._id})`);
        await Garage.updateOne({ _id: body._id }, body, { upsert: true }).catch(error => error);
        const garage = await Garage.findOne({ _id: body._id }).catch(error => error);
        if(garage) {
            garage.save();
            return garage;
        }
        return new Error("failed");
    }
}

export default new GaragesService();
