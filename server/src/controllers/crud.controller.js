import { AppError } from '../utils/AppError.js';
import { paginate } from '../utils/apiFeatures.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { makeSlug } from '../utils/slug.js';

export function crudController(Model, options = {}) {
  return {
    list: asyncHandler(async (req, res) => {
      const filter = {};
      for (const key of options.filters || []) {
        if (req.query[key] !== undefined && req.query[key] !== '') filter[key] = req.query[key];
      }
      if (req.query.search) filter.$text = { $search: req.query.search };
      const data = await paginate(Model, filter, req.query, null, options.populate || []);
      res.json({ success: true, data });
    }),
    get: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id).populate(options.populate || []);
      if (!item) throw new AppError(`${Model.modelName} not found`, 404);
      res.json({ success: true, data: item });
    }),
    create: asyncHandler(async (req, res) => {
      const payload = { ...req.body };
      if (options.slug && !payload.slug) payload.slug = makeSlug(payload.name || payload.title);
      const item = await Model.create(payload);
      res.status(201).json({ success: true, data: item });
    }),
    update: asyncHandler(async (req, res) => {
      const payload = { ...req.body };
      if (options.slug && payload.name) payload.slug = makeSlug(payload.name);
      const item = await Model.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
      if (!item) throw new AppError(`${Model.modelName} not found`, 404);
      res.json({ success: true, data: item });
    }),
    remove: asyncHandler(async (req, res) => {
      await Model.findByIdAndDelete(req.params.id);
      res.status(204).send();
    })
  };
}
