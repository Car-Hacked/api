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

var _mongoose = _interopRequireDefault(require("mongoose"));

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
    _mongoose.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-xp2nd.mongodb.net/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwb3J0IiwiUE9SVCIsIm1vbmdvb3NlIiwiY29ubmVjdCIsIk1PTkdPX1VTRVIiLCJNT05HT19QQVNTV09SRCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImNhdGNoIiwiZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0QsSUFBckI7O0FBRWUsTUFBTUUsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxRQUE1QixDQUFiO0FBQ0FULElBQUFBLEdBQUcsQ0FBQ1UsR0FBSixDQUFRLFNBQVIsRUFBb0IsR0FBRUosSUFBSyxRQUEzQjtBQUNBTixJQUFBQSxHQUFHLENBQUNXLEdBQUosQ0FBUUMsVUFBVSxDQUFDQyxJQUFYLENBQWdCO0FBQUVDLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFBdEMsS0FBaEIsQ0FBUjtBQUNBaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQ0VDLFVBQVUsQ0FBQ0ssVUFBWCxDQUFzQjtBQUNwQkMsTUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEJKLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFGaEIsS0FBdEIsQ0FERjtBQU1BaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFDLFVBQVUsQ0FBQ08sSUFBWCxDQUFnQjtBQUFFTCxNQUFBQSxLQUFLLEVBQUVYLE9BQU8sQ0FBQ1ksR0FBUixDQUFZQyxhQUFaLElBQTZCO0FBQXRDLEtBQWhCLENBQVI7QUFDQWhCLElBQUFBLEdBQUcsQ0FBQ1csR0FBSixDQUFRLDJCQUFhUixPQUFPLENBQUNZLEdBQVIsQ0FBWUssY0FBekIsQ0FBUjtBQUNBcEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFWLGlCQUFRb0IsTUFBUixDQUFnQixHQUFFZixJQUFLLFNBQXZCLENBQVI7QUFDRDs7QUFFRGdCLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBRCxFQUFTO0FBQ2IsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHdEIsT0FBTyxDQUFDWSxHQUFSLENBQVlXLElBQXBCLEVBQTBCO0FBQzlCQyxzQkFBU0MsT0FBVCxDQUFrQixpQkFBZ0J6QixPQUFPLENBQUNZLEdBQVIsQ0FBWWMsVUFBVyxJQUFHMUIsT0FBTyxDQUFDWSxHQUFSLENBQVllLGNBQWUsOERBQXZGLEVBQXNKO0FBQUVDLE1BQUFBLGVBQWUsRUFBRSxJQUFuQjtBQUF5QkMsTUFBQUEsa0JBQWtCLEVBQUU7QUFBN0MsS0FBdEo7O0FBQ0EsVUFBTUMsT0FBTyxHQUFHQyxDQUFDLElBQUksTUFDbkJDLGdCQUFFQyxJQUFGLENBQ0cscUJBQW9CakMsT0FBTyxDQUFDWSxHQUFSLENBQVlzQixRQUFaLElBQ25CLGFBQWMsT0FBTUMsRUFBRSxDQUFDQyxRQUFILEVBQWMsYUFBWUwsQ0FBRSxHQUZwRCxDQURGOztBQU1BLHNCQUFJbEMsR0FBSixFQUFTLEtBQUt1QixNQUFkLEVBQ0dpQixJQURILENBQ1EsTUFBTTtBQUNWQyxNQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0IxQyxHQUFsQixFQUF1QndCLE1BQXZCLENBQThCQyxJQUE5QixFQUFvQ1EsT0FBTyxDQUFDUixJQUFELENBQTNDO0FBQ0QsS0FISCxFQUlHa0IsS0FKSCxDQUlTQyxDQUFDLElBQUk7QUFDVlQsc0JBQUVVLEtBQUYsQ0FBUUQsQ0FBUjs7QUFDQTFDLE1BQUFBLElBQUksQ0FBQyxDQUFELENBQUo7QUFDRCxLQVBIO0FBU0EsV0FBT0YsR0FBUDtBQUNEOztBQXZDZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IG9hcyBmcm9tICcuL29hcyc7XG5cbmltcG9ydCBsIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IGV4aXQgPSBwcm9jZXNzLmV4aXQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3NTZXJ2ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCByb290ID0gcGF0aC5ub3JtYWxpemUoYCR7X19kaXJuYW1lfS8uLi8uLmApO1xuICAgIGFwcC5zZXQoJ2FwcFBhdGgnLCBgJHtyb290fWNsaWVudGApO1xuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyB9KSk7XG4gICAgYXBwLnVzZShcbiAgICAgIGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7XG4gICAgICAgIGV4dGVuZGVkOiB0cnVlLFxuICAgICAgICBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InLFxuICAgICAgfSlcbiAgICApO1xuICAgIGFwcC51c2UoYm9keVBhcnNlci50ZXh0KHsgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyB9KSk7XG4gICAgYXBwLnVzZShjb29raWVQYXJzZXIocHJvY2Vzcy5lbnYuU0VTU0lPTl9TRUNSRVQpKTtcbiAgICBhcHAudXNlKEV4cHJlc3Muc3RhdGljKGAke3Jvb3R9L3B1YmxpY2ApKTtcbiAgfVxuXG4gIHJvdXRlcihyb3V0ZXMpIHtcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3Rlbihwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCkge1xuICAgIG1vbmdvb3NlLmNvbm5lY3QoYG1vbmdvZGIrc3J2Oi8vJHtwcm9jZXNzLmVudi5NT05HT19VU0VSfToke3Byb2Nlc3MuZW52Lk1PTkdPX1BBU1NXT1JEfUBjbHVzdGVyMC14cDJuZC5tb25nb2RiLm5ldC90ZXN0P3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eWAsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLCB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUgfSk7XG4gICAgY29uc3Qgd2VsY29tZSA9IHAgPT4gKCkgPT5cbiAgICAgIGwuaW5mbyhcbiAgICAgICAgYHVwIGFuZCBydW5uaW5nIGluICR7cHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHxcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnfSBAOiAke29zLmhvc3RuYW1lKCl9IG9uIHBvcnQ6ICR7cH19YFxuICAgICAgKTtcblxuICAgIG9hcyhhcHAsIHRoaXMucm91dGVzKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBodHRwLmNyZWF0ZVNlcnZlcihhcHApLmxpc3Rlbihwb3J0LCB3ZWxjb21lKHBvcnQpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGwuZXJyb3IoZSk7XG4gICAgICAgIGV4aXQoMSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBhcHA7XG4gIH1cbn1cbiJdfQ==