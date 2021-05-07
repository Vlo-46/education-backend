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

const {Op} = require("sequelize");

const db = require("./models");
const User = db.users;
const Message = db.message


io.on('connection', socket => {
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

    socket.on('delete message', id => {
        console.log(id)
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
