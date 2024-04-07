const router = require('express').Router();
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUserAndThoughts,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers).post(createUser);

// api/users/:userID
router.route('/:userId').get(getUserByID).put(updateUser).delete(deleteUserAndThoughts);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)
module.exports = router;