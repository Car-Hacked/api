class DummyDatabase {
    constructor() {
        this._data = [];
        this._counter = 0;
        this._capacity = 500;

        this.insert(42);
        this.insert(316);
    }

    all() {
        return Promise.resolve(this._data);
    }

    byId(id) {
        return Promise.resolve(this._data[id]);
    }

    insert(carsInLot) {
        const record = {
            id: this._counter,
            carsInLot,
            capacity: this._capacity
        };

        this._counter += 1;
        this._data.push(record);

        return Promise.resolve(record);
    }
}

export default new DummyDatabase();