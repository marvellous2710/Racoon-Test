const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  postModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("error data :" + err);
  });
};

module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update error :" + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send;
    else console.log("delete error :" + err);
  });
};

// exports.deletePost = (req, res, next) => {
//     UserModel.deleteOne({ _id: req.params.id })
//       .then((user) => res.status(200).json(user))
//       .catch((error) => res.status(404).json({ error }));
//   };
