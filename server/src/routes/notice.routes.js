import { Router } from 'express';
import * as controller from '../controllers/notice.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { bulkNoticeSchema, noticeSchema } from '../validators/notice.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('notice:read'), controller.list);
router.post('/', authorize('notice:create'), validate(noticeSchema), controller.create);
router.post('/bulk', authorize('notice:*'), validate(bulkNoticeSchema), controller.bulk);
router.get('/:id', authorize('notice:read'), controller.get);
router.put('/:id', authorize('notice:*'), validate(noticeSchema), controller.update);
router.delete('/:id', authorize('notice:*'), controller.remove);

export default router;
