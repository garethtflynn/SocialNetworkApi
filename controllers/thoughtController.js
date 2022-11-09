const { Thought, User } = require('../models')

module.exports = {
    // Get all thoughts 
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },
    // Get single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.id})
          .select("__v")
          .then((thought) => 
            !thought 
              ? res.status(404).json({message: "No user with that ID"})
              : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // Post to create new thought and push created thoughts id to user's thoughts array field
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thought._id }},
                {new: true}
            );
          })
          .then((user) => 
            !user
              ? res
                  .status(404)
                  .json({message: 'thought created, but no user with this ID'})
                : res.json({message: 'thought created!'})
            )
            .catch((err) => {
                console.error(err);
            })
    },
    // Update a thought by id
    updateThought(req,res) {
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
    // Delete a thought by id
    deleteThought(req,res){
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => 
        !thought 
          ? res.status(404).json({message: 'No thought with that ID'})
          : res.status(200).json({message:'Thought deleted'})
      )
      .catch((err) => res.status(500).json(err));
    }
}