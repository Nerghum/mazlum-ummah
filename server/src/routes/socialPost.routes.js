import { Router } from 'express';
import * as controller from '../controllers/socialPost.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { bulkSocialPostSchema, socialPostSchema } from '../validators/socialPost.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('socialPost:read'), controller.list);
router.post('/', authorize('socialPost:create', 'socialPost:*'), validate(socialPostSchema), controller.create);
router.post('/bulk', authorize('socialPost:*'), validate(bulkSocialPostSchema), controller.bulk);
router.get('/:id', authorize('socialPost:read'), controller.get);
router.put('/:id', authorize('socialPost:*'), validate(socialPostSchema), controller.update);
router.delete('/:id', authorize('socialPost:*'), controller.remove);

export default router;
