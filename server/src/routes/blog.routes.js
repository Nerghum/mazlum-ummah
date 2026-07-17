import { Router } from 'express';
import * as controller from '../controllers/blog.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { blogSchema, bulkBlogSchema } from '../validators/blog.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('blog:read'), controller.list);
router.post('/', authorize('blog:create'), validate(blogSchema), controller.create);
router.post('/bulk', authorize('blog:*'), validate(bulkBlogSchema), controller.bulk);
router.get('/:id', authorize('blog:read'), controller.get);
router.put('/:id', authorize('blog:*', 'blog:update-own'), validate(blogSchema), controller.update);
router.delete('/:id', authorize('blog:*', 'blog:delete-own'), controller.remove);

export default router;
