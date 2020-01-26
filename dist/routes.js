"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _router = _interopRequireDefault(require("./api/controllers/garage/router"));

var _login = _interopRequireDefault(require("./api/controllers/login"));

var _router2 = _interopRequireDefault(require("./api/controllers/users/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {
  app.use('/api/v1/garages', _router.default);
  app.post('/api/v1/login', _login.default.login);
  app.use('/api/v1/users', _router2.default);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9yb3V0ZXMuanMiXSwibmFtZXMiOlsicm91dGVzIiwiYXBwIiwidXNlIiwiZ2FyYWdlc1JvdXRlciIsInBvc3QiLCJMb2dpbkNvbnRyb2xsZXIiLCJsb2dpbiIsIlVzZXJzQ29udHJvbGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRWUsU0FBU0EsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDbENBLEVBQUFBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLGlCQUFSLEVBQTJCQyxlQUEzQjtBQUNBRixFQUFBQSxHQUFHLENBQUNHLElBQUosQ0FBUyxlQUFULEVBQTBCQyxlQUFnQkMsS0FBMUM7QUFDQUwsRUFBQUEsR0FBRyxDQUFDQyxHQUFKLENBQVEsZUFBUixFQUF5QkssZ0JBQXpCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FyYWdlc1JvdXRlciBmcm9tICcuL2FwaS9jb250cm9sbGVycy9nYXJhZ2Uvcm91dGVyJztcbmltcG9ydCBMb2dpbkNvbnRyb2xsZXIgZnJvbSAnLi9hcGkvY29udHJvbGxlcnMvbG9naW4nO1xuaW1wb3J0IFVzZXJzQ29udHJvbGxlciBmcm9tICcuL2FwaS9jb250cm9sbGVycy91c2Vycy9yb3V0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoYXBwKSB7XG4gIGFwcC51c2UoJy9hcGkvdjEvZ2FyYWdlcycsIGdhcmFnZXNSb3V0ZXIpO1xuICBhcHAucG9zdCgnL2FwaS92MS9sb2dpbicsIExvZ2luQ29udHJvbGxlci5sb2dpbik7XG4gIGFwcC51c2UoJy9hcGkvdjEvdXNlcnMnLCBVc2Vyc0NvbnRyb2xsZXIpO1xufVxuIl19