"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

// eslint-disable-next-line no-unused-vars, no-shadow
function errorHandler(err, req, res, next) {
  const errors = err.errors || [{
    message: err.message
  }];
  res.status(err.status || 500).json({
    errors
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvbWlkZGxld2FyZXMvZXJyb3IuaGFuZGxlci5qcyJdLCJuYW1lcyI6WyJlcnJvckhhbmRsZXIiLCJlcnIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZXJyb3JzIiwibWVzc2FnZSIsInN0YXR1cyIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNlLFNBQVNBLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCQyxHQUEzQixFQUFnQ0MsR0FBaEMsRUFBcUNDLElBQXJDLEVBQTJDO0FBQ3hELFFBQU1DLE1BQU0sR0FBR0osR0FBRyxDQUFDSSxNQUFKLElBQWMsQ0FBQztBQUFFQyxJQUFBQSxPQUFPLEVBQUVMLEdBQUcsQ0FBQ0s7QUFBZixHQUFELENBQTdCO0FBQ0FILEVBQUFBLEdBQUcsQ0FBQ0ksTUFBSixDQUFXTixHQUFHLENBQUNNLE1BQUosSUFBYyxHQUF6QixFQUE4QkMsSUFBOUIsQ0FBbUM7QUFBRUgsSUFBQUE7QUFBRixHQUFuQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzLCBuby1zaGFkb3dcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIGNvbnN0IGVycm9ycyA9IGVyci5lcnJvcnMgfHwgW3sgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfV07XG4gIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApLmpzb24oeyBlcnJvcnMgfSk7XG59XG4iXX0=