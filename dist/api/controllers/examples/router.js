"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var express = _interopRequireWildcard(require("express"));

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = express.Router().post('/', _controller.default.create).get('/', _controller.default.all).get('/:id', _controller.default.byId);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvZXhhbXBsZXMvcm91dGVyLmpzIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJSb3V0ZXIiLCJwb3N0IiwiY29udHJvbGxlciIsImNyZWF0ZSIsImdldCIsImFsbCIsImJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7ZUFFZUEsT0FBTyxDQUNuQkMsTUFEWSxHQUVaQyxJQUZZLENBRVAsR0FGTyxFQUVGQyxvQkFBV0MsTUFGVCxFQUdaQyxHQUhZLENBR1IsR0FIUSxFQUdIRixvQkFBV0csR0FIUixFQUlaRCxHQUpZLENBSVIsTUFKUSxFQUlBRixvQkFBV0ksSUFKWCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cHJlc3NcbiAgLlJvdXRlcigpXG4gIC5wb3N0KCcvJywgY29udHJvbGxlci5jcmVhdGUpXG4gIC5nZXQoJy8nLCBjb250cm9sbGVyLmFsbClcbiAgLmdldCgnLzppZCcsIGNvbnRyb2xsZXIuYnlJZCk7XG4iXX0=