const router = require('express').Router();
const {User, BlogPost} = require('../../models')
router.get('/', async (req, res) => {
    let userId = req.session.user_id;
    const posts = await BlogPost.findAll({
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        },
        where: {
            user_id: userId
        }
    }).then(results => results.map(item => item.get({ plain: true })));
    posts.forEach(post=>{
        post.createDateString = post.createDate.toLocaleString()
    });
    res.render('dashboard', {
        layout: 'main.handlebars',
        loggedIn: req.session.loggedIn,
        userName: req.session.userName,
        posts
    });
});

module.exports = router;
