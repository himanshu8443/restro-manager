import * as express from 'express';
import * as userController from '../controllers/user';
import * as authMiddleware from '../middleware/auth';

const router = express.Router();

//login
router.post('/login', userController.login);
//register
router.post('/register', userController.registerAdmin);



//add staff
router.post('/add-staff', authMiddleware.auth, authMiddleware.isAdmin, userController.addStaff);

//get all staff
router.get('/get-staff', authMiddleware.auth, authMiddleware.isAdmin, userController.getStaff);

// get staff by id
router.get('/get-staff/:id', authMiddleware.auth, authMiddleware.isAdmin, userController.getStaffById);

//remove staff
router.delete('/remove-staff/:id', authMiddleware.auth, authMiddleware.isAdmin, userController.removeStaff);

// update staff
router.put('/update-staff/:id', authMiddleware.auth, authMiddleware.isAdmin, userController.updateStaff);

export default router;





