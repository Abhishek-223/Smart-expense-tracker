import express from 'express';
import { uploadReceipt } from '../controllers/uploadController';

const router = express.Router();

router.post('/upload', uploadReceipt);

export default router;