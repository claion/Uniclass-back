import express from 'express';
const router = express.Router();
import {
    showTables
} from '../controllers/tableController';

router.get('', showMainTable);


export default router;
