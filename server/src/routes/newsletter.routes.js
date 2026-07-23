import express from 'express';
import { getSubscribers, exportSubscribers, deleteSubscriber } from '../controllers/newsletter.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('newsletter:read'), getSubscribers);
router.get('/export', authorize('newsletter:read'), exportSubscribers);
router.delete('/:id', authorize('newsletter:delete'), deleteSubscriber);

export default router;
