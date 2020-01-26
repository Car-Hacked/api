"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Controller = void 0;

var _login = _interopRequireDefault(require("../services/login.service"));

var _logger = _interopRequireDefault(require("../../common/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Controller {
  async login(req, res) {
    if (req.body && req.body.username && req.body.password) {
      const result = await _login.default.login(req, res).catch(error => error);

      if (result instanceof Error && 'code' in result) {
        switch (result.code) {
          case 'INVALID_CREDS':
            return res.status(401).json(result);

          case 'LOGGED_IN':
            return res.status(422).json(result);

          case 'NO_USER':
            return res.status(404).json(result);

          default:
            return res.status(400).json(result);
        }
      } else if (result instanceof Error) {
        _logger.default.error(result);

        return res.status(500).json({
          error: 'An internal server error occured!',
          code: 'INTERNAL'
        });
      }

      return res.status(201).json(result);
    }

    return res.status(422).json({
      error: 'Missing required parameter.'
    });
  }

}

exports.Controller = Controller;

var _default = new Controller();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvbG9naW4uanMiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsImxvZ2luIiwicmVxIiwicmVzIiwiYm9keSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXN1bHQiLCJMb2dpblNlcnZpY2UiLCJjYXRjaCIsImVycm9yIiwiRXJyb3IiLCJjb2RlIiwic3RhdHVzIiwianNvbiIsImwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVPLE1BQU1BLFVBQU4sQ0FBaUI7QUFDcEIsUUFBTUMsS0FBTixDQUFZQyxHQUFaLEVBQWlCQyxHQUFqQixFQUFzQjtBQUNsQixRQUFJRCxHQUFHLENBQUNFLElBQUosSUFBWUYsR0FBRyxDQUFDRSxJQUFKLENBQVNDLFFBQXJCLElBQ0FILEdBQUcsQ0FBQ0UsSUFBSixDQUFTRSxRQURiLEVBQ3VCO0FBQ25CLFlBQU1DLE1BQU0sR0FBRyxNQUFNQyxlQUFhUCxLQUFiLENBQW1CQyxHQUFuQixFQUF3QkMsR0FBeEIsRUFBNkJNLEtBQTdCLENBQW1DQyxLQUFLLElBQUlBLEtBQTVDLENBQXJCOztBQUNBLFVBQUlILE1BQU0sWUFBWUksS0FBbEIsSUFBMkIsVUFBVUosTUFBekMsRUFBaUQ7QUFDN0MsZ0JBQVFBLE1BQU0sQ0FBQ0ssSUFBZjtBQUNJLGVBQUssZUFBTDtBQUNJLG1CQUFPVCxHQUFHLENBQUNVLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQlAsTUFBckIsQ0FBUDs7QUFDSixlQUFLLFdBQUw7QUFDSSxtQkFBT0osR0FBRyxDQUFDVSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJQLE1BQXJCLENBQVA7O0FBQ0osZUFBSyxTQUFMO0FBQ0ksbUJBQU9KLEdBQUcsQ0FBQ1UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCUCxNQUFyQixDQUFQOztBQUNKO0FBQ0ksbUJBQU9KLEdBQUcsQ0FBQ1UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCUCxNQUFyQixDQUFQO0FBUlI7QUFVSCxPQVhELE1BV08sSUFBSUEsTUFBTSxZQUFZSSxLQUF0QixFQUE2QjtBQUNoQ0ksd0JBQUVMLEtBQUYsQ0FBUUgsTUFBUjs7QUFDQSxlQUFPSixHQUFHLENBQ0xVLE1BREUsQ0FDSyxHQURMLEVBRUZDLElBRkUsQ0FFRztBQUFFSixVQUFBQSxLQUFLLEVBQUUsbUNBQVQ7QUFBOENFLFVBQUFBLElBQUksRUFBRTtBQUFwRCxTQUZILENBQVA7QUFHSDs7QUFDRCxhQUFPVCxHQUFHLENBQUNVLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQlAsTUFBckIsQ0FBUDtBQUNIOztBQUNELFdBQU9KLEdBQUcsQ0FDTFUsTUFERSxDQUNLLEdBREwsRUFFRkMsSUFGRSxDQUVHO0FBQUVKLE1BQUFBLEtBQUssRUFBRTtBQUFULEtBRkgsQ0FBUDtBQUdIOztBQTNCbUI7Ozs7ZUE2QlQsSUFBSVYsVUFBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvZ2luU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9sb2dpbi5zZXJ2aWNlJztcbmltcG9ydCBsIGZyb20gJy4uLy4uL2NvbW1vbi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKHJlcS5ib2R5ICYmIHJlcS5ib2R5LnVzZXJuYW1lICYmXG4gICAgICAgICAgICByZXEuYm9keS5wYXNzd29yZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTG9naW5TZXJ2aWNlLmxvZ2luKHJlcSwgcmVzKS5jYXRjaChlcnJvciA9PiBlcnJvcik7XG4gICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IgJiYgJ2NvZGUnIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSU5WQUxJRF9DUkVEUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTE9HR0VEX0lOJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQyMikuanNvbihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdOT19VU0VSJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIGwuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiAnQW4gaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQhJywgY29kZTogJ0lOVEVSTkFMJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoNDIyKVxuICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyLicgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IENvbnRyb2xsZXIoKTtcbiJdfQ==