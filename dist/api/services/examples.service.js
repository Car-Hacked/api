"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../common/logger"));

var _examplesDb = _interopRequireDefault(require("./examples.db.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExamplesService {
  all() {
    _logger.default.info(`${this.constructor.name}.all()`);

    return _examplesDb.default.all();
  }

  byId(id) {
    _logger.default.info(`${this.constructor.name}.byId(${id})`);

    return _examplesDb.default.byId(id);
  }

  create(name) {
    return _examplesDb.default.insert(name);
  }

}

var _default = new ExamplesService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvZXhhbXBsZXMuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJFeGFtcGxlc1NlcnZpY2UiLCJhbGwiLCJsIiwiaW5mbyIsImNvbnN0cnVjdG9yIiwibmFtZSIsImRiIiwiYnlJZCIsImlkIiwiY3JlYXRlIiwiaW5zZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxlQUFOLENBQXNCO0FBQ3BCQyxFQUFBQSxHQUFHLEdBQUc7QUFDSkMsb0JBQUVDLElBQUYsQ0FBUSxHQUFFLEtBQUtDLFdBQUwsQ0FBaUJDLElBQUssUUFBaEM7O0FBQ0EsV0FBT0Msb0JBQUdMLEdBQUgsRUFBUDtBQUNEOztBQUVETSxFQUFBQSxJQUFJLENBQUNDLEVBQUQsRUFBSztBQUNQTixvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxTQUFRRyxFQUFHLEdBQTNDOztBQUNBLFdBQU9GLG9CQUFHQyxJQUFILENBQVFDLEVBQVIsQ0FBUDtBQUNEOztBQUVEQyxFQUFBQSxNQUFNLENBQUNKLElBQUQsRUFBTztBQUNYLFdBQU9DLG9CQUFHSSxNQUFILENBQVVMLElBQVYsQ0FBUDtBQUNEOztBQWJtQjs7ZUFnQlAsSUFBSUwsZUFBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGwgZnJvbSAnLi4vLi4vY29tbW9uL2xvZ2dlcic7XG5pbXBvcnQgZGIgZnJvbSAnLi9leGFtcGxlcy5kYi5zZXJ2aWNlJztcblxuY2xhc3MgRXhhbXBsZXNTZXJ2aWNlIHtcbiAgYWxsKCkge1xuICAgIGwuaW5mbyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LmFsbCgpYCk7XG4gICAgcmV0dXJuIGRiLmFsbCgpO1xuICB9XG5cbiAgYnlJZChpZCkge1xuICAgIGwuaW5mbyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LmJ5SWQoJHtpZH0pYCk7XG4gICAgcmV0dXJuIGRiLmJ5SWQoaWQpO1xuICB9XG5cbiAgY3JlYXRlKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuaW5zZXJ0KG5hbWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBFeGFtcGxlc1NlcnZpY2UoKTtcbiJdfQ==