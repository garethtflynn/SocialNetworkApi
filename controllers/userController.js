const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

const friendsList = async () =>
    User.aggregate()
      .count('friendsList')
      .then((numberFriends) => numberFriends)

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then( async (users) => {
        const userObj = {
          users, 
          friendsList: await friendsList(),
        };
        return res.json(userObj)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
      })
  },
  // Get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({user,
            friendsList: await friendsList(req.params.userId)
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
      })
  },
  // Create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user wiht that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err)
        return res.status(500).json(err)
      });
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.findOneAndUpdate(
            { users: req.params.userId },
            {$pull: {users: req.params.userId}},
            {new: true}
          )
      )
      .then((thought) =>
        !thought 
          ? res.status(404).json({message: 'User deleted, no thoughts'})
          : res.json({message: 'User deleted successfully'})
      )
  },
  // post to add friend
  newFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(400).json(err));
  },
  // delete to remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(400).json(err));
  },
};
