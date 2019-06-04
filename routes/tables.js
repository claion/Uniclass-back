import express from 'express';
const router = express.Router();
import { showMainTable } from '../controllers/tableController';

router.get('', showMainTable);

export default router;
