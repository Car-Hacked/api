"use strict";

const server = http.createServer().listen(process.env.PORT);

const io = require('socket.io')(server);

io.on('connection', socket => {
  let time = setInterval(() => {
    let current = new Date().toTimeString();
    socket.emit("time", {
      time: current
    });
    console.log(`Emmited event time at ${current}.`);
  }, 1000);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9zb2NrZXQuaW8uanMiXSwibmFtZXMiOlsic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImxpc3RlbiIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiaW8iLCJyZXF1aXJlIiwib24iLCJzb2NrZXQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjdXJyZW50IiwiRGF0ZSIsInRvVGltZVN0cmluZyIsImVtaXQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxZQUFMLEdBQW9CQyxNQUFwQixDQUEyQkMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQXZDLENBQWY7O0FBQ0EsTUFBTUMsRUFBRSxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCUixNQUFyQixDQUFYOztBQUNBTyxFQUFFLENBQUNFLEVBQUgsQ0FBTSxZQUFOLEVBQXFCQyxNQUFELElBQVk7QUFDNUIsTUFBSUMsSUFBSSxHQUFHQyxXQUFXLENBQUMsTUFBTTtBQUN6QixRQUFJQyxPQUFPLEdBQUcsSUFBSUMsSUFBSixHQUFXQyxZQUFYLEVBQWQ7QUFDQUwsSUFBQUEsTUFBTSxDQUFDTSxJQUFQLENBQVksTUFBWixFQUFvQjtBQUFFTCxNQUFBQSxJQUFJLEVBQUVFO0FBQVIsS0FBcEI7QUFDQUksSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEseUJBQXdCTCxPQUFRLEdBQTdDO0FBQ0gsR0FKcUIsRUFJbkIsSUFKbUIsQ0FBdEI7QUFLSCxDQU5EIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKS5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCk7XG5jb25zdCBpbyA9IHJlcXVpcmUoJ3NvY2tldC5pbycpKHNlcnZlcik7XG5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgICBsZXQgdGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBuZXcgRGF0ZSgpLnRvVGltZVN0cmluZygpO1xuICAgICAgICBzb2NrZXQuZW1pdChcInRpbWVcIiwgeyB0aW1lOiBjdXJyZW50IH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgRW1taXRlZCBldmVudCB0aW1lIGF0ICR7Y3VycmVudH0uYCk7XG4gICAgfSwgMTAwMCk7XG59KTsiXX0=