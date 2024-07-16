const { User, Thought} = require ('../models');

const userController = {
    getUsers(req,res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No User with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createUser(req,res){
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
    },
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new:true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json (err));
    },
    async deleteUser(req, res, next) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          console.log('User found:', user);
          console.log('User thoughts:', user.thoughts);
    
          // Delete all thoughts associated with the user
          const result = await Thought.deleteMany({ _id: { $in: user.thoughts } });
          console.log('Thought deletion result:', result);
    
          res.json({ message: 'User and their thoughts deleted' });
        } catch (err) {
          console.error('Error:', err);
          res.status(500).json(err);
        }
      },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData){
                return res.status(404).json({message: 'No user with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData){
                return res.status(404).json({message: 'No user with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    }
};

module.exports = userController;