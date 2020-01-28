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

var _default = express.Router().post('/', _controller.default.create).patch('/', _controller.default.update).delete('/:id', _controller.default.delete).get('/', _controller.default.all).get('/:id', _controller.default.byId);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvY29udHJvbGxlcnMvZ2FyYWdlL3JvdXRlci5qcyJdLCJuYW1lcyI6WyJleHByZXNzIiwiUm91dGVyIiwicG9zdCIsImNvbnRyb2xsZXIiLCJjcmVhdGUiLCJwYXRjaCIsInVwZGF0ZSIsImRlbGV0ZSIsImdldCIsImFsbCIsImJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7ZUFFZUEsT0FBTyxDQUNqQkMsTUFEVSxHQUVWQyxJQUZVLENBRUwsR0FGSyxFQUVBQyxvQkFBV0MsTUFGWCxFQUdWQyxLQUhVLENBR0osR0FISSxFQUdDRixvQkFBV0csTUFIWixFQUlWQyxNQUpVLENBSUgsTUFKRyxFQUlLSixvQkFBV0ksTUFKaEIsRUFLVkMsR0FMVSxDQUtOLEdBTE0sRUFLREwsb0JBQVdNLEdBTFYsRUFNVkQsR0FOVSxDQU1OLE1BTk0sRUFNRUwsb0JBQVdPLElBTmIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBleHByZXNzXG4gICAgLlJvdXRlcigpXG4gICAgLnBvc3QoJy8nLCBjb250cm9sbGVyLmNyZWF0ZSlcbiAgICAucGF0Y2goJy8nLCBjb250cm9sbGVyLnVwZGF0ZSlcbiAgICAuZGVsZXRlKCcvOmlkJywgY29udHJvbGxlci5kZWxldGUpXG4gICAgLmdldCgnLycsIGNvbnRyb2xsZXIuYWxsKVxuICAgIC5nZXQoJy86aWQnLCBjb250cm9sbGVyLmJ5SWQpOyJdfQ==