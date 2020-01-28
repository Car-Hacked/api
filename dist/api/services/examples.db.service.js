"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ExamplesDatabase {
  constructor() {
    this._data = [];
    this._counter = 0;
    this.insert('example 0');
    this.insert('example 1');
  }

  all() {
    return Promise.resolve(this._data);
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  insert(name) {
    const record = {
      id: this._counter,
      name
    };
    this._counter += 1;

    this._data.push(record);

    return Promise.resolve(record);
  }

}

var _default = new ExamplesDatabase();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvZXhhbXBsZXMuZGIuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJFeGFtcGxlc0RhdGFiYXNlIiwiY29uc3RydWN0b3IiLCJfZGF0YSIsIl9jb3VudGVyIiwiaW5zZXJ0IiwiYWxsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJieUlkIiwiaWQiLCJuYW1lIiwicmVjb3JkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3JCQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFFQSxTQUFLQyxNQUFMLENBQVksV0FBWjtBQUNBLFNBQUtBLE1BQUwsQ0FBWSxXQUFaO0FBQ0Q7O0FBRURDLEVBQUFBLEdBQUcsR0FBRztBQUNKLFdBQU9DLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixLQUFLTCxLQUFyQixDQUFQO0FBQ0Q7O0FBRURNLEVBQUFBLElBQUksQ0FBQ0MsRUFBRCxFQUFLO0FBQ1AsV0FBT0gsT0FBTyxDQUFDQyxPQUFSLENBQWdCLEtBQUtMLEtBQUwsQ0FBV08sRUFBWCxDQUFoQixDQUFQO0FBQ0Q7O0FBRURMLEVBQUFBLE1BQU0sQ0FBQ00sSUFBRCxFQUFPO0FBQ1gsVUFBTUMsTUFBTSxHQUFHO0FBQ2JGLE1BQUFBLEVBQUUsRUFBRSxLQUFLTixRQURJO0FBRWJPLE1BQUFBO0FBRmEsS0FBZjtBQUtBLFNBQUtQLFFBQUwsSUFBaUIsQ0FBakI7O0FBQ0EsU0FBS0QsS0FBTCxDQUFXVSxJQUFYLENBQWdCRCxNQUFoQjs7QUFFQSxXQUFPTCxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JJLE1BQWhCLENBQVA7QUFDRDs7QUEzQm9COztlQThCUixJQUFJWCxnQkFBSixFIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRXhhbXBsZXNEYXRhYmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcblxuICAgIHRoaXMuaW5zZXJ0KCdleGFtcGxlIDAnKTtcbiAgICB0aGlzLmluc2VydCgnZXhhbXBsZSAxJyk7XG4gIH1cblxuICBhbGwoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9kYXRhKTtcbiAgfVxuXG4gIGJ5SWQoaWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2RhdGFbaWRdKTtcbiAgfVxuXG4gIGluc2VydChuYW1lKSB7XG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgaWQ6IHRoaXMuX2NvdW50ZXIsXG4gICAgICBuYW1lLFxuICAgIH07XG5cbiAgICB0aGlzLl9jb3VudGVyICs9IDE7XG4gICAgdGhpcy5fZGF0YS5wdXNoKHJlY29yZCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlY29yZCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEV4YW1wbGVzRGF0YWJhc2UoKTtcbiJdfQ==