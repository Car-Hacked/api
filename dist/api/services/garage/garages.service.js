"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../../common/logger"));

var _Garage = require("../../../common/models/Garage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GaragesService {
  async all() {
    _logger.default.info(`${this.constructor.name}.all()`);

    return _Garage.Garage.find({}, (e, r) => r).catch(error => error);
  }

  byId(id) {
    _logger.default.info(`${this.constructor.name}.byId(${id})`);

    return _Garage.Garage.findOne({
      _id: id
    }).catch(error => error);
  }

  async create(body) {
    _logger.default.info(`${this.constructor.name}.create()`);

    const garageConfig = {
      carsInLot: body.carsInLot || 0,
      capacity: body.capacity
    };
    const garage = await _Garage.Garage.create(garageConfig).catch(error => error);
    return garage;
  }

  async delete(id) {
    _logger.default.info(`${this.constructor.name}.byId(${id})`);

    const result = await _Garage.Garage.deleteOne({
      _id: id
    }).catch(error => error);

    if (result instanceof Error) {
      return result;
    }

    const response = {
      message: `Garage with id ${id} and all associated data successfully removed!`,
      code: 'REMOVED'
    };
    return response;
  }

}

var _default = new GaragesService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvZ2FyYWdlL2dhcmFnZXMuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJHYXJhZ2VzU2VydmljZSIsImFsbCIsImwiLCJpbmZvIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiR2FyYWdlIiwiZmluZCIsImUiLCJyIiwiY2F0Y2giLCJlcnJvciIsImJ5SWQiLCJpZCIsImZpbmRPbmUiLCJfaWQiLCJjcmVhdGUiLCJib2R5IiwiZ2FyYWdlQ29uZmlnIiwiY2Fyc0luTG90IiwiY2FwYWNpdHkiLCJnYXJhZ2UiLCJkZWxldGUiLCJyZXN1bHQiLCJkZWxldGVPbmUiLCJFcnJvciIsInJlc3BvbnNlIiwibWVzc2FnZSIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLE1BQU1BLGNBQU4sQ0FBcUI7QUFDakIsUUFBTUMsR0FBTixHQUFZO0FBQ1JDLG9CQUFFQyxJQUFGLENBQVEsR0FBRSxLQUFLQyxXQUFMLENBQWlCQyxJQUFLLFFBQWhDOztBQUNBLFdBQU9DLGVBQU9DLElBQVAsQ0FBWSxFQUFaLEVBQWdCLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVQSxDQUExQixFQUE2QkMsS0FBN0IsQ0FBbUNDLEtBQUssSUFBSUEsS0FBNUMsQ0FBUDtBQUNIOztBQUVEQyxFQUFBQSxJQUFJLENBQUNDLEVBQUQsRUFBSztBQUNMWCxvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxTQUFRUSxFQUFHLEdBQTNDOztBQUNBLFdBQU9QLGVBQU9RLE9BQVAsQ0FBZTtBQUFFQyxNQUFBQSxHQUFHLEVBQUVGO0FBQVAsS0FBZixFQUE0QkgsS0FBNUIsQ0FBa0NDLEtBQUssSUFBSUEsS0FBM0MsQ0FBUDtBQUNIOztBQUVELFFBQU1LLE1BQU4sQ0FBYUMsSUFBYixFQUFtQjtBQUNmZixvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxXQUFoQzs7QUFDQSxVQUFNYSxZQUFZLEdBQUc7QUFDakJDLE1BQUFBLFNBQVMsRUFBRUYsSUFBSSxDQUFDRSxTQUFMLElBQWtCLENBRFo7QUFFakJDLE1BQUFBLFFBQVEsRUFBRUgsSUFBSSxDQUFDRztBQUZFLEtBQXJCO0FBSUEsVUFBTUMsTUFBTSxHQUFHLE1BQU1mLGVBQU9VLE1BQVAsQ0FBY0UsWUFBZCxFQUE0QlIsS0FBNUIsQ0FBa0NDLEtBQUssSUFBSUEsS0FBM0MsQ0FBckI7QUFDQSxXQUFPVSxNQUFQO0FBQ0g7O0FBRUQsUUFBTUMsTUFBTixDQUFhVCxFQUFiLEVBQWlCO0FBQ2JYLG9CQUFFQyxJQUFGLENBQVEsR0FBRSxLQUFLQyxXQUFMLENBQWlCQyxJQUFLLFNBQVFRLEVBQUcsR0FBM0M7O0FBQ0EsVUFBTVUsTUFBTSxHQUFHLE1BQU1qQixlQUFPa0IsU0FBUCxDQUFpQjtBQUFFVCxNQUFBQSxHQUFHLEVBQUVGO0FBQVAsS0FBakIsRUFBOEJILEtBQTlCLENBQW9DQyxLQUFLLElBQUlBLEtBQTdDLENBQXJCOztBQUNBLFFBQUlZLE1BQU0sWUFBWUUsS0FBdEIsRUFBNEI7QUFDeEIsYUFBT0YsTUFBUDtBQUNIOztBQUNELFVBQU1HLFFBQVEsR0FBRztBQUFFQyxNQUFBQSxPQUFPLEVBQUcsa0JBQWlCZCxFQUFHLGdEQUFoQztBQUFpRmUsTUFBQUEsSUFBSSxFQUFFO0FBQXZGLEtBQWpCO0FBQ0EsV0FBT0YsUUFBUDtBQUNIOztBQTdCZ0I7O2VBZ0NOLElBQUkxQixjQUFKLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbCBmcm9tICcuLi8uLi8uLi9jb21tb24vbG9nZ2VyJztcbmltcG9ydCB7IEdhcmFnZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvR2FyYWdlJztcblxuY2xhc3MgR2FyYWdlc1NlcnZpY2Uge1xuICAgIGFzeW5jIGFsbCgpIHtcbiAgICAgICAgbC5pbmZvKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0uYWxsKClgKTtcbiAgICAgICAgcmV0dXJuIEdhcmFnZS5maW5kKHt9LCAoZSwgcikgPT4gcikuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xuICAgIH1cblxuICAgIGJ5SWQoaWQpIHtcbiAgICAgICAgbC5pbmZvKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0uYnlJZCgke2lkfSlgKTtcbiAgICAgICAgcmV0dXJuIEdhcmFnZS5maW5kT25lKHsgX2lkOiBpZCB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlKGJvZHkpIHtcbiAgICAgICAgbC5pbmZvKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0uY3JlYXRlKClgKTtcbiAgICAgICAgY29uc3QgZ2FyYWdlQ29uZmlnID0ge1xuICAgICAgICAgICAgY2Fyc0luTG90OiBib2R5LmNhcnNJbkxvdCB8fCAwLFxuICAgICAgICAgICAgY2FwYWNpdHk6IGJvZHkuY2FwYWNpdHlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ2FyYWdlID0gYXdhaXQgR2FyYWdlLmNyZWF0ZShnYXJhZ2VDb25maWcpLmNhdGNoKGVycm9yID0+IGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGdhcmFnZTtcbiAgICB9XG5cbiAgICBhc3luYyBkZWxldGUoaWQpIHtcbiAgICAgICAgbC5pbmZvKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0uYnlJZCgke2lkfSlgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgR2FyYWdlLmRlbGV0ZU9uZSh7IF9pZDogaWQgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogYEdhcmFnZSB3aXRoIGlkICR7aWR9IGFuZCBhbGwgYXNzb2NpYXRlZCBkYXRhIHN1Y2Nlc3NmdWxseSByZW1vdmVkIWAsIGNvZGU6ICdSRU1PVkVEJyB9O1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FyYWdlc1NlcnZpY2UoKTtcbiJdfQ==