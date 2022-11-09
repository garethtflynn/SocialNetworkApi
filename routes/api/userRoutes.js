const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController')

// get and post users
router.route('/').get(getUsers).post(createUser)

// get one user, delete a user, and update a user
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser)

module.exports = router;