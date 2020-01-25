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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwb3J0IiwiUE9SVCIsIm1vbmdvb3NlIiwiY29ubmVjdCIsIk1PTkdPX1VTRVIiLCJNT05HT19QQVNTV09SRCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImlvIiwicmVxdWlyZSIsIm9uIiwic29ja2V0IiwidGltZSIsInNldEludGVydmFsIiwiY3VycmVudCIsIkRhdGUiLCJ0b1RpbWVTdHJpbmciLCJlbWl0IiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0QsSUFBckI7O0FBRWUsTUFBTUUsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxRQUE1QixDQUFi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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmltcG9ydCBvYXMgZnJvbSAnLi9vYXMnO1xuXG5pbXBvcnQgbCBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGFwcCA9IG5ldyBFeHByZXNzKCk7XG5jb25zdCBleGl0ID0gcHJvY2Vzcy5leGl0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzU2VydmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHBhdGgubm9ybWFsaXplKGAke19fZGlybmFtZX0vLi4vLi5gKTtcbiAgICBhcHAuc2V0KCdhcHBQYXRoJywgYCR7cm9vdH1jbGllbnRgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoXG4gICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICBleHRlbmRlZDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudGV4dCh7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoY29va2llUGFyc2VyKHByb2Nlc3MuZW52LlNFU1NJT05fU0VDUkVUKSk7XG4gICAgYXBwLnVzZShFeHByZXNzLnN0YXRpYyhgJHtyb290fS9wdWJsaWNgKSk7XG4gIH1cblxuICByb3V0ZXIocm91dGVzKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW4ocG9ydCA9IHByb2Nlc3MuZW52LlBPUlQpIHtcbiAgICBtb25nb29zZS5jb25uZWN0KGBtb25nb2RiK3NydjovLyR7cHJvY2Vzcy5lbnYuTU9OR09fVVNFUn06JHtwcm9jZXNzLmVudi5NT05HT19QQVNTV09SRH1AY2x1c3RlcjAteHAybmQubW9uZ29kYi5uZXQvdGVzdD9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlgLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSwgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlIH0pO1xuICAgIGNvbnN0IHdlbGNvbWUgPSBwID0+ICgpID0+XG4gICAgICBsLmluZm8oXG4gICAgICAgIGB1cCBhbmQgcnVubmluZyBpbiAke3Byb2Nlc3MuZW52Lk5PREVfRU5WIHx8XG4gICAgICAgICAgJ2RldmVsb3BtZW50J30gQDogJHtvcy5ob3N0bmFtZSgpfSBvbiBwb3J0OiAke3B9fWBcbiAgICAgICk7XG5cbiAgICBvYXMoYXBwLCB0aGlzLnJvdXRlcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKS5saXN0ZW4ocG9ydCwgd2VsY29tZShwb3J0KSk7XG4gICAgICAgIGNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcbiAgICAgICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0KSA9PiB7XG4gICAgICAgICAgbGV0IHRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCk7XG4gICAgICAgICAgICBzb2NrZXQuZW1pdChcInRpbWVcIiwgeyB0aW1lOiBjdXJyZW50IH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEVtbWl0ZWQgZXZlbnQgdGltZSBhdCAke2N1cnJlbnR9LmApO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGwuZXJyb3IoZSk7XG4gICAgICAgIGV4aXQoMSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBhcHA7XG4gIH1cbn1cbiJdfQ==