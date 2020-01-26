"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../../common/logger"));

var _User = require("../../../common/models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersService {
  async create(body) {
    _logger.default.info(`${this.constructor.name}.create()`);

    const userData = {
      username: body.username,
      password: body.password
    };
    let result = await _User.User.create(userData).catch(err => {
      if (err.message.slice(0, 6) !== 'E11000') _logger.default.error(err);
      return err;
    });
    if (result instanceof Error) return result;
    let clone = result.toObject();
    delete clone.password;
    return clone;
  }

}

var _default = new UsersService();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvc2VydmljZXMvdXNlcnMvdXNlcnMuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJVc2Vyc1NlcnZpY2UiLCJjcmVhdGUiLCJib2R5IiwibCIsImluZm8iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJ1c2VyRGF0YSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXN1bHQiLCJVc2VyIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwic2xpY2UiLCJlcnJvciIsIkVycm9yIiwiY2xvbmUiLCJ0b09iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsWUFBTixDQUFtQjtBQUNmLFFBQU1DLE1BQU4sQ0FBYUMsSUFBYixFQUFtQjtBQUNmQyxvQkFBRUMsSUFBRixDQUFRLEdBQUUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBSyxXQUFoQzs7QUFDQSxVQUFNQyxRQUFRLEdBQUc7QUFDYkMsTUFBQUEsUUFBUSxFQUFFTixJQUFJLENBQUNNLFFBREY7QUFFYkMsTUFBQUEsUUFBUSxFQUFFUCxJQUFJLENBQUNPO0FBRkYsS0FBakI7QUFJQSxRQUFJQyxNQUFNLEdBQUcsTUFBTUMsV0FBS1YsTUFBTCxDQUFZTSxRQUFaLEVBQ2RLLEtBRGMsQ0FDUkMsR0FBRyxJQUFJO0FBQ1YsVUFBSUEsR0FBRyxDQUFDQyxPQUFKLENBQVlDLEtBQVosQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsTUFBNEIsUUFBaEMsRUFBMENaLGdCQUFFYSxLQUFGLENBQVFILEdBQVI7QUFDMUMsYUFBT0EsR0FBUDtBQUNILEtBSmMsQ0FBbkI7QUFLQSxRQUFJSCxNQUFNLFlBQVlPLEtBQXRCLEVBQTZCLE9BQU9QLE1BQVA7QUFDN0IsUUFBSVEsS0FBSyxHQUFHUixNQUFNLENBQUNTLFFBQVAsRUFBWjtBQUNBLFdBQU9ELEtBQUssQ0FBQ1QsUUFBYjtBQUNBLFdBQU9TLEtBQVA7QUFDSDs7QUFoQmM7O2VBbUJKLElBQUlsQixZQUFKLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbCBmcm9tICcuLi8uLi8uLi9jb21tb24vbG9nZ2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbW9kZWxzL1VzZXInO1xuXG5jbGFzcyBVc2Vyc1NlcnZpY2Uge1xuICAgIGFzeW5jIGNyZWF0ZShib2R5KSB7XG4gICAgICAgIGwuaW5mbyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LmNyZWF0ZSgpYCk7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IGJvZHkudXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogYm9keS5wYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXIuY3JlYXRlKHVzZXJEYXRhKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlLnNsaWNlKDAsIDYpICE9PSAnRTExMDAwJykgbC5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICBsZXQgY2xvbmUgPSByZXN1bHQudG9PYmplY3QoKTtcbiAgICAgICAgZGVsZXRlIGNsb25lLnBhc3N3b3JkO1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlcnNTZXJ2aWNlKCk7Il19