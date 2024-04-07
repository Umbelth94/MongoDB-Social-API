const router = require('express').Router();
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers).post(createUser);

// api/users/:userID
router.route('/:userId').get(getUserByID).put(updateUser);

module.exports = router;