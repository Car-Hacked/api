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
      const server = http.createServer(app).listen(port, welcome(port));

      const io = require('socket.io')(server);

      global.io = io;
      io.on('connection', socket => {
        let time = setInterval(() => {
          let current = new Date().toTimeString();
          socket.emit("time", {
            time: current
          });
          console.log(`Emmited event time at ${current}.`);
        }, 1000);
      });
    }).catch(e => {
      _logger.default.error(e);

      exit(1);
    });
    return app;
  }

}

exports.default = ExpressServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwb3J0IiwiUE9SVCIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImlvIiwicmVxdWlyZSIsImdsb2JhbCIsIm9uIiwic29ja2V0IiwidGltZSIsInNldEludGVydmFsIiwiY3VycmVudCIsIkRhdGUiLCJ0b1RpbWVTdHJpbmciLCJlbWl0IiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0QsSUFBckI7O0FBRWUsTUFBTUUsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxRQUE1QixDQUFiO0FBQ0FULElBQUFBLEdBQUcsQ0FBQ1UsR0FBSixDQUFRLFNBQVIsRUFBb0IsR0FBRUosSUFBSyxRQUEzQjtBQUNBTixJQUFBQSxHQUFHLENBQUNXLEdBQUosQ0FBUUMsVUFBVSxDQUFDQyxJQUFYLENBQWdCO0FBQUVDLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFBdEMsS0FBaEIsQ0FBUjtBQUNBaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQ0VDLFVBQVUsQ0FBQ0ssVUFBWCxDQUFzQjtBQUNwQkMsTUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEJKLE1BQUFBLEtBQUssRUFBRVgsT0FBTyxDQUFDWSxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFGaEIsS0FBdEIsQ0FERjtBQU1BaEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFDLFVBQVUsQ0FBQ08sSUFBWCxDQUFnQjtBQUFFTCxNQUFBQSxLQUFLLEVBQUVYLE9BQU8sQ0FBQ1ksR0FBUixDQUFZQyxhQUFaLElBQTZCO0FBQXRDLEtBQWhCLENBQVI7QUFDQWhCLElBQUFBLEdBQUcsQ0FBQ1csR0FBSixDQUFRLDJCQUFhUixPQUFPLENBQUNZLEdBQVIsQ0FBWUssY0FBekIsQ0FBUjtBQUNBcEIsSUFBQUEsR0FBRyxDQUFDVyxHQUFKLENBQVFWLGlCQUFRb0IsTUFBUixDQUFnQixHQUFFZixJQUFLLFNBQXZCLENBQVI7QUFDRDs7QUFFRGdCLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBRCxFQUFTO0FBQ2IsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHdEIsT0FBTyxDQUFDWSxHQUFSLENBQVlXLElBQXBCLEVBQTBCO0FBQzlCLFVBQU1DLE9BQU8sR0FBR0MsQ0FBQyxJQUFJLE1BQ25CQyxnQkFBRUMsSUFBRixDQUNHLHFCQUFvQjNCLE9BQU8sQ0FBQ1ksR0FBUixDQUFZZ0IsUUFBWixJQUNuQixhQUFjLE9BQU1DLEVBQUUsQ0FBQ0MsUUFBSCxFQUFjLGFBQVlMLENBQUUsR0FGcEQsQ0FERjs7QUFNQSxzQkFBSTVCLEdBQUosRUFBUyxLQUFLdUIsTUFBZCxFQUNHVyxJQURILENBQ1EsTUFBTTtBQUNWLFlBQU1DLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxZQUFMLENBQWtCckMsR0FBbEIsRUFBdUJ3QixNQUF2QixDQUE4QkMsSUFBOUIsRUFBb0NFLE9BQU8sQ0FBQ0YsSUFBRCxDQUEzQyxDQUFmOztBQUNBLFlBQU1hLEVBQUUsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQkosTUFBckIsQ0FBWDs7QUFDQUssTUFBQUEsTUFBTSxDQUFDRixFQUFQLEdBQVlBLEVBQVo7QUFDQUEsTUFBQUEsRUFBRSxDQUFDRyxFQUFILENBQU0sWUFBTixFQUFxQkMsTUFBRCxJQUFZO0FBQzlCLFlBQUlDLElBQUksR0FBR0MsV0FBVyxDQUFDLE1BQU07QUFDM0IsY0FBSUMsT0FBTyxHQUFHLElBQUlDLElBQUosR0FBV0MsWUFBWCxFQUFkO0FBQ0FMLFVBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZLE1BQVosRUFBb0I7QUFBRUwsWUFBQUEsSUFBSSxFQUFFRTtBQUFSLFdBQXBCO0FBQ0FJLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLHlCQUF3QkwsT0FBUSxHQUE3QztBQUNELFNBSnFCLEVBSW5CLElBSm1CLENBQXRCO0FBS0QsT0FORDtBQU9ELEtBWkgsRUFhR00sS0FiSCxDQWFTQyxDQUFDLElBQUk7QUFDVnZCLHNCQUFFd0IsS0FBRixDQUFRRCxDQUFSOztBQUNBbEQsTUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSjtBQUNELEtBaEJIO0FBa0JBLFdBQU9GLEdBQVA7QUFDRDs7QUEvQ2dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcblxuaW1wb3J0IG9hcyBmcm9tICcuL29hcyc7XG5cbmltcG9ydCBsIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IGV4aXQgPSBwcm9jZXNzLmV4aXQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3NTZXJ2ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCByb290ID0gcGF0aC5ub3JtYWxpemUoYCR7X19kaXJuYW1lfS8uLi8uLmApO1xuICAgIGFwcC5zZXQoJ2FwcFBhdGgnLCBgJHtyb290fWNsaWVudGApO1xuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyB9KSk7XG4gICAgYXBwLnVzZShcbiAgICAgIGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7XG4gICAgICAgIGV4dGVuZGVkOiB0cnVlLFxuICAgICAgICBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InLFxuICAgICAgfSlcbiAgICApO1xuICAgIGFwcC51c2UoYm9keVBhcnNlci50ZXh0KHsgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyB9KSk7XG4gICAgYXBwLnVzZShjb29raWVQYXJzZXIocHJvY2Vzcy5lbnYuU0VTU0lPTl9TRUNSRVQpKTtcbiAgICBhcHAudXNlKEV4cHJlc3Muc3RhdGljKGAke3Jvb3R9L3B1YmxpY2ApKTtcbiAgfVxuXG4gIHJvdXRlcihyb3V0ZXMpIHtcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3Rlbihwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCkge1xuICAgIGNvbnN0IHdlbGNvbWUgPSBwID0+ICgpID0+XG4gICAgICBsLmluZm8oXG4gICAgICAgIGB1cCBhbmQgcnVubmluZyBpbiAke3Byb2Nlc3MuZW52Lk5PREVfRU5WIHx8XG4gICAgICAgICAgJ2RldmVsb3BtZW50J30gQDogJHtvcy5ob3N0bmFtZSgpfSBvbiBwb3J0OiAke3B9fWBcbiAgICAgICk7XG5cbiAgICBvYXMoYXBwLCB0aGlzLnJvdXRlcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKS5saXN0ZW4ocG9ydCwgd2VsY29tZShwb3J0KSk7XG4gICAgICAgIGNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcbiAgICAgICAgZ2xvYmFsLmlvID0gaW87XG4gICAgICAgIGlvLm9uKCdjb25uZWN0aW9uJywgKHNvY2tldCkgPT4ge1xuICAgICAgICAgIGxldCB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBuZXcgRGF0ZSgpLnRvVGltZVN0cmluZygpO1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJ0aW1lXCIsIHsgdGltZTogY3VycmVudCB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFbW1pdGVkIGV2ZW50IHRpbWUgYXQgJHtjdXJyZW50fS5gKTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICBsLmVycm9yKGUpO1xuICAgICAgICBleGl0KDEpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gYXBwO1xuICB9XG59XG4iXX0=