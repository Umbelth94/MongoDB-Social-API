const router = require('express').Router();
const {
    getAllUsers,
    getUserByID,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers);

// api/users/:userID
router.route('/:userId').get(getUserByID);

module.exports = router;