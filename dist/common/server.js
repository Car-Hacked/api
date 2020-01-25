"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var path = _interopRequireWildcard(require("path"));

var bodyParser = _interopRequireWildcard(require("body-parser"));

var http = _interopRequireWildcard(require("http"));

var os = _interopRequireWildcard(require("os"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _oas = _interopRequireDefault(require("./oas"));

var _logger = _interopRequireDefault(require("./logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _express.default();
const exit = process.exit;

class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use(bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use(bodyParser.text({
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use((0, _cookieParser.default)(process.env.SESSION_SECRET));
    app.use(_express.default.static(`${root}/public`));
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => _logger.default.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    (0, _oas.default)(app, this.routes).then(() => {
      http.createServer(app).listen(port, welcome(port));
    }).catch(e => {
      _logger.default.error(e);

      exit(1);
    });
    return app;
  }

}

exports.default = ExpressServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwb3J0IiwiUE9SVCIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImNhdGNoIiwiZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0QsSUFBckI7O0FBRWUsTUFBTUUsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxRQUE1QixDQUFiO0FBQ0FULElBQUFBLEdBQUcsQ0FBQ1UsR0FBSixDQUFRLFNBQVIsRUFBb0IsR0FBRUosSUFBSyxRQUEzQjtBQUNBTixJQUFBQSxHQUFHLENBQUNXLEdBQUosQ0FBUUMsVUFBVSxDQUFDQyxJQUFYLENBQWdCO0FBQUVDLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFBdEMsS0FBaEIsQ0FBUjtBQUNBaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQ0VDLFVBQVUsQ0FBQ0ssVUFBWCxDQUFzQjtBQUNwQkMsTUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEJKLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFGaEIsS0FBdEIsQ0FERjtBQU1BaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFDLFVBQVUsQ0FBQ08sSUFBWCxDQUFnQjtBQUFFTCxNQUFBQSxLQUFLLEVBQUVYLE9BQU8sQ0FBQ1ksR0FBUixDQUFZQyxhQUFaLElBQTZCO0FBQXRDLEtBQWhCLENBQVI7QUFDQWhCLElBQUFBLEdBQUcsQ0FBQ1csR0FBSixDQUFRLDJCQUFhUixPQUFPLENBQUNZLEdBQVIsQ0FBWUssY0FBekIsQ0FBUjtBQUNBcEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFWLGlCQUFRb0IsTUFBUixDQUFnQixHQUFFZixJQUFLLFNBQXZCLENBQVI7QUFDRDs7QUFFRGdCLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBRCxFQUFTO0FBQ2IsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHdEIsT0FBTyxDQUFDWSxHQUFSLENBQVlXLElBQXBCLEVBQTBCO0FBQzlCLFVBQU1DLE9BQU8sR0FBR0MsQ0FBQyxJQUFJLE1BQ25CQyxnQkFBRUMsSUFBRixDQUNHLHFCQUFvQjNCLE9BQU8sQ0FBQ1ksR0FBUixDQUFZZ0IsUUFBWixJQUNuQixhQUFjLE9BQU1DLEVBQUUsQ0FBQ0MsUUFBSCxFQUFjLGFBQVlMLENBQUUsR0FGcEQsQ0FERjs7QUFNQSxzQkFBSTVCLEdBQUosRUFBUyxLQUFLdUIsTUFBZCxFQUNHVyxJQURILENBQ1EsTUFBTTtBQUNWQyxNQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0JwQyxHQUFsQixFQUF1QndCLE1BQXZCLENBQThCQyxJQUE5QixFQUFvQ0UsT0FBTyxDQUFDRixJQUFELENBQTNDO0FBQ0QsS0FISCxFQUlHWSxLQUpILENBSVNDLENBQUMsSUFBSTtBQUNWVCxzQkFBRVUsS0FBRixDQUFRRCxDQUFSOztBQUNBcEMsTUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSjtBQUNELEtBUEg7QUFTQSxXQUFPRixHQUFQO0FBQ0Q7O0FBdENnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5cbmltcG9ydCBvYXMgZnJvbSAnLi9vYXMnO1xuXG5pbXBvcnQgbCBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGFwcCA9IG5ldyBFeHByZXNzKCk7XG5jb25zdCBleGl0ID0gcHJvY2Vzcy5leGl0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzU2VydmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHBhdGgubm9ybWFsaXplKGAke19fZGlybmFtZX0vLi4vLi5gKTtcbiAgICBhcHAuc2V0KCdhcHBQYXRoJywgYCR7cm9vdH1jbGllbnRgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoXG4gICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICBleHRlbmRlZDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudGV4dCh7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoY29va2llUGFyc2VyKHByb2Nlc3MuZW52LlNFU1NJT05fU0VDUkVUKSk7XG4gICAgYXBwLnVzZShFeHByZXNzLnN0YXRpYyhgJHtyb290fS9wdWJsaWNgKSk7XG4gIH1cblxuICByb3V0ZXIocm91dGVzKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW4ocG9ydCA9IHByb2Nlc3MuZW52LlBPUlQpIHtcbiAgICBjb25zdCB3ZWxjb21lID0gcCA9PiAoKSA9PlxuICAgICAgbC5pbmZvKFxuICAgICAgICBgdXAgYW5kIHJ1bm5pbmcgaW4gJHtwcm9jZXNzLmVudi5OT0RFX0VOViB8fFxuICAgICAgICAgICdkZXZlbG9wbWVudCd9IEA6ICR7b3MuaG9zdG5hbWUoKX0gb24gcG9ydDogJHtwfX1gXG4gICAgICApO1xuXG4gICAgb2FzKGFwcCwgdGhpcy5yb3V0ZXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGh0dHAuY3JlYXRlU2VydmVyKGFwcCkubGlzdGVuKHBvcnQsIHdlbGNvbWUocG9ydCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgbC5lcnJvcihlKTtcbiAgICAgICAgZXhpdCgxKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufVxuIl19