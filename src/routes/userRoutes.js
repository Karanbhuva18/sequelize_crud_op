import express from 'express'
import { createUser,getAllUsers,createUserTasks,selectUserWithTask,createCategories } from '../controllers/userControllers.js';
const router = express.Router();


router.route('/createUser').post(createUser);
router.route('/getAllUsers').get(getAllUsers);
router.route('/createTask/:categoryId').post(createUserTasks);
router.route('/selectUserWithTask/:id').get(selectUserWithTask);
router.route('/createCategories').post(createCategories);
export default router;