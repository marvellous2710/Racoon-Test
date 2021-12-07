const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;//pour controler les ID sont reconnu par la base de donnée

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');//là tu me selectionne toutes les informations des users SAUF password !
    res.status(200).json(users);
}