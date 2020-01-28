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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwb3J0IiwiUE9SVCIsIm1vbmdvb3NlIiwiY29ubmVjdCIsIk1PTkdPX1VTRVIiLCJNT05HT19QQVNTV09SRCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImlvIiwicmVxdWlyZSIsImdsb2JhbCIsIm9uIiwic29ja2V0IiwidGltZSIsInNldEludGVydmFsIiwiY3VycmVudCIsIkRhdGUiLCJ0b1RpbWVTdHJpbmciLCJlbWl0IiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0QsSUFBckI7O0FBRWUsTUFBTUUsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxR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QUFELENBQUo7QUFDRCxLQWhCSDtBQWtCQSxXQUFPRixHQUFQO0FBQ0Q7O0FBaERnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5pbXBvcnQgb2FzIGZyb20gJy4vb2FzJztcblxuaW1wb3J0IGwgZnJvbSAnLi9sb2dnZXInO1xuXG5jb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuY29uc3QgZXhpdCA9IHByb2Nlc3MuZXhpdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc1NlcnZlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHJvb3QgPSBwYXRoLm5vcm1hbGl6ZShgJHtfX2Rpcm5hbWV9Ly4uLy4uYCk7XG4gICAgYXBwLnNldCgnYXBwUGF0aCcsIGAke3Jvb3R9Y2xpZW50YCk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKFxuICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgICAgIGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicsXG4gICAgICB9KVxuICAgICk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnRleHQoeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKGNvb2tpZVBhcnNlcihwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCkpO1xuICAgIGFwcC51c2UoRXhwcmVzcy5zdGF0aWMoYCR7cm9vdH0vcHVibGljYCkpO1xuICB9XG5cbiAgcm91dGVyKHJvdXRlcykge1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuKHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUKSB7XG4gICAgbW9uZ29vc2UuY29ubmVjdChgbW9uZ29kYitzcnY6Ly8ke3Byb2Nlc3MuZW52Lk1PTkdPX1VTRVJ9OiR7cHJvY2Vzcy5lbnYuTU9OR09fUEFTU1dPUkR9QGNsdXN0ZXIwLXhwMm5kLm1vbmdvZGIubmV0L3Rlc3Q/cmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5YCwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUsIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZSB9KTtcbiAgICBjb25zdCB3ZWxjb21lID0gcCA9PiAoKSA9PlxuICAgICAgbC5pbmZvKFxuICAgICAgICBgdXAgYW5kIHJ1bm5pbmcgaW4gJHtwcm9jZXNzLmVudi5OT0RFX0VOViB8fFxuICAgICAgICAgICdkZXZlbG9wbWVudCd9IEA6ICR7b3MuaG9zdG5hbWUoKX0gb24gcG9ydDogJHtwfX1gXG4gICAgICApO1xuXG4gICAgb2FzKGFwcCwgdGhpcy5yb3V0ZXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCkubGlzdGVuKHBvcnQsIHdlbGNvbWUocG9ydCkpO1xuICAgICAgICBjb25zdCBpbyA9IHJlcXVpcmUoJ3NvY2tldC5pbycpKHNlcnZlcik7XG4gICAgICAgIGdsb2JhbC5pbyA9IGlvO1xuICAgICAgICBpby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgICAgICAgICBsZXQgdGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbmV3IERhdGUoKS50b1RpbWVTdHJpbmcoKTtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KFwidGltZVwiLCB7IHRpbWU6IGN1cnJlbnQgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRW1taXRlZCBldmVudCB0aW1lIGF0ICR7Y3VycmVudH0uYCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgbC5lcnJvcihlKTtcbiAgICAgICAgZXhpdCgxKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufVxuIl19