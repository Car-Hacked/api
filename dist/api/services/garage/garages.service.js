"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../../common/logger"));

var _dummyDb = _interopRequireDefault(require("./dummy.db.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GaragesService {
  all() {
    _logger.default.info(`${this.constructor.name}.all()`);

    return _dummyDb.default.all();
  }

  byId(id) {
    _logger.default.info(`${this.constructor.name}.byId(${id})`);

    return _dummyDb.default.byId(id);
  }

  create(name) {
    return _dummyDb.default.insert(name);
  }

}

var _default = new GaragesService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvZ2FyYWdlL2dhcmFnZXMuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJHYXJhZ2VzU2VydmljZSIsImFsbCIsImwiLCJpbmZvIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZGIiLCJieUlkIiwiaWQiLCJjcmVhdGUiLCJpbnNlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLE1BQU1BLGNBQU4sQ0FBcUI7QUFDakJDLEVBQUFBLEdBQUcsR0FBRztBQUNGQyxvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxRQUFoQzs7QUFDQSxXQUFPQyxpQkFBR0wsR0FBSCxFQUFQO0FBQ0g7O0FBRURNLEVBQUFBLElBQUksQ0FBQ0MsRUFBRCxFQUFLO0FBQ0xOLG9CQUFFQyxJQUFGLENBQVEsR0FBRSxLQUFLQyxXQUFMLENBQWlCQyxJQUFLLFNBQVFHLEVBQUcsR0FBM0M7O0FBQ0EsV0FBT0YsaUJBQUdDLElBQUgsQ0FBUUMsRUFBUixDQUFQO0FBQ0g7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0osSUFBRCxFQUFPO0FBQ1QsV0FBT0MsaUJBQUdJLE1BQUgsQ0FBVUwsSUFBVixDQUFQO0FBQ0g7O0FBYmdCOztlQWdCTixJQUFJTCxjQUFKLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbCBmcm9tICcuLi8uLi8uLi9jb21tb24vbG9nZ2VyJztcbmltcG9ydCBkYiBmcm9tICcuL2R1bW15LmRiLnNlcnZpY2UnO1xuXG5jbGFzcyBHYXJhZ2VzU2VydmljZSB7XG4gICAgYWxsKCkge1xuICAgICAgICBsLmluZm8oYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfS5hbGwoKWApO1xuICAgICAgICByZXR1cm4gZGIuYWxsKCk7XG4gICAgfVxuXG4gICAgYnlJZChpZCkge1xuICAgICAgICBsLmluZm8oYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfS5ieUlkKCR7aWR9KWApO1xuICAgICAgICByZXR1cm4gZGIuYnlJZChpZCk7XG4gICAgfVxuXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGRiLmluc2VydChuYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHYXJhZ2VzU2VydmljZSgpO1xuIl19