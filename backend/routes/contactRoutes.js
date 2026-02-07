import express from 'express';
import { submitContact } from '../controller/contactController.js';
import { verifyUserAuth, roleBasedAccess } from '../middlewares/userAuth.js';

const router = express.Router();

// Only admin users can submit the contact form
router.route('/contact').post(verifyUserAuth,  submitContact);

export default router;
