import express from 'express';
const router = express.Router();
import {
    tables
} from '../controllers/timeTableController';

router.get('', tables);

export default router;