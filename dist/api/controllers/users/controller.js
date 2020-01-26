"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Controller = void 0;

var _users = _interopRequireDefault(require("../../services/users/users.service"));

var _me = _interopRequireDefault(require("../../services/me.service"));

var _AccessToken = _interopRequireDefault(require("../../../common/models/AccessToken"));

var _User = require("../../../common/models/User");

var _logger = _interopRequireDefault(require("../../../common/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Controller {
  create(req, res) {
    _logger.default.info('UsersService.create()');

    if (req.body && req.body.username && req.body.username.length > 20 && req.body.password && req.body.password.length > 20 && req.body.secret && req.body.secret.length > 20) {
      return res.status(422).json({
        error: 'One of the parameters is too long! Keep under 20 characters!',
        code: 'TOO_LONG'
      });
    }

    if (req.body && req.body.username && req.body.password && req.body.secret) {
      const usernameRegex = /^[a-z0-9_]+$/i;

      if (req.body.secret !== 'hackmt-2020') {
        return res.status(401).json({
          error: 'Invalid credentials',
          code: 'NOT_AUTH'
        });
      }

      if (usernameRegex.test(req.body.username)) {
        return _users.default.create(req.body).then(r => {
          if (r.message && r.message.slice(0, 6) === 'E11000') {
            return res.status(409).json({
              error: 'Username already exists!',
              code: 'ALREADY_EXISTS'
            });
          } else if (r instanceof Error) {
            _logger.default.error(r);

            return res.status(500).json({
              error: 'An internal server error occured!',
              code: 'INTERNAL'
            });
          }

          return res.status(201).json(r);
        });
      }

      return res.status(422).json({
        error: 'Username is invalid! Only alphanumeric characters and unserscore allowed!',
        code: 'INVALID_USERNAME'
      });
    }

    return res.status(422).json({
      error: 'Missing required parameter.',
      code: 'INVALID_PARAMS'
    });
  }

  async remove(req, res) {
    _logger.default.info(`UsersService.remove(${req.body.id})`);

    if (req.body && req.body.id) {
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

        if (result._id.toString() !== req.body.id) {
          let error = new Error(`User does not have access to delete user with id: ${req.body.id}`);
          error.error = `User does not have access to delete user with id: ${req.body.id}`;
          error.code = 'FORBIDDEN';
          return res.status(403).json(error);
        }

        let secondResult = await _User.User.remove({
          _id: result._id
        }).catch(error => error);

        if (secondResult instanceof Error) {
          if ('code' in secondResult && secondResult.code === 'NOT_EXIST') {
            return res.status(404).json({
              error: secondResult.error,
              code: secondResult.code
            });
          }

          _logger.default.error(result);

          return res.status(500).json({
            error: 'An internal server error occured!',
            code: 'INTERNAL'
          });
        }

        await _AccessToken.default.deleteOne({
          user: copy._id
        });
        let response = {
          message: `User with id of ${copy._id} and all associated data successfully removed!`,
          code: 'REMOVED'
        };
        return res.status(200).json(response);
      }

      return res.status(401).json({
        error: 'Missing required header accessToken.',
        code: 'NOT_AUTH'
      });
    }

    return res.status(422).json({
      error: 'Missing required parameter.',
      code: 'INVALID_PARAMS'
    });
  }

  async update(req, res) {
    _logger.default.info('UsersService.update()');

    const usernameRegex = /^[a-z0-9_]+$/i;

    if (req.body && (req.body.username && req.body.username.length > 20 || req.body.password && req.body.password.length > 20)) {
      return res.status(422).json({
        error: 'One of the parameters is too long! Keep under 20 characters!',
        code: 'TOO_LONG'
      });
    }

    if (req.body && (req.body.username || req.body.password)) {
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

        if (req.body.username) {
          if (!usernameRegex.test(req.body.username)) {
            return res.status(422).json({
              error: 'Username is invalid! Only alphanumeric characters and unserscore allowed!',
              code: 'INVALID_USERNAME'
            });
          }

          result.username = req.body.username;
        }

        if (req.body.password) result.password = req.body.password;
        let secondResult = await result.save().catch(error => error);

        if (secondResult instanceof Error) {
          if ('code' in secondResult && secondResult.code === 'NOT_EXIST') {
            return res.status(404).json({
              error: secondResult.error,
              code: secondResult.code
            });
          }

          _logger.default.error(result);

          return res.status(500).json({
            error: 'An internal server error occured!',
            code: 'INTERNAL'
          });
        }

        if (secondResult instanceof Error) {
          return secondResult;
        }

        let copy = secondResult.toObject();
        delete copy.password;
        return res.status(200).json(copy);
      }

      return res.status(401).json({
        error: 'Missing required header accessToken.',
        code: 'NOT_AUTH'
      });
    }

    return res.status(422).json({
      error: 'Missing required parameter.',
      code: 'INVALID_PARAMS'
    });
  }

}

exports.Controller = Controller;

var _default = new Controller();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvdXNlcnMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJDb250cm9sbGVyIiwiY3JlYXRlIiwicmVxIiwicmVzIiwibCIsImluZm8iLCJib2R5IiwidXNlcm5hbWUiLCJsZW5ndGgiLCJwYXNzd29yZCIsInNlY3JldCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImNvZGUiLCJ1c2VybmFtZVJlZ2V4IiwidGVzdCIsIlVzZXJzU2VydmljZSIsInRoZW4iLCJyIiwibWVzc2FnZSIsInNsaWNlIiwiRXJyb3IiLCJyZW1vdmUiLCJpZCIsImhlYWRlcnMiLCJhY2Nlc3N0b2tlbiIsImNvb2tpZXMiLCJyZXN1bHQiLCJNZVNlcnZpY2UiLCJtZSIsImNvcHkiLCJ0b09iamVjdCIsIl9pZCIsInRvU3RyaW5nIiwic2Vjb25kUmVzdWx0IiwiVXNlciIsImNhdGNoIiwiVG9rZW4iLCJkZWxldGVPbmUiLCJ1c2VyIiwicmVzcG9uc2UiLCJ1cGRhdGUiLCJzYXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxNQUFNQSxVQUFOLENBQWlCO0FBRXBCQyxFQUFBQSxNQUFNLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXO0FBQ2JDLG9CQUFFQyxJQUFGLENBQU8sdUJBQVA7O0FBQ0EsUUFBSUgsR0FBRyxDQUFDSSxJQUFKLElBQ0VKLEdBQUcsQ0FBQ0ksSUFBSixDQUFTQyxRQUFULElBQXFCTCxHQUFHLENBQUNJLElBQUosQ0FBU0MsUUFBVCxDQUFrQkMsTUFBbEIsR0FBMkIsRUFBakQsSUFDSU4sR0FBRyxDQUFDSSxJQUFKLENBQVNHLFFBQVQsSUFBcUJQLEdBQUcsQ0FBQ0ksSUFBSixDQUFTRyxRQUFULENBQWtCRCxNQUFsQixHQUEyQixFQURwRCxJQUM0RE4sR0FBRyxDQUFDSSxJQUFKLENBQVNJLE1BQVQsSUFBbUJSLEdBQUcsQ0FBQ0ksSUFBSixD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S0FBdEI7QUFBNkJDLGNBQUFBLElBQUksRUFBRXFCLFlBQVksQ0FBQ3JCO0FBQWhELGFBRkgsQ0FBUDtBQUdIOztBQUNEViwwQkFBRVMsS0FBRixDQUFRZSxNQUFSOztBQUNBLGlCQUFPekIsR0FBRyxDQUNMUSxNQURFLENBQ0ssR0FETCxFQUVGQyxJQUZFLENBRUc7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLG1DQUFUO0FBQThDQyxZQUFBQSxJQUFJLEVBQUU7QUFBcEQsV0FGSCxDQUFQO0FBR0g7O0FBQ0QsWUFBSXFCLFlBQVksWUFBWWIsS0FBNUIsRUFBbUM7QUFDL0IsaUJBQU9hLFlBQVA7QUFDSDs7QUFDRCxZQUFJSixJQUFJLEdBQUdJLFlBQVksQ0FBQ0gsUUFBYixFQUFYO0FBQ0EsZUFBT0QsSUFBSSxDQUFDdEIsUUFBWjtBQUNBLGVBQU9OLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCbUIsSUFBckIsQ0FBUDtBQUNIOztBQUNELGFBQU81QixHQUFHLENBQ0xRLE1BREUsQ0FDSyxHQURMLEVBRUZDLElBRkUsQ0FFRztBQUFFQyxRQUFBQSxLQUFLLEVBQUUsc0NBQVQ7QUFBaURDLFFBQUFBLElBQUksRUFBRTtBQUF2RCxPQUZILENBQVA7QUFHSDs7QUFDRCxXQUFPWCxHQUFHLENBQ0xRLE1BREUsQ0FDSyxHQURMLEVBRUZDLElBRkUsQ0FFRztBQUFFQyxNQUFBQSxLQUFLLEVBQUUsNkJBQVQ7QUFBd0NDLE1BQUFBLElBQUksRUFBRTtBQUE5QyxLQUZILENBQVA7QUFHSDs7QUEzSm1COzs7O2VBNkpULElBQUlkLFVBQUosRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2Vyc1NlcnZpY2UgZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlcnMvdXNlcnMuc2VydmljZSc7XG5pbXBvcnQgTWVTZXJ2aWNlIGZyb20gJy4uLy4uL3NlcnZpY2VzL21lLnNlcnZpY2UnO1xuaW1wb3J0IFRva2VuIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvQWNjZXNzVG9rZW4nO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvVXNlcic7XG5pbXBvcnQgbCBmcm9tICcuLi8uLi8uLi9jb21tb24vbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xuXG4gICAgY3JlYXRlKHJlcSwgcmVzKSB7XG4gICAgICAgIGwuaW5mbygnVXNlcnNTZXJ2aWNlLmNyZWF0ZSgpJyk7XG4gICAgICAgIGlmIChyZXEuYm9keSAmJlxuICAgICAgICAgICAgKChyZXEuYm9keS51c2VybmFtZSAmJiByZXEuYm9keS51c2VybmFtZS5sZW5ndGggPiAyMCkgJiZcbiAgICAgICAgICAgICAgICAocmVxLmJvZHkucGFzc3dvcmQgJiYgcmVxLmJvZHkucGFzc3dvcmQubGVuZ3RoID4gMjApICYmIChyZXEuYm9keS5zZWNyZXQgJiYgcmVxLmJvZHkuc2VjcmV0Lmxlbmd0aCA+IDIwKSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAuc3RhdHVzKDQyMilcbiAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiAnT25lIG9mIHRoZSBwYXJhbWV0ZXJzIGlzIHRvbyBsb25nISBLZWVwIHVuZGVyIDIwIGNoYXJhY3RlcnMhJywgY29kZTogJ1RPT19MT05HJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxLmJvZHkgJiZcbiAgICAgICAgICAgIHJlcS5ib2R5LnVzZXJuYW1lICYmXG4gICAgICAgICAgICByZXEuYm9keS5wYXNzd29yZCAmJlxuICAgICAgICAgICAgcmVxLmJvZHkuc2VjcmV0KSB7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZVJlZ2V4ID0gL15bYS16MC05X10rJC9pO1xuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnNlY3JldCAhPT0gJ2hhY2ttdC0yMDIwJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAgICAgICAgICAgICAgIC5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJywgY29kZTogJ05PVF9BVVRIJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1c2VybmFtZVJlZ2V4LnRlc3QocmVxLmJvZHkudXNlcm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFVzZXJzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlKHJlcS5ib2R5KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLm1lc3NhZ2UgJiYgKHIubWVzc2FnZS5zbGljZSgwLCA2KSA9PT0gJ0UxMTAwMCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDQwOSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ1VzZXJuYW1lIGFscmVhZHkgZXhpc3RzIScsIGNvZGU6ICdBTFJFQURZX0VYSVNUUycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuZXJyb3Iocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ0FuIGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIScsIGNvZGU6ICdJTlRFUk5BTCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXR1cygyMDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpzb24ocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgIC5zdGF0dXMoNDIyKVxuICAgICAgICAgICAgICAgIC5qc29uKHsgZXJyb3I6ICdVc2VybmFtZSBpcyBpbnZhbGlkISBPbmx5IGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIGFuZCB1bnNlcnNjb3JlIGFsbG93ZWQhJywgY29kZTogJ0lOVkFMSURfVVNFUk5BTUUnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoNDIyKVxuICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyLicsIGNvZGU6ICdJTlZBTElEX1BBUkFNUycgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVtb3ZlKHJlcSwgcmVzKSB7XG4gICAgICAgIGwuaW5mbyhgVXNlcnNTZXJ2aWNlLnJlbW92ZSgke3JlcS5ib2R5LmlkfSlgKTtcbiAgICAgICAgaWYgKHJlcS5ib2R5ICYmIHJlcS5ib2R5LmlkKSB7XG4gICAgICAgICAgICBpZiAocmVxLmhlYWRlcnMuYWNjZXNzdG9rZW4gfHwgcmVxLmNvb2tpZXMuYWNjZXNzdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgTWVTZXJ2aWNlLm1lKHJlcSwgcmVzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IgJiYgJ2NvZGUnIGluIHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PT0gJ05PVF9BVVRIJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGwuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiAnQW4gaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQhJywgY29kZTogJ0lOVEVSTkFMJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNvcHkgPSByZXN1bHQudG9PYmplY3QoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgY29weS5wYXNzd29yZDtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Ll9pZC50b1N0cmluZygpICE9PSByZXEuYm9keS5pZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoYFVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHVzZXIgd2l0aCBpZDogJHtyZXEuYm9keS5pZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXJyb3IgPSBgVXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdXNlciB3aXRoIGlkOiAke3JlcS5ib2R5LmlkfWA7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmNvZGUgPSAnRk9SQklEREVOJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZFJlc3VsdCA9IGF3YWl0IFVzZXJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSh7IF9pZDogcmVzdWx0Ll9pZCB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRSZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NvZGUnIGluIHNlY29uZFJlc3VsdCAmJiBzZWNvbmRSZXN1bHQuY29kZSA9PT0gJ05PVF9FWElTVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDQwNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiBzZWNvbmRSZXN1bHQuZXJyb3IsIGNvZGU6IHNlY29uZFJlc3VsdC5jb2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGwuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiAnQW4gaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQhJywgY29kZTogJ0lOVEVSTkFMJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXdhaXQgVG9rZW4uZGVsZXRlT25lKHsgdXNlcjogY29weS5faWQgfSk7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0geyBtZXNzYWdlOiBgVXNlciB3aXRoIGlkIG9mICR7Y29weS5faWR9IGFuZCBhbGwgYXNzb2NpYXRlZCBkYXRhIHN1Y2Nlc3NmdWxseSByZW1vdmVkIWAsIGNvZGU6ICdSRU1PVkVEJyB9O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgaGVhZGVyIGFjY2Vzc1Rva2VuLicsIGNvZGU6ICdOT1RfQVVUSCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cyg0MjIpXG4gICAgICAgICAgICAuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIuJywgY29kZTogJ0lOVkFMSURfUEFSQU1TJyB9KTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGUocmVxLCByZXMpIHtcbiAgICAgICAgbC5pbmZvKCdVc2Vyc1NlcnZpY2UudXBkYXRlKCknKTtcbiAgICAgICAgY29uc3QgdXNlcm5hbWVSZWdleCA9IC9eW2EtejAtOV9dKyQvaTtcbiAgICAgICAgaWYgKHJlcS5ib2R5ICYmXG4gICAgICAgICAgICAoKHJlcS5ib2R5LnVzZXJuYW1lICYmIHJlcS5ib2R5LnVzZXJuYW1lLmxlbmd0aCA+IDIwKSB8fFxuICAgICAgICAgICAgICAgIChyZXEuYm9keS5wYXNzd29yZCAmJiByZXEuYm9keS5wYXNzd29yZC5sZW5ndGggPiAyMCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgLnN0YXR1cyg0MjIpXG4gICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ09uZSBvZiB0aGUgcGFyYW1ldGVycyBpcyB0b28gbG9uZyEgS2VlcCB1bmRlciAyMCBjaGFyYWN0ZXJzIScsIGNvZGU6ICdUT09fTE9ORycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcS5ib2R5ICYmIChyZXEuYm9keS51c2VybmFtZSB8fCByZXEuYm9keS5wYXNzd29yZCkpIHtcbiAgICAgICAgICAgIGlmIChyZXEuaGVhZGVycy5hY2Nlc3N0b2tlbiB8fCByZXEuY29va2llcy5hY2Nlc3N0b2tlbikge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBNZVNlcnZpY2UubWUocmVxLCByZXMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvciAmJiAnY29kZScgaW4gcmVzdWx0ICYmIHJlc3VsdC5jb2RlID09PSAnTk9UX0FVVEgnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbC5lcnJvcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qc29uKHsgZXJyb3I6ICdBbiBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCEnLCBjb2RlOiAnSU5URVJOQUwnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VybmFtZVJlZ2V4LnRlc3QocmVxLmJvZHkudXNlcm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXR1cyg0MjIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ1VzZXJuYW1lIGlzIGludmFsaWQhIE9ubHkgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgYW5kIHVuc2Vyc2NvcmUgYWxsb3dlZCEnLCBjb2RlOiAnSU5WQUxJRF9VU0VSTkFNRScgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVzZXJuYW1lID0gcmVxLmJvZHkudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXEuYm9keS5wYXNzd29yZCkgcmVzdWx0LnBhc3N3b3JkID0gcmVxLmJvZHkucGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZFJlc3VsdCA9IGF3YWl0IHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAuc2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZFJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnY29kZScgaW4gc2Vjb25kUmVzdWx0ICYmIHNlY29uZFJlc3VsdC5jb2RlID09PSAnTk9UX0VYSVNUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGF0dXMoNDA0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qc29uKHsgZXJyb3I6IHNlY29uZFJlc3VsdC5lcnJvciwgY29kZTogc2Vjb25kUmVzdWx0LmNvZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbC5lcnJvcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qc29uKHsgZXJyb3I6ICdBbiBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCEnLCBjb2RlOiAnSU5URVJOQUwnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kUmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY29uZFJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNvcHkgPSBzZWNvbmRSZXN1bHQudG9PYmplY3QoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgY29weS5wYXNzd29yZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oY29weSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgaGVhZGVyIGFjY2Vzc1Rva2VuLicsIGNvZGU6ICdOT1RfQVVUSCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cyg0MjIpXG4gICAgICAgICAgICAuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIuJywgY29kZTogJ0lOVkFMSURfUEFSQU1TJyB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgQ29udHJvbGxlcigpO1xuIl19