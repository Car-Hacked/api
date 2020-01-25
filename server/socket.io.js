const server = http.createServer().listen(process.env.PORT);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    let time = setInterval(() => {
        let current = new Date().toTimeString();
        socket.emit("time", { time: current });
        console.log(`Emmited event time at ${current}.`);
    }, 1000);
});