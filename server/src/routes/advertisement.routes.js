import { Router } from 'express';
import * as controller from '../controllers/advertisement.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { advertisementSchema, bulkAdvertisementSchema } from '../validators/advertisement.validator.js';

const router = Router();

router.use(authenticate);
router.get('/', authorize('advertisement:read'), controller.list);
router.post('/', authorize('advertisement:create', 'advertisement:*'), validate(advertisementSchema), controller.create);
router.post('/bulk', authorize('advertisement:*'), validate(bulkAdvertisementSchema), controller.bulk);
router.get('/:id', authorize('advertisement:read'), controller.get);
router.put('/:id', authorize('advertisement:*'), validate(advertisementSchema), controller.update);
router.delete('/:id', authorize('advertisement:*'), controller.remove);

export default router;
