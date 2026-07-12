import { Router } from 'express';
import Country from '../models/Country.js';
import { crudController } from '../controllers/crud.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { countrySchema } from '../validators/taxonomy.validator.js';

const controller = crudController(Country, { slug: true });
const router = Router();

router.use(authenticate);
router.get('/', authorize('country:read'), controller.list);
router.post('/', authorize('country:*'), validate(countrySchema), controller.create);
router.get('/:id', authorize('country:read'), controller.get);
router.put('/:id', authorize('country:*'), validate(countrySchema), controller.update);
router.delete('/:id', authorize('country:*'), controller.remove);

export default router;
