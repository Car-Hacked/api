"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oas;

var _express = _interopRequireDefault(require("express"));

var path = _interopRequireWildcard(require("path"));

var _error = _interopRequireDefault(require("../api/middlewares/error.handler"));

var _expressOpenapiValidator = require("express-openapi-validator");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function oas(app, routes) {
  const apiSpec = path.join(__dirname, 'api.yml');
  const validateResponses = !!(process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION && process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true');
  return new _expressOpenapiValidator.OpenApiValidator({
    apiSpec,
    validateResponses
  }).install(app).then(() => {
    app.use(process.env.OPENAPI_SPEC || '/spec', _express.default.static(apiSpec));
    routes(app);
    app.use(_error.default);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vb2FzLmpzIl0sIm5hbWVzIjpbIm9hcyIsImFwcCIsInJvdXRlcyIsImFwaVNwZWMiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInZhbGlkYXRlUmVzcG9uc2VzIiwicHJvY2VzcyIsImVudiIsIk9QRU5BUElfRU5BQkxFX1JFU1BPTlNFX1ZBTElEQVRJT04iLCJ0b0xvd2VyQ2FzZSIsIk9wZW5BcGlWYWxpZGF0b3IiLCJpbnN0YWxsIiwidGhlbiIsInVzZSIsIk9QRU5BUElfU1BFQyIsIkV4cHJlc3MiLCJzdGF0aWMiLCJlcnJvckhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFZSxTQUFTQSxHQUFULENBQWFDLEdBQWIsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3ZDLFFBQU1DLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsU0FBckIsQ0FBaEI7QUFDQSxRQUFNQyxpQkFBaUIsR0FBRyxDQUFDLEVBQ3pCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsa0NBQVosSUFDQUYsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGtDQUFaLENBQStDQyxXQUEvQyxPQUFpRSxNQUZ4QyxDQUEzQjtBQUlBLFNBQU8sSUFBSUMseUNBQUosQ0FBcUI7QUFDMUJULElBQUFBLE9BRDBCO0FBRTFCSSxJQUFBQTtBQUYwQixHQUFyQixFQUlKTSxPQUpJLENBSUlaLEdBSkosRUFLSmEsSUFMSSxDQUtDLE1BQU07QUFDVmIsSUFBQUEsR0FBRyxDQUFDYyxHQUFKLENBQVFQLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTyxZQUFaLElBQTRCLE9BQXBDLEVBQTZDQyxpQkFBUUMsTUFBUixDQUFlZixPQUFmLENBQTdDO0FBQ0FELElBQUFBLE1BQU0sQ0FBQ0QsR0FBRCxDQUFOO0FBQ0FBLElBQUFBLEdBQUcsQ0FBQ2MsR0FBSixDQUFRSSxjQUFSO0FBQ0QsR0FUSSxDQUFQO0FBVUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4uL2FwaS9taWRkbGV3YXJlcy9lcnJvci5oYW5kbGVyJztcbmltcG9ydCB7IE9wZW5BcGlWYWxpZGF0b3IgfSBmcm9tICdleHByZXNzLW9wZW5hcGktdmFsaWRhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2FzKGFwcCwgcm91dGVzKSB7XG4gIGNvbnN0IGFwaVNwZWMgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnYXBpLnltbCcpO1xuICBjb25zdCB2YWxpZGF0ZVJlc3BvbnNlcyA9ICEhKFxuICAgIHByb2Nlc3MuZW52Lk9QRU5BUElfRU5BQkxFX1JFU1BPTlNFX1ZBTElEQVRJT04gJiZcbiAgICBwcm9jZXNzLmVudi5PUEVOQVBJX0VOQUJMRV9SRVNQT05TRV9WQUxJREFUSU9OLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJ1xuICApO1xuICByZXR1cm4gbmV3IE9wZW5BcGlWYWxpZGF0b3Ioe1xuICAgIGFwaVNwZWMsXG4gICAgdmFsaWRhdGVSZXNwb25zZXMsXG4gIH0pXG4gICAgLmluc3RhbGwoYXBwKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGFwcC51c2UocHJvY2Vzcy5lbnYuT1BFTkFQSV9TUEVDIHx8ICcvc3BlYycsIEV4cHJlc3Muc3RhdGljKGFwaVNwZWMpKTtcbiAgICAgIHJvdXRlcyhhcHApO1xuICAgICAgYXBwLnVzZShlcnJvckhhbmRsZXIpO1xuICAgIH0pO1xufVxuIl19