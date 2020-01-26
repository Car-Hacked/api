"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../common/logger"));

var _User = require("../../common/models/User");

var _AccessToken = _interopRequireDefault(require("../../common/models/AccessToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MeService {
  async me(req, res) {
    _logger.default.info(`${this.constructor.name}.me()`);

    if (req.headers.accesstoken || req.cookies.accesstoken) {
      let token = await _AccessToken.default.findOne({
        token: req.headers.accesstoken || req.cookies.accesstoken
      }).catch(err => {
        let error = new Error();
        error.error = 'Token not valid! Log in User!';
        error.code = 'NOT_AUTH';
        return error;
      });

      if (!token) {
        let error = new Error();
        error.error = 'Token not valid! Log in User!';
        error.code = 'NOT_AUTH';
        return error;
      }

      let user = await _User.User.findOne({
        _id: token.user
      }).catch(error => error);

      if (user && !(user instanceof Error)) {
        user = await user.populate('currentDay').execPopulate().catch(error => error);
        return user;
      }

      let error = new Error();
      error.error = 'An uknown error occurred';
      error.code = 'UKNOWN_ERROR';
      return error;
    }

    let error = new Error();
    error.error = 'Token not valid! Log in User!';
    error.code = 'NOT_AUTH';
    return error;
  }

}

var _default = new MeService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvbWUuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJNZVNlcnZpY2UiLCJtZSIsInJlcSIsInJlcyIsImwiLCJpbmZvIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiaGVhZGVycyIsImFjY2Vzc3Rva2VuIiwiY29va2llcyIsInRva2VuIiwiVG9rZW4iLCJmaW5kT25lIiwiY2F0Y2giLCJlcnIiLCJlcnJvciIsIkVycm9yIiwiY29kZSIsInVzZXIiLCJVc2VyIiwiX2lkIiwicG9wdWxhdGUiLCJleGVjUG9wdWxhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFNBQU4sQ0FBZ0I7QUFDWixRQUFNQyxFQUFOLENBQVNDLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjtBQUNmQyxvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxPQUFoQzs7QUFDQSxRQUFJTCxHQUFHLENBQUNNLE9BQUosQ0FBWUMsV0FBWixJQUEyQlAsR0FBRyxDQUFDUSxPQUFKLENBQVlELFdBQTNDLEVBQXdEO0FBQ3BELFVBQUlFLEtBQUssR0FBRyxNQUFNQyxxQkFDYkMsT0FEYSxDQUNMO0FBQUVGLFFBQUFBLEtBQUssRUFBRVQsR0FBRyxDQUFDTSxPQUFKLENBQVlDLFdBQVosSUFBMkJQLEdBQUcsQ0FBQ1EsT0FBSixDQUFZRDtBQUFoRCxPQURLLEVBQzBESyxLQUQxRCxDQUNnRUMsR0FBRyxJQUFJO0FBQ2pGLFlBQUlDLEtBQUssR0FBRyxJQUFJQyxLQUFKLEVBQVo7QUFDQUQsUUFBQUEsS0FBSyxDQUFDQSxLQUFOLEdBQWMsK0JBQWQ7QUFDQUEsUUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsVUFBYjtBQUNBLGVBQU9GLEtBQVA7QUFDSCxPQU5hLENBQWxCOztBQU9BLFVBQUksQ0FBQ0wsS0FBTCxFQUFZO0FBQ1IsWUFBSUssS0FBSyxHQUFHLElBQUlDLEtBQUosRUFBWjtBQUNBRCxRQUFBQSxLQUFLLENBQUNBLEtBQU4sR0FBYywrQkFBZDtBQUNBQSxRQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSxVQUFiO0FBQ0EsZUFBT0YsS0FBUDtBQUNIOztBQUNELFVBQUlHLElBQUksR0FBRyxNQUFNQyxXQUFLUCxPQUFMLENBQWE7QUFBRVEsUUFBQUEsR0FBRyxFQUFFVixLQUFLLENBQUNRO0FBQWIsT0FBYixFQUFrQ0wsS0FBbEMsQ0FBd0NFLEtBQUssSUFBSUEsS0FBakQsQ0FBakI7O0FBQ0EsVUFBSUcsSUFBSSxJQUFJLEVBQUVBLElBQUksWUFBWUYsS0FBbEIsQ0FBWixFQUFzQztBQUNsQ0UsUUFBQUEsSUFBSSxHQUFHLE1BQU1BLElBQUksQ0FDWkcsUUFEUSxDQUNDLFlBREQsRUFFUkMsWUFGUSxHQUVPVCxLQUZQLENBRWFFLEtBQUssSUFBSUEsS0FGdEIsQ0FBYjtBQUdBLGVBQU9HLElBQVA7QUFDSDs7QUFDRCxVQUFJSCxLQUFLLEdBQUcsSUFBSUMsS0FBSixFQUFaO0FBQ0FELE1BQUFBLEtBQUssQ0FBQ0EsS0FBTixHQUFjLDBCQUFkO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQ0UsSUFBTixHQUFhLGNBQWI7QUFDQSxhQUFPRixLQUFQO0FBQ0g7O0FBQ0QsUUFBSUEsS0FBSyxHQUFHLElBQUlDLEtBQUosRUFBWjtBQUNBRCxJQUFBQSxLQUFLLENBQUNBLEtBQU4sR0FBYywrQkFBZDtBQUNBQSxJQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSxVQUFiO0FBQ0EsV0FBT0YsS0FBUDtBQUNIOztBQWpDVzs7ZUFvQ0QsSUFBSWhCLFNBQUosRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsIGZyb20gJy4uLy4uL2NvbW1vbi9sb2dnZXInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbHMvVXNlcic7XG5pbXBvcnQgVG9rZW4gZnJvbSAnLi4vLi4vY29tbW9uL21vZGVscy9BY2Nlc3NUb2tlbic7XG5cbmNsYXNzIE1lU2VydmljZSB7XG4gICAgYXN5bmMgbWUocmVxLCByZXMpIHtcbiAgICAgICAgbC5pbmZvKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0ubWUoKWApO1xuICAgICAgICBpZiAocmVxLmhlYWRlcnMuYWNjZXNzdG9rZW4gfHwgcmVxLmNvb2tpZXMuYWNjZXNzdG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IGF3YWl0IFRva2VuXG4gICAgICAgICAgICAgICAgLmZpbmRPbmUoeyB0b2tlbjogcmVxLmhlYWRlcnMuYWNjZXNzdG9rZW4gfHwgcmVxLmNvb2tpZXMuYWNjZXNzdG9rZW4gfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmVycm9yID0gJ1Rva2VuIG5vdCB2YWxpZCEgTG9nIGluIFVzZXIhJztcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuY29kZSA9ICdOT1RfQVVUSCc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBlcnJvci5lcnJvciA9ICdUb2tlbiBub3QgdmFsaWQhIExvZyBpbiBVc2VyISc7XG4gICAgICAgICAgICAgICAgZXJyb3IuY29kZSA9ICdOT1RfQVVUSCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBfaWQ6IHRva2VuLnVzZXIgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xuICAgICAgICAgICAgaWYgKHVzZXIgJiYgISh1c2VyIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IGF3YWl0IHVzZXJcbiAgICAgICAgICAgICAgICAgICAgLnBvcHVsYXRlKCdjdXJyZW50RGF5JylcbiAgICAgICAgICAgICAgICAgICAgLmV4ZWNQb3B1bGF0ZSgpLmNhdGNoKGVycm9yID0+IGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgZXJyb3IuZXJyb3IgPSAnQW4gdWtub3duIGVycm9yIG9jY3VycmVkJztcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSAnVUtOT1dOX0VSUk9SJztcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgZXJyb3IuZXJyb3IgPSAnVG9rZW4gbm90IHZhbGlkISBMb2cgaW4gVXNlciEnO1xuICAgICAgICBlcnJvci5jb2RlID0gJ05PVF9BVVRIJztcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE1lU2VydmljZSgpOyJdfQ==