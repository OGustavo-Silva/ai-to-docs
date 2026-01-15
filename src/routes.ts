import express from 'express';
import { startJob } from './controller.ts';

const router = express.Router();
router.post('/', startJob);

export default router;
