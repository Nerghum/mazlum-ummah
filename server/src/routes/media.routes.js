import { Router } from 'express';
import * as controller from '../controllers/media.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('media:read'), controller.list);
router.post('/', authorize('media:create', 'media:*'), upload.single('file'), controller.uploadMedia);
router.delete('/:id', authorize('media:*'), controller.remove);
router.put('/:id/replace', authorize('media:*'), upload.single('file'), controller.replaceMedia);

export default router;
