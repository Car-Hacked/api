"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _logger = _interopRequireDefault(require("../../common/logger"));

var _User = require("../../common/models/User");

var _AccessToken = _interopRequireDefault(require("../../common/models/AccessToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoginService {
  async login(req, res) {
    _logger.default.info(`${this.constructor.name}.login()`);

    let user = await _User.User.authenticate(req.body.username, req.body.password).catch(err => {
      if (err.message && err.message.slice(0, 6) === 'E11000') {
        let error = new Error();
        error.error = 'You are still logged in! Log out!';
        error.code = 'LOGGED_IN';
        return error;
      }

      _logger.default.error(err);

      return err;
    });

    if (user && !(user instanceof Error)) {
      const tokenNum = (0, _v.default)();
      const tokenData = {
        token: tokenNum,
        user: user._id
      };
      let token = await _AccessToken.default.create(tokenData).catch(error => error);

      if (token && !(token instanceof Error)) {
        token.user = user;
        res.cookie('accesstoken', tokenNum, {
          maxAge: 36000 * 1000,
          httpOnly: true
        });
        let clone = token.toObject(); // Some fun es6 spoofing to put accessToken at the top of our
        // response. It is the star of the show, after all. We want
        // people to know that they need a header named accessToken.

        clone = Object.assign({
          accessToken: clone.token
        }, clone);
        delete clone.token;
        delete clone.user.password;
        return clone;
      }
    }

    if (user instanceof Error) return user;
    let error = new Error();
    error.error = 'User not found!';
    error.code = 'NO_USER';
    return error;
  }

}

var _default = new LoginService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvbG9naW4uc2VydmljZS5qcyJdLCJuYW1lcyI6WyJMb2dpblNlcnZpY2UiLCJsb2dpbiIsInJlcSIsInJlcyIsImwiLCJpbmZvIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidXNlciIsIlVzZXIiLCJhdXRoZW50aWNhdGUiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImNhdGNoIiwiZXJyIiwibWVzc2FnZSIsInNsaWNlIiwiZXJyb3IiLCJFcnJvciIsImNvZGUiLCJ0b2tlbk51bSIsInRva2VuRGF0YSIsInRva2VuIiwiX2lkIiwiVG9rZW4iLCJjcmVhdGUiLCJjb29raWUiLCJtYXhBZ2UiLCJodHRwT25seSIsImNsb25lIiwidG9PYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iLCJhY2Nlc3NUb2tlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsWUFBTixDQUFtQjtBQUNmLFFBQU1DLEtBQU4sQ0FBWUMsR0FBWixFQUFpQkMsR0FBakIsRUFBc0I7QUFDbEJDLG9CQUFFQyxJQUFGLENBQVEsR0FBRSxLQUFLQyxXQUFMLENBQWlCQyxJQUFLLFVBQWhDOztBQUNBLFFBQUlDLElBQUksR0FBRyxNQUFNQyxXQUFLQyxZQUFMLENBQWtCUixHQUFHLENBQUNTLElBQUosQ0FBU0MsUUFBM0IsRUFBcUNWLEdBQUcsQ0FBQ1MsSUFBSixDQUFTRSxRQUE5QyxFQUNaQyxLQURZLENBQ05DLEdBQUcsSUFBSTtBQUNWLFVBQUlBLEdBQUcsQ0FBQ0MsT0FBSixJQUFnQkQsR0FBRyxDQUFDQyxPQUFKLENBQVlDLEtBQVosQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsTUFBNEIsUUFBaEQsRUFBMkQ7QUFDdkQsWUFBSUMsS0FBSyxHQUFHLElBQUlDLEtBQUosRUFBWjtBQUNBRCxRQUFBQSxLQUFLLENBQUNBLEtBQU4sR0FBYyxtQ0FBZDtBQUNBQSxRQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSxXQUFiO0FBQ0EsZUFBT0YsS0FBUDtBQUNIOztBQUNEZCxzQkFBRWMsS0FBRixDQUFRSCxHQUFSOztBQUNBLGFBQU9BLEdBQVA7QUFDSCxLQVZZLENBQWpCOztBQVdBLFFBQUlQLElBQUksSUFBSSxFQUFFQSxJQUFJLFlBQVlXLEtBQWxCLENBQVosRUFBc0M7QUFDbEMsWUFBTUUsUUFBUSxHQUFHLGlCQUFqQjtBQUNBLFlBQU1DLFNBQVMsR0FBRztBQUFFQyxRQUFBQSxLQUFLLEVBQUVGLFFBQVQ7QUFBbUJiLFFBQUFBLElBQUksRUFBRUEsSUFBSSxDQUFDZ0I7QUFBOUIsT0FBbEI7QUFDQSxVQUFJRCxLQUFLLEdBQUcsTUFBTUUscUJBQU1DLE1BQU4sQ0FBYUosU0FBYixFQUF3QlIsS0FBeEIsQ0FBOEJJLEtBQUssSUFBSUEsS0FBdkMsQ0FBbEI7O0FBQ0EsVUFBSUssS0FBSyxJQUFJLEVBQUVBLEtBQUssWUFBWUosS0FBbkIsQ0FBYixFQUF3QztBQUNwQ0ksUUFBQUEsS0FBSyxDQUFDZixJQUFOLEdBQWFBLElBQWI7QUFDQUwsUUFBQUEsR0FBRyxDQUFDd0IsTUFBSixDQUFXLGFBQVgsRUFBMEJOLFFBQTFCLEVBQW9DO0FBQUVPLFVBQUFBLE1BQU0sRUFBRyxRQUFRLElBQW5CO0FBQTBCQyxVQUFBQSxRQUFRLEVBQUU7QUFBcEMsU0FBcEM7QUFDQSxZQUFJQyxLQUFLLEdBQUdQLEtBQUssQ0FBQ1EsUUFBTixFQUFaLENBSG9DLENBSXBDO0FBQ0E7QUFDQTs7QUFDQUQsUUFBQUEsS0FBSyxHQUFHRSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFFQyxVQUFBQSxXQUFXLEVBQUVKLEtBQUssQ0FBQ1A7QUFBckIsU0FBZCxFQUE0Q08sS0FBNUMsQ0FBUjtBQUNBLGVBQU9BLEtBQUssQ0FBQ1AsS0FBYjtBQUNBLGVBQU9PLEtBQUssQ0FBQ3RCLElBQU4sQ0FBV0ssUUFBbEI7QUFDQSxlQUFPaUIsS0FBUDtBQUNIO0FBQ0o7O0FBQ0QsUUFBSXRCLElBQUksWUFBWVcsS0FBcEIsRUFBMkIsT0FBT1gsSUFBUDtBQUMzQixRQUFJVSxLQUFLLEdBQUcsSUFBSUMsS0FBSixFQUFaO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0EsS0FBTixHQUFjLGlCQUFkO0FBQ0FBLElBQUFBLEtBQUssQ0FBQ0UsSUFBTixHQUFhLFNBQWI7QUFDQSxXQUFPRixLQUFQO0FBQ0g7O0FBcENjOztlQXVDSixJQUFJbEIsWUFBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgbCBmcm9tICcuLi8uLi9jb21tb24vbG9nZ2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWxzL1VzZXInO1xuaW1wb3J0IFRva2VuIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbHMvQWNjZXNzVG9rZW4nO1xuXG5jbGFzcyBMb2dpblNlcnZpY2Uge1xuICAgIGFzeW5jIGxvZ2luKHJlcSwgcmVzKSB7XG4gICAgICAgIGwuaW5mbyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LmxvZ2luKClgKTtcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmF1dGhlbnRpY2F0ZShyZXEuYm9keS51c2VybmFtZSwgcmVxLmJvZHkucGFzc3dvcmQpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgJiYgKGVyci5tZXNzYWdlLnNsaWNlKDAsIDYpID09PSAnRTExMDAwJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmVycm9yID0gJ1lvdSBhcmUgc3RpbGwgbG9nZ2VkIGluISBMb2cgb3V0ISc7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmNvZGUgPSAnTE9HR0VEX0lOJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAodXNlciAmJiAhKHVzZXIgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuTnVtID0gdXVpZCgpO1xuICAgICAgICAgICAgY29uc3QgdG9rZW5EYXRhID0geyB0b2tlbjogdG9rZW5OdW0sIHVzZXI6IHVzZXIuX2lkIH07XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSBhd2FpdCBUb2tlbi5jcmVhdGUodG9rZW5EYXRhKS5jYXRjaChlcnJvciA9PiBlcnJvcik7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgISh0b2tlbiBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgICAgIHRva2VuLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgIHJlcy5jb29raWUoJ2FjY2Vzc3Rva2VuJywgdG9rZW5OdW0sIHsgbWF4QWdlOiAoMzYwMDAgKiAxMDAwKSwgaHR0cE9ubHk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGNsb25lID0gdG9rZW4udG9PYmplY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBTb21lIGZ1biBlczYgc3Bvb2ZpbmcgdG8gcHV0IGFjY2Vzc1Rva2VuIGF0IHRoZSB0b3Agb2Ygb3VyXG4gICAgICAgICAgICAgICAgLy8gcmVzcG9uc2UuIEl0IGlzIHRoZSBzdGFyIG9mIHRoZSBzaG93LCBhZnRlciBhbGwuIFdlIHdhbnRcbiAgICAgICAgICAgICAgICAvLyBwZW9wbGUgdG8ga25vdyB0aGF0IHRoZXkgbmVlZCBhIGhlYWRlciBuYW1lZCBhY2Nlc3NUb2tlbi5cbiAgICAgICAgICAgICAgICBjbG9uZSA9IE9iamVjdC5hc3NpZ24oeyBhY2Nlc3NUb2tlbjogY2xvbmUudG9rZW4gfSwgY2xvbmUpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBjbG9uZS50b2tlbjtcbiAgICAgICAgICAgICAgICBkZWxldGUgY2xvbmUudXNlci5wYXNzd29yZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHVzZXI7XG4gICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcigpO1xuICAgICAgICBlcnJvci5lcnJvciA9ICdVc2VyIG5vdCBmb3VuZCEnO1xuICAgICAgICBlcnJvci5jb2RlID0gJ05PX1VTRVInO1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9naW5TZXJ2aWNlKCk7XG4iXX0=