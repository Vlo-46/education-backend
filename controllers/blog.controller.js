const db = require('../models');
const Blog = db.blogs;
const Blog_Comment = db.blog_comments;

const create_blog = async (req, res) => {
    // const {image, title, description} = req.body.blog

    let date_ob = new Date();
    let dateTime = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let today = dateTime + "/" + month + "/" + year
    req.body.blog['date'] = today

    Blog.create({...req.body.blog})
        .then(data => {
            console.log(data)
            res.send({data})
        })
        .catch(e => {
            res.send({msg: e})
        });
};

const all_blogs = async (req, res) => {
    Blog.findAll({include: Blog_Comment})
        .then(data => {
            let blogs = JSON.stringify(data, null, 2)
            res.send({blogs: JSON.parse(blogs)})
        })
        .catch(e => {
            res.send({msg: e})
        });
};

const detail_blog = async (req, res) => {
    const id = req.params.id;
    Blog.findByPk(id)
        .then(data => {
            res.send({blog: data})
        })
        .catch(e => {
            res.send({msg: e})
        });
};

let update_blog = async (req, res) => {
    let id = req.body.blog.id

    let date_ob = new Date();
    let dateTime = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let today = dateTime + "/" + month + "/" + year
    req.body.blog['date'] = today

    Blog.update(req.body.blog, {
        where: {id: id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'ok', blog: req.body.blog})
            } else {
                res.send({msg: 'error'})
            }
        })
        .catch(e => {
            res.send({msg: e})
        });
};

let delete_blog = async (req, res) => {
    const id = req.body.id;

    Blog.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'error'})
            } else {
                res.send({msg: 'ok'})
            }
        })
        .catch(err => {
            console.log(err)
            res.send({msg: err})
        });
};

let create_comment = async (req, res) => {
    let date_ob = new Date();
    let dateTime = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let today = dateTime + "/" + month + "/" + year
    req.body.comment['date'] = today

    Blog_Comment.create({...req.body.comment})
        .then(data => {
            res.send({msg: 'ok'})
        })
        .catch(e => {
            res.send({msg: e})
        })
};

module.exports = {create_blog, all_blogs, detail_blog, update_blog, delete_blog, create_comment};