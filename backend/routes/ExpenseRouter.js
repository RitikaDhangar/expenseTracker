
import express from 'express';
const router=express.Router()
import {createExpense,deleteUserExpense,editUserExpense,fetchAllExpense} from '../controller/Expenses.js'
import { verifyToken } from '../middleware/jwtverify.js';
router.post('/createExpense',verifyToken, createExpense);
router.get('/fetchAllExpense',verifyToken, fetchAllExpense);
router.post('/editUserExpense',verifyToken, editUserExpense);
router.post('/deleteUserExpense',verifyToken, deleteUserExpense);
export default router