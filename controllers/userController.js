const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    // Get one user 
    getSingleUser(req, res) {
        User.findOne({_id: req.params.id})
          .populate('thoughts')
          .populate('freinds')
          .select("__v")
          .then((user) => 
            !user 
              ? res.status(404).json({message: "No user with that ID"})
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    // Create user
    createUser(req,res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          })
    },
    // Update user by ID
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.id },
            {$set: req.body },
            {runValidators: true, new: true }
        )
          .then((user) => 
            !user
              ? res.status(404).json({message: 'No user wiht that ID'})
              : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
          .then((user) => 
          !user 
            ? res.status(404).json({message: 'No user with that ID'})
            : User.deleteMany({_id: {$in: user.thoughts}})
        )
        .then(() => res.json({message: 'User and thoughts deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
}
