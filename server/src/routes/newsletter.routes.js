import express from 'express';
import { getSubscribers, exportSubscribers, deleteSubscriber } from '../controllers/newsletter.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { ROLES } from '../config/roles.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]));

router.get('/', getSubscribers);
router.get('/export', exportSubscribers);
router.delete('/:id', deleteSubscriber);

export default router;
