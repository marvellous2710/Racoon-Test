const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;//pour controler les ID sont reconnu par la base de donnée


//--------CRUD
module.exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select('-password');//là tu me selectionne toutes les informations des users SAUF password !
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res, next) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id) //c'est pour controller que l'iD est connu 
    
    UserModel.findById(req.params.id, (err,docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown' + err);
    }).select('-password');
};

// module.exports.updateUser = async (req, res, next) => {
//     if (!ObjectID.isValid(req.params.id))//on vérifie si le ID est correct
//         return res.status(400).send('ID unknown : ' + req.params.id)

//     try {
//         await UserModel.updateOne(
//             {_id : req.params.id},
//             {
//                 $set: {
//                     bio: req.body.bio,
//                 },
//             },
//             { new: true, upsert: true, setDefaultsOnInsert: true },
//             (err, docs) => {
//                 if (!err) return res.send(docs);
//                 if (err) return res.status(500).send({ message: err });
//             }
//         )
//     } catch (err) {
//         return res.status(500).json({ message: err });
//     }
// };

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };