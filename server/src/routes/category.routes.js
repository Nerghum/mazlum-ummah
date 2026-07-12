import { Router } from 'express';
import Category from '../models/Category.js';
import { crudController } from '../controllers/crud.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { categorySchema } from '../validators/taxonomy.validator.js';

const controller = crudController(Category, { slug: true, populate: ['parent', 'image', 'bannerImage'], filters: ['type', 'parent', 'isActive'] });
const router = Router();

router.use(authenticate);
router.get('/', authorize('category:read'), controller.list);
router.post('/', authorize('category:*'), validate(categorySchema), controller.create);
router.get('/:id', authorize('category:read'), controller.get);
router.put('/:id', authorize('category:*'), validate(categorySchema), controller.update);
router.delete('/:id', authorize('category:*'), controller.remove);

export default router;
