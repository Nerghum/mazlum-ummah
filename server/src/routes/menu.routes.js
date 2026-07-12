import { Router } from 'express';
import * as controller from '../controllers/menu.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { menuItemSchema, reorderMenuSchema } from '../validators/menu.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('menu:read'), controller.list);
router.post('/', authorize('menu:create', 'menu:*'), validate(menuItemSchema), controller.create);
router.patch('/reorder', authorize('menu:*'), validate(reorderMenuSchema), controller.reorder);
router.get('/:id', authorize('menu:read'), controller.get);
router.put('/:id', authorize('menu:*'), validate(menuItemSchema), controller.update);
router.delete('/:id', authorize('menu:*'), controller.remove);

export default router;
