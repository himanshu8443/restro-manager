import * as express from 'express';
import * as billController from '../controllers/bill';
import * as authMiddleware from '../middleware/auth';

const router = express.Router();


//create bill
router.post('/create-bill', authMiddleware.auth, authMiddleware.isStaff, billController.createBill);

//get all bills
router.get('/get-bills', authMiddleware.auth, authMiddleware.isStaff, billController.getBills);

// get bill by id
router.get('/get-bill/:id', authMiddleware.auth, authMiddleware.isStaff, billController.getBillById);


export default router;


