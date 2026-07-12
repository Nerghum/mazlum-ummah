import { Router } from 'express';
import * as controller from '../controllers/faq.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { faqTopicSchema } from '../validators/faq.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('faq:read'), controller.list);
router.post('/', authorize('faq:create', 'faq:*'), validate(faqTopicSchema), controller.create);
router.get('/:id', authorize('faq:read'), controller.get);
router.put('/:id', authorize('faq:*'), validate(faqTopicSchema), controller.update);
router.delete('/:id', authorize('faq:*'), controller.remove);

export default router;
