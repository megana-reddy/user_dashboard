import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/', createUser) // add the user
router.get('/', getUsers) // get all users
router.get('/:id', getUserById) // gets single user
router.put('/:id', updateUser) // update user
router.delete('/:id', deleteUser) // delete user

export default router;