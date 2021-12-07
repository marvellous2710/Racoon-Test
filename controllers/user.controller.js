const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;//pour controler les ID sont reconnu par la base de donnée


//--------CRUD
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');//là tu me selectionne toutes les informations des users SAUF password !
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    
    UserModel.findById(req.params.id, (err,docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown' + err);
    }).select('-password');
};

module.exports.u
