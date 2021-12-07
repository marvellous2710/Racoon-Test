const router         = require('express').Router();
const authController = require ('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//auth
router.post("/register", authController.signUp);

// user display: 'block',
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
//router.put('/:id', userController.updateUser); //les modifications marchent sur MONGODB COMPASS mais pas sur POSTMAN I dont know why
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


module.exports = router;