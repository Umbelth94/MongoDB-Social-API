const router = require('express').Router();
const {
    getAllUsers
} = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers);

module.exports = router;