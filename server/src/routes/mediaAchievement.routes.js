import { Router } from 'express';
import * as controller from '../controllers/mediaAchievement.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { bulkMediaAchievementSchema, mediaAchievementSchema } from '../validators/mediaAchievement.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('mediaAchievement:read'), controller.list);
router.post('/', authorize('mediaAchievement:create', 'mediaAchievement:*'), validate(mediaAchievementSchema), controller.create);
router.post('/bulk', authorize('mediaAchievement:*'), validate(bulkMediaAchievementSchema), controller.bulk);
router.get('/:id', authorize('mediaAchievement:read'), controller.get);
router.put('/:id', authorize('mediaAchievement:*'), validate(mediaAchievementSchema), controller.update);
router.delete('/:id', authorize('mediaAchievement:*'), controller.remove);

export default router;
