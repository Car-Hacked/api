"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _router = _interopRequireDefault(require("./api/controllers/garage/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {
  app.use('/api/v1/garages', _router.default);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9yb3V0ZXMuanMiXSwibmFtZXMiOlsicm91dGVzIiwiYXBwIiwidXNlIiwiZ2FyYWdlc1JvdXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRWUsU0FBU0EsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDbENBLEVBQUFBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLGlCQUFSLEVBQTJCQyxlQUEzQjtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhcmFnZXNSb3V0ZXIgZnJvbSAnLi9hcGkvY29udHJvbGxlcnMvZ2FyYWdlL3JvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlcyhhcHApIHtcbiAgYXBwLnVzZSgnL2FwaS92MS9nYXJhZ2VzJywgZ2FyYWdlc1JvdXRlcik7XG5cbn1cbiJdfQ==