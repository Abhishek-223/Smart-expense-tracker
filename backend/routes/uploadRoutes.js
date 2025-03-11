import express from 'express';
import receiptUpload from '../controllers/receiptUpload.js';
import auth from '../middlewares/authMiddleware.js'
import fileUpload from 'express-fileupload';

const router = express.Router();

router.post('/receipt', auth, fileUpload({ useTempFiles: true }), receiptUpload);

export default router;