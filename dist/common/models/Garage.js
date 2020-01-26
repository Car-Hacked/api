"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GarageSchema = new _mongoose.default.Schema({
  garageNumber: {
    type: Number,
    default: 0,
    required: true
  },
  carsInLot: {
    type: Number,
    default: 0,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
GarageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.constructor.countDocuments({}).then(res => {
      this.garageNumber = res + 1; // Increment count

      next();
    });
  } else {
    io.emit("updated", {
      _id: this._id,
      carsInLot: this.carsInLot
    });
    next();
  }
});
module.exports.Garage = _mongoose.default.model('Garage', GarageSchema);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9jb21tb24vbW9kZWxzL0dhcmFnZS5qcyJdLCJuYW1lcyI6WyJHYXJhZ2VTY2hlbWEiLCJtb25nb29zZSIsIlNjaGVtYSIsImdhcmFnZU51bWJlciIsInR5cGUiLCJOdW1iZXIiLCJkZWZhdWx0IiwicmVxdWlyZWQiLCJjYXJzSW5Mb3QiLCJjYXBhY2l0eSIsInRpbWVzdGFtcHMiLCJwcmUiLCJuZXh0IiwiaXNOZXciLCJjb25zdHJ1Y3RvciIsImNvdW50RG9jdW1lbnRzIiwidGhlbiIsInJlcyIsImlvIiwiZW1pdCIsIl9pZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJHYXJhZ2UiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUVBLE1BQU1BLFlBQVksR0FBRyxJQUFJQyxrQkFBU0MsTUFBYixDQUFvQjtBQUNyQ0MsRUFBQUEsWUFBWSxFQUFFO0FBQ1ZDLElBQUFBLElBQUksRUFBRUMsTUFESTtBQUVWQyxJQUFBQSxPQUFPLEVBQUUsQ0FGQztBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQSxHQUR1QjtBQU1yQ0MsRUFBQUEsU0FBUyxFQUFFO0FBQ1BKLElBQUFBLElBQUksRUFBRUMsTUFEQztBQUVQQyxJQUFBQSxPQUFPLEVBQUUsQ0FGRjtBQUdQQyxJQUFBQSxRQUFRLEVBQUU7QUFISCxHQU4wQjtBQVdyQ0UsRUFBQUEsUUFBUSxFQUFFO0FBQ05MLElBQUFBLElBQUksRUFBRUMsTUFEQTtBQUVORSxJQUFBQSxRQUFRLEVBQUU7QUFGSjtBQVgyQixDQUFwQixFQWVsQjtBQUFFRyxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQWZrQixDQUFyQjtBQWlCQVYsWUFBWSxDQUFDVyxHQUFiLENBQWlCLE1BQWpCLEVBQXlCLFVBQVNDLElBQVQsRUFBZTtBQUNwQyxNQUFJLEtBQUtDLEtBQVQsRUFBZ0I7QUFDWixTQUFLQyxXQUFMLENBQWlCQyxjQUFqQixDQUFnQyxFQUFoQyxFQUFvQ0MsSUFBcEMsQ0FBeUNDLEdBQUcsSUFBSTtBQUM1QyxXQUFLZCxZQUFMLEdBQW9CYyxHQUFHLEdBQUcsQ0FBMUIsQ0FENEMsQ0FDZjs7QUFDN0JMLE1BQUFBLElBQUk7QUFDUCxLQUhEO0FBSUgsR0FMRCxNQUtPO0FBQ0hNLElBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRLFNBQVIsRUFBbUI7QUFBRUMsTUFBQUEsR0FBRyxFQUFFLEtBQUtBLEdBQVo7QUFBaUJaLE1BQUFBLFNBQVMsRUFBRSxLQUFLQTtBQUFqQyxLQUFuQjtBQUNBSSxJQUFBQSxJQUFJO0FBQ1A7QUFDSixDQVZEO0FBWUFTLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxNQUFmLEdBQXdCdEIsa0JBQVN1QixLQUFULENBQWUsUUFBZixFQUF5QnhCLFlBQXpCLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuY29uc3QgR2FyYWdlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgZ2FyYWdlTnVtYmVyOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGNhcnNJbkxvdDoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBjYXBhY2l0eToge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pO1xuXG5HYXJhZ2VTY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24obmV4dCkge1xuICAgIGlmICh0aGlzLmlzTmV3KSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuY291bnREb2N1bWVudHMoe30pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FyYWdlTnVtYmVyID0gcmVzICsgMTsgLy8gSW5jcmVtZW50IGNvdW50XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlvLmVtaXQoXCJ1cGRhdGVkXCIsIHsgX2lkOiB0aGlzLl9pZCwgY2Fyc0luTG90OiB0aGlzLmNhcnNJbkxvdCB9KTtcbiAgICAgICAgbmV4dCgpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cy5HYXJhZ2UgPSBtb25nb29zZS5tb2RlbCgnR2FyYWdlJywgR2FyYWdlU2NoZW1hKTsiXX0=