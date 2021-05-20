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


//sockets
const {Op} = require("sequelize");

const db = require("./models");
const User = db.users;
const Message = db.message


const rooms = []
const roomMessages = []

io.on('connection', socket => {
    // private chat in profile page

    // get all messages
    socket.on('all messages', data => {
        let {candidateId, someId} = data;
        Message.findAll({
            where: {
                sender_id: {
                    [Op.or]: [candidateId, someId]
                },
                receiver_id: {
                    [Op.or]: [candidateId, someId]
                },
            }
        })
            .then(data => {
                let messages = JSON.stringify(data, null, 2)
                socket.emit('get all messages', JSON.parse(messages))
            })
            .catch(e => {
                console.log(e)
            })

    })

    // create new message
    socket.on('new message', data => {
        Message.create({
            message: data.message,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            seen_status: false,
            shipped: true
        })
            .then(data => {
                let msg = JSON.stringify(data, null, 2)
                socket.broadcast.emit('sended message', JSON.parse(msg))
            })
            .catch(e => {
                console.log(e)
            })
    })

    // delete message
    socket.on('delete message', id => {
        Message.destroy({where: {id}})
            .then(num => {
                if (num[0] === 1) {
                    // res.send({msg: 'error'})
                } else {
                    socket.broadcast.emit('deleted message', id)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

    // end private chat sockets

    // room
    socket.on('connect room', data => {
        let isRoom = false
        rooms.forEach(item => {
            Object.keys(item).forEach(i => {
                i === data.room.roomId ? isRoom = true : null
            })
        })
        if (!isRoom) {
            let newObj = {
                [data.room.roomId]: [
                    data.room.user
                ]
            }
            rooms.push(newObj)
        } else {
            rooms.forEach(item => {
                if (item[data.room.roomId]) {
                    item[data.room.roomId].push(data.room.user)
                } else {
                    console.log('error')
                }
            })
        }

        rooms.forEach(room => {
            socket.broadcast.emit('room', room[data.room.roomId])
        })

        isRoom = false
        socket.on('disconnect', () => {
            rooms.forEach((item, index) => {
                if (item[data.room.roomId]) {
                    for (let i = 0; i < item[data.room.roomId].length; i++) {
                        if (item[data.room.roomId][i].id === data.room.user.id) {
                            let index = item[data.room.roomId].indexOf(item[data.room.roomId][i])
                            item[data.room.roomId].splice(index, 1)
                        }
                    }
                } else {
                    Object.keys(item).forEach(key => {
                        let idx = rooms.indexOf(item[key])
                        delete rooms.splice(idx, 1)
                    })
                }
            })
        })
    })

    socket.on('room msg', data => {
        roomMessages.push(data)
        socket.broadcast.emit('room all messages', roomMessages)
    })
    socket.broadcast.emit('room all messages', roomMessages)

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
