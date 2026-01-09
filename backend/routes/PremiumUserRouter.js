import express from 'express'
import { verifyToken } from '../middleware/jwtverify.js';
import { filterExpense, getSortingExpense } from '../controller/PremiumUser.js';
// import { getSortingExpense } from '../controller/PremiumUser.js';
const router = express.Router();
router.post('/getSortingExpense', verifyToken, getSortingExpense);
router.post('/filterExpense', verifyToken, filterExpense);
export default router;