const router = require('express').Router();
const User = require('../../models/user');

router.get('/', (req, res) => {
    res.render('login', { layout: 'main.handlebars' });
});
// router.geṭ̣̣̣̣̣̣̣
router.post('/', async (req, res) => {

    let errorMsg = '';
    console.log('USEr$$$$$$$$$$$$$$$$$', User);
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            errorMsg = 'Invalid username or password.';
        }

        const validPassword = dbUserData.checkPassword(req.body.password)

        if (!validPassword) {
            errorMsg = 'Invalid username or password.';
        } else {
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
