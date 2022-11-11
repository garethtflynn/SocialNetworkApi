const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    removeFriend
} = require('../../controllers/userController')

// get and post users
router.route('/').get(getUsers).post(createUser)

// get one user, delete a user, and update a user
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// add new friend and remove friend
router.route('/:userId/friends/:friendsId').post(newFriend).delete(removeFriend)

module.exports = router;