const { Users, Thoughts } = require("../models");

const usersController = {
 
  // get all users
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
    .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

   // create a user
   createUsers({body}, res) {
    Users.create(body)
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => res.status(400).json(err));
},

  // update user by id
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // delete a user
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a friend
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a friend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;
