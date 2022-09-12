const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

// Render home page
router.get('/', async (req, res) => {
    const posts = await BlogPost.findAll({
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        }
    }).then(results => results.map(item => item.get({ plain: true })));
    res.render('home', {
        layout: 'main.handlebars',
        loggedIn: req.session.loggedIn,
        userName: req.session.userName,
        posts
    });
});

module.exports = router;
