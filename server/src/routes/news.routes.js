import { Router } from 'express';
import * as controller from '../controllers/news.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { bulkNewsSchema, newsSchema } from '../validators/news.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('news:read'), controller.list);
router.post('/', authorize('news:create'), validate(newsSchema), controller.create);
router.post('/bulk', authorize('news:*'), validate(bulkNewsSchema), controller.bulk);
router.get('/:id', authorize('news:read'), controller.get);
router.put('/:id', authorize('news:*', 'news:update-own'), validate(newsSchema), controller.update);
router.delete('/:id', authorize('news:*', 'news:delete-own'), controller.remove);

export default router;
