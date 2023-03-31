import { Server } from 'socket.io';


const server = http.createServer().listen(process.env.PORT);
const io = new Server(server);
io.on('connection', (socket) => {
    let time = setInterval(() => {
        let current = new Date().toTimeString();
        socket.emit("time", { time: current });
        console.log(`Emmited event time at ${current}.`);
    }, 1000);
});