const db = require('../models')
const jwt = require('jsonwebtoken')
const keys = require('../utils/keys')
const Message = db.message;
const User_message = db.user_message
const User = db.users;

const SEND_MESSAGE = async (req, res) => {
    // let authHeader = req.headers.authorization;
    // if (authHeader) {
    //     const {receiver_id, message} = req.body;
    //
    //     const token = authHeader.split(' ')[1];
    //     let candidate = jwt.verify(token, keys.jwtSecret)
    //     let user = await User.findOne({where: {id: candidate.id}})
    //     let sender_id = user.id
    //
    //     Message.create({message})
    //         .then(data => {
    //             let message_id = data.id;
    //             User_message.create({sender_id, receiver_id, message_id, shipped: true})
    //                 .then(data => {
    //                     res.send(data)
    //                 })
    //                 .catch(e => {
    //                     res.send(e)
    //                 })
    //         })
    //         .catch(e => {
    //             res.send(e)
    //         })
    // }

    const {receiver_id, message} = req.body;
    let user = await User.findOne({where: {id: 2}})
    let sender_id = user.id

    Message.create({message})
        .then(data => {
            let message_id = data.id;
            User_message.create({sender_id, receiver_id, message_id, shipped: true})
                .then(data => {
                    res.send(data)
                })
                .catch(e => {
                    res.send(e)
                })
        })
        .catch(e => {
            res.send(e)
        })

}


module.exports = {SEND_MESSAGE}