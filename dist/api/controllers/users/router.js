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

var _default = express.Router().post('/', _controller.default.create).delete('/', _controller.default.remove).patch('/', _controller.default.update);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvdXNlcnMvcm91dGVyLmpzIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJSb3V0ZXIiLCJwb3N0IiwiY29udHJvbGxlciIsImNyZWF0ZSIsImRlbGV0ZSIsInJlbW92ZSIsInBhdGNoIiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O2VBRWVBLE9BQU8sQ0FDakJDLE1BRFUsR0FFVkMsSUFGVSxDQUVMLEdBRkssRUFFQUMsb0JBQVdDLE1BRlgsRUFHVkMsTUFIVSxDQUdILEdBSEcsRUFHRUYsb0JBQVdHLE1BSGIsRUFJVkMsS0FKVSxDQUlKLEdBSkksRUFJQ0osb0JBQVdLLE1BSlosQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBleHByZXNzXG4gICAgLlJvdXRlcigpXG4gICAgLnBvc3QoJy8nLCBjb250cm9sbGVyLmNyZWF0ZSlcbiAgICAuZGVsZXRlKCcvJywgY29udHJvbGxlci5yZW1vdmUpXG4gICAgLnBhdGNoKCcvJywgY29udHJvbGxlci51cGRhdGUpO1xuIl19