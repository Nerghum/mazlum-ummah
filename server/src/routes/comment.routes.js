import { Router } from 'express';
import Comment from '../models/Comment.js';
import { crudController } from '../controllers/crud.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const controller = crudController(Comment, { populate: ['news', 'moderatedBy'] });
const router = Router();

router.use(authenticate, authorize('comment:*'));
router.get('/', controller.list);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
