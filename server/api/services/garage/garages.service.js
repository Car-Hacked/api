import l from '../../../common/logger';
import db from './dummy.db.service';

class GaragesService {
    all() {
        l.info(`${this.constructor.name}.all()`);
        return db.all();
    }

    byId(id) {
        l.info(`${this.constructor.name}.byId(${id})`);
        return db.byId(id);
    }

    create(name) {
        return db.insert(name);
    }
}

export default new GaragesService();
