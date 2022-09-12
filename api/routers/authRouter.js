const Router = require('express');
const controller = require('../controllers/authController');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login',controller.login);

router.get('/getUsers', authMiddleware, controller.getUsers);
router.get('/getSubordinatesTask', authMiddleware,controller.getSubordinatesTask);
router.get('/getOwnTasks', authMiddleware,controller.getOwnTasks);
router.post('/updateTask', authMiddleware,controller.updateTask);
router.post('/createTask', authMiddleware,controller.createTask);

module.exports=router;