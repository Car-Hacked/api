"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pino = _interopRequireDefault(require("pino"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const l = (0, _pino.default)({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL
});
var _default = l;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vbG9nZ2VyLmpzIl0sIm5hbWVzIjpbImwiLCJuYW1lIiwicHJvY2VzcyIsImVudiIsIkFQUF9JRCIsImxldmVsIiwiTE9HX0xFVkVMIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxNQUFNQSxDQUFDLEdBQUcsbUJBQUs7QUFDYkMsRUFBQUEsSUFBSSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsTUFETDtBQUViQyxFQUFBQSxLQUFLLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRztBQUZOLENBQUwsQ0FBVjtlQUtlTixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBpbm8gZnJvbSAncGlubyc7XG5cbmNvbnN0IGwgPSBwaW5vKHtcbiAgbmFtZTogcHJvY2Vzcy5lbnYuQVBQX0lELFxuICBsZXZlbDogcHJvY2Vzcy5lbnYuTE9HX0xFVkVMLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGw7XG4iXX0=