const db = require('../models')
const jwt = require('jsonwebtoken')
const keys = require('../utils/keys')
const Message = db.message;
const User = db.users;

const SEND_MESSAGE = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const {receiver_id, message} = req.body.post;
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret)
        let user = await User.findOne({where: {id: candidate.id}})
        let sender_id = user.id

        Message.create({
            message,
            sender_id,
            receiver_id,
            seen_status: false,
            shipped: true
        })
            .then(data => {
                let msg = JSON.stringify(data, null, 2)
                console.log(msg)
                // res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }

}


module.exports = {SEND_MESSAGE}