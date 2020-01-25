import l from '../../../common/logger';
import Garage from '.../.../../common/models/Garage';

class GaragesService {
    all() {
        l.info(`${this.constructor.name}.all()`);
        return Garage.find().catch(error => error);
    }

    byId(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        return Garage.findOne({ _id: id }).catch(error => error);
    }
}

export default new GaragesService();
