"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Controller = void 0;

var _me = _interopRequireDefault(require("../services/me.service"));

var _logger = _interopRequireDefault(require("../../common/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Controller {
  async me(req, res) {
    if (req.headers.accesstoken || req.cookies.accesstoken) {
      let result = await _me.default.me(req, res);

      if (result instanceof Error && 'code' in result && result.code === 'NOT_AUTH') {
        return res.status(401).json(result);
      } else if (result instanceof Error) {
        _logger.default.error(result);

        return res.status(500).json({
          error: 'An internal server error occured!',
          code: 'INTERNAL'
        });
      }

      let copy = result.toObject();
      delete copy.password;
      return res.status(200).json(copy);
    }

    return res.status(401).json({
      error: 'Missing required header accessToken.',
      code: 'NOT_AUTH'
    });
  }

}

exports.Controller = Controller;

var _default = new Controller();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvbWUuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsIm1lIiwicmVxIiwicmVzIiwiaGVhZGVycyIsImFjY2Vzc3Rva2VuIiwiY29va2llcyIsInJlc3VsdCIsIk1lU2VydmljZSIsIkVycm9yIiwiY29kZSIsInN0YXR1cyIsImpzb24iLCJsIiwiZXJyb3IiLCJjb3B5IiwidG9PYmplY3QiLCJwYXNzd29yZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRU8sTUFBTUEsVUFBTixDQUFpQjtBQUNwQixRQUFNQyxFQUFOLENBQVNDLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjtBQUNmLFFBQUlELEdBQUcsQ0FBQ0UsT0FBSixDQUFZQyxXQUFaLElBQTJCSCxHQUFHLENBQUNJLE9BQUosQ0FBWUQsV0FBM0MsRUFBd0Q7QUFDcEQsVUFBSUUsTUFBTSxHQUFHLE1BQU1DLFlBQVVQLEVBQVYsQ0FBYUMsR0FBYixFQUFrQkMsR0FBbEIsQ0FBbkI7O0FBQ0EsVUFBSUksTUFBTSxZQUFZRSxLQUFsQixJQUEyQixVQUFVRixNQUFyQyxJQUErQ0EsTUFBTSxDQUFDRyxJQUFQLEtBQWdCLFVBQW5FLEVBQStFO0FBQzNFLGVBQU9QLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCTCxNQUFyQixDQUFQO0FBQ0gsT0FGRCxNQUVPLElBQUlBLE1BQU0sWUFBWUUsS0FBdEIsRUFBNkI7QUFDaENJLHdCQUFFQyxLQUFGLENBQVFQLE1BQVI7O0FBQ0EsZUFBT0osR0FBRyxDQUNMUSxNQURFLENBQ0ssR0FETCxFQUVGQyxJQUZFLENBRUc7QUFBRUUsVUFBQUEsS0FBSyxFQUFFLG1DQUFUO0FBQThDSixVQUFBQSxJQUFJLEVBQUU7QUFBcEQsU0FGSCxDQUFQO0FBR0g7O0FBQ0QsVUFBSUssSUFBSSxHQUFHUixNQUFNLENBQUNTLFFBQVAsRUFBWDtBQUNBLGFBQU9ELElBQUksQ0FBQ0UsUUFBWjtBQUNBLGFBQU9kLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCRyxJQUFyQixDQUFQO0FBQ0g7O0FBQ0QsV0FBT1osR0FBRyxDQUNMUSxNQURFLENBQ0ssR0FETCxFQUVGQyxJQUZFLENBRUc7QUFBRUUsTUFBQUEsS0FBSyxFQUFFLHNDQUFUO0FBQWlESixNQUFBQSxJQUFJLEVBQUU7QUFBdkQsS0FGSCxDQUFQO0FBR0g7O0FBbkJtQjs7OztlQXFCVCxJQUFJVixVQUFKLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWVTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL21lLnNlcnZpY2UnO1xuaW1wb3J0IGwgZnJvbSAnLi4vLi4vY29tbW9uL2xvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgICBhc3luYyBtZShyZXEsIHJlcykge1xuICAgICAgICBpZiAocmVxLmhlYWRlcnMuYWNjZXNzdG9rZW4gfHwgcmVxLmNvb2tpZXMuYWNjZXNzdG9rZW4pIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBNZVNlcnZpY2UubWUocmVxLCByZXMpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yICYmICdjb2RlJyBpbiByZXN1bHQgJiYgcmVzdWx0LmNvZGUgPT09ICdOT1RfQVVUSCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24ocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsLmVycm9yKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ0FuIGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIScsIGNvZGU6ICdJTlRFUk5BTCcgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY29weSA9IHJlc3VsdC50b09iamVjdCgpO1xuICAgICAgICAgICAgZGVsZXRlIGNvcHkucGFzc3dvcmQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oY29weSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAgICAgICAuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBoZWFkZXIgYWNjZXNzVG9rZW4uJywgY29kZTogJ05PVF9BVVRIJyB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgQ29udHJvbGxlcigpOyJdfQ==