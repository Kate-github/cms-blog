const router = require('express').Router();
const { BlogPost } = require('../../models');
router.get('/', (req, res) => {

    res.render('post', { layout: 'main.handlebars', post: { title: '', content: '' } });
});
router.get('/:id', async (req, res) => {
    let id = req.params['id'];
    let post;
    if (id) {
        post = await BlogPost.findOne({
            where: {
                "id": id,
                "user_id": req.session.user_id
            }
        }).then(result => result.get({ plain: true }));
        if (!post) {
            res.render('error', { layout: 'main.handlebars', error: 'Post not Found' });
            return;
        }
    } else {
        res.render('error', { layout: 'main.handlebars', error: 'Post not Found' });
        return;
    }
    res.render('post', {
        layout: 'main.handlebars',
        loggedIn: req.session.loggedIn,
        userName: req.session.userName,
        post
    });
});
router.post('/', async (req, res) => {

    // Capture the input fields
    const postData = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        createDate:new Date().toISOString()
    }
        
    let post = BlogPost.build(postData);
    post.save();
    res.redirect('/dashboard');
});

router.post('/:id', async (req, res) => {
    let id = req.params['id'];

    // Capture the input fields
    const postData = {
        title: req.body.title,
        content: req.body.content
    }
    let post = BlogPost.build(postData);
    post.update();
    BlogPost.update(postData, {
        where: {
            id: id,
            user_id: req.session.user_id
        }
    })
    res.redirect('/dashboard');
});
module.exports = router;
