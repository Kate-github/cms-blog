const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;