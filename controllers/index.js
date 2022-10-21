const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const dashboardRoutes = require('./dashboard');
const postsRoutes = require('./posts');

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postsRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;