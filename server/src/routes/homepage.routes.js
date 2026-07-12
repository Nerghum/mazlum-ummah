import { Router } from 'express';
import * as controller from '../controllers/homepage.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { homepageSectionSchema, reorderSchema } from '../validators/homepage.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('homepage:*'), controller.list);
router.post('/', authorize('homepage:*'), validate(homepageSectionSchema), controller.create);
router.patch('/reorder', authorize('homepage:*'), validate(reorderSchema), controller.reorder);
router.put('/:id', authorize('homepage:*'), validate(homepageSectionSchema), controller.update);
router.delete('/:id', authorize('homepage:*'), controller.remove);

export default router;
