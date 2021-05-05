const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const keys = require('./utils/keys')

const http = require('http').Server(app, {
    cors: {
        origin: keys.FRONT_URI,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
const io = require('socket.io')(http);

//middleware
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors())

app.use(helmet());
app.use(compression());

// routes
const blogRouter = require('./routes/blog')
const authRouter = require('./routes/auth')
const subjectRouter = require('./routes/subject')
const profileRouter = require('./routes/profile')
const messageRouter = require('./routes/message')

app.use('/api/blog', blogRouter)
app.use('/api/auth', authRouter)
app.use('/api/subject', subjectRouter)
app.use('/api/profile', profileRouter)
app.use('/api/message', messageRouter)


const db = require("./models");
const User = db.users;
const User_message = db.user_message;
const Message = db.message


//sockets
let messages = []

io.on('connection', socket => {

    socket.on('new message', data => {
        messages.push(data)
        socket.broadcast.emit('new message', data)
    })



    socket.on('disconnected', () => {
        console.log('disconnected')
    })
})

// server
const PORT = process.env.PORT || 5000;


db.sequelize.sync().then(() => {
    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
});
