const Router = require('express');
const controller = require('../controllers/authController');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login',controller.login);

router.get('/getUsers', authMiddleware, controller.getUsers);

module.exports=router;