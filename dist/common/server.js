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

var _cors = _interopRequireDefault(require("cors"));

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
    app.use((0, _cors.default)());
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

    _mongoose.default.set('useCreateIndex', true);
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT || 3000) {
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
        socket.emit('welcome', {
          welcome: "server connected"
        });

        _logger.default.info(`user connected to socket: ${socket.id}`);
      });
    }).catch(e => {
      _logger.default.error(e);

      exit(1);
    });
    return app;
  }

}

exports.default = ExpressServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJleGl0IiwicHJvY2VzcyIsIkV4cHJlc3NTZXJ2ZXIiLCJjb25zdHJ1Y3RvciIsInJvb3QiLCJwYXRoIiwibm9ybWFsaXplIiwiX19kaXJuYW1lIiwidXNlIiwic2V0IiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJtb25nb29zZSIsInJvdXRlciIsInJvdXRlcyIsImxpc3RlbiIsInBvcnQiLCJQT1JUIiwiY29ubmVjdCIsIk1PTkdPX1VTRVIiLCJNT05HT19QQVNTV09SRCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsIndlbGNvbWUiLCJwIiwibCIsImluZm8iLCJOT0RFX0VOViIsIm9zIiwiaG9zdG5hbWUiLCJ0aGVuIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImlvIiwicmVxdWlyZSIsImdsb2JhbCIsIm9uIiwic29ja2V0IiwiZW1pdCIsImlkIiwiY2F0Y2giLCJlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUFFQSxNQUFNQSxHQUFHLEdBQUcsSUFBSUMsZ0JBQUosRUFBWjtBQUNBLE1BQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDRCxJQUFyQjs7QUFFZSxNQUFNRSxhQUFOLENBQW9CO0FBQ2pDQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixVQUFNQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFnQixHQUFFQyxTQUFVLFFBQTVCLENBQWI7QUFDQVQsSUFBQUEsR0FBRyxDQUFDVSxHQUFKLENBQVEsb0JBQVI7QUFDQVYsSUFB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cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcblxuaW1wb3J0IG9hcyBmcm9tICcuL29hcyc7XG5cbmltcG9ydCBsIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IGV4aXQgPSBwcm9jZXNzLmV4aXQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3NTZXJ2ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCByb290ID0gcGF0aC5ub3JtYWxpemUoYCR7X19kaXJuYW1lfS8uLi8uLmApO1xuICAgIGFwcC51c2UoY29ycygpKTtcbiAgICBhcHAuc2V0KCdhcHBQYXRoJywgYCR7cm9vdH1jbGllbnRgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoXG4gICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICBleHRlbmRlZDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IHByb2Nlc3MuZW52LlJFUVVFU1RfTElNSVQgfHwgJzEwMGtiJyxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudGV4dCh7IGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicgfSkpO1xuICAgIGFwcC51c2UoY29va2llUGFyc2VyKHByb2Nlc3MuZW52LlNFU1NJT05fU0VDUkVUKSk7XG4gICAgYXBwLnVzZShFeHByZXNzLnN0YXRpYyhgJHtyb290fS9wdWJsaWNgKSk7XG4gICAgbW9uZ29vc2Uuc2V0KCd1c2VDcmVhdGVJbmRleCcsIHRydWUpO1xuICB9XG5cbiAgcm91dGVyKHJvdXRlcykge1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuKHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApIHtcbiAgICBtb25nb29zZS5jb25uZWN0KGBtb25nb2RiK3NydjovLyR7cHJvY2Vzcy5lbnYuTU9OR09fVVNFUn06JHtwcm9jZXNzLmVudi5NT05HT19QQVNTV09SRH1AY2x1c3RlcjAteHAybmQubW9uZ29kYi5uZXQvdGVzdD9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlgLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSwgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlIH0pO1xuICAgIGNvbnN0IHdlbGNvbWUgPSBwID0+ICgpID0+XG4gICAgICBsLmluZm8oXG4gICAgICAgIGB1cCBhbmQgcnVubmluZyBpbiAke3Byb2Nlc3MuZW52Lk5PREVfRU5WIHx8XG4gICAgICAgICAgJ2RldmVsb3BtZW50J30gQDogJHtvcy5ob3N0bmFtZSgpfSBvbiBwb3J0OiAke3B9fWBcbiAgICAgICk7XG5cbiAgICBvYXMoYXBwLCB0aGlzLnJvdXRlcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKS5saXN0ZW4ocG9ydCwgd2VsY29tZShwb3J0KSk7XG4gICAgICAgIGNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcbiAgICAgICAgZ2xvYmFsLmlvID0gaW87XG4gICAgICAgIGlvLm9uKCdjb25uZWN0aW9uJywgKHNvY2tldCkgPT4ge1xuICAgICAgICAgIHNvY2tldC5lbWl0KCd3ZWxjb21lJywge1xuICAgICAgICAgICAgd2VsY29tZTogXCJzZXJ2ZXIgY29ubmVjdGVkXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsLmluZm8oYHVzZXIgY29ubmVjdGVkIHRvIHNvY2tldDogJHtzb2NrZXQuaWR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgbC5lcnJvcihlKTtcbiAgICAgICAgZXhpdCgxKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufVxuIl19