"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./common/env");

var _server = _interopRequireDefault(require("./common/server"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _server.default().router(_routes.default).listen(process.env.PORT);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJTZXJ2ZXIiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW52IiwiUE9SVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O2VBRWUsSUFBSUEsZUFBSixHQUFhQyxNQUFiLENBQW9CQyxlQUFwQixFQUE0QkMsTUFBNUIsQ0FBbUNDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxJQUEvQyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2NvbW1vbi9lbnYnO1xuaW1wb3J0IFNlcnZlciBmcm9tICcuL2NvbW1vbi9zZXJ2ZXInO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXIoKS5yb3V0ZXIocm91dGVzKS5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCk7XG4iXX0=