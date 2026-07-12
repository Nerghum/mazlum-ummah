import { Router } from 'express';
import * as controller from '../controllers/analytics.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.post('/track', controller.track);
router.get('/track-view/:id', controller.trackView);
router.get('/short/:code', controller.shortRedirect);
router.get('/dashboard', authenticate, authorize('analytics:read'), controller.dashboard);

export default router;
