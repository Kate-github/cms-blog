const router = require('express').Router();
const User = require('../../models/user');

router.get('/', (req, res) => {
    res.render('login', { layout: 'main.handlebars' });
});

// Process Login
router.post('/', async (req, res) => {

    let errorMsg = '';
    // look for user matching email with posted userName
    const user = await User.findOne({
        where: {
            email: req.body.userName
        }
    }).then(dbUserData => {
        // set error message if user not found
        if (!dbUserData) {
            errorMsg = 'Invalid username or password.';
        }

        // check if password matches
        const validPassword = dbUserData.checkPassword(req.body.password)

        if (!validPassword) {
            errorMsg = 'Invalid username or password.';
        } else {
            // save the session
            req.session.save(() => {
                req.session.user_id = dbUserData.id
                req.session.userName = dbUserData.firstname + " " + dbUserData.lastName
                req.session.loggedIn = true;
                res.redirect('/');
            });
        }
    });
});
module.exports = router;
