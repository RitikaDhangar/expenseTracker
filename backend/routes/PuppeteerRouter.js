import express from 'express'
import { PuppeteerCode } from '../controller/Puppeter.js';
const router = express.Router();
router.post('/PuppeteerCode', PuppeteerCode);
export default router;