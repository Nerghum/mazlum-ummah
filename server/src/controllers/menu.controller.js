import MenuItem from '../models/MenuItem.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function buildTree(items) {
  const byId = new Map(items.map((item) => [String(item._id), { ...item, children: [] }]));
  const roots = [];
  byId.forEach((item) => {
    const parentId = item.parent ? String(item.parent) : '';
    const parent = parentId ? byId.get(parentId) : null;
    if (parent) parent.children.push(item);
    else roots.push(item);
  });
  const sortItems = (list) => list.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => ({ ...item, children: sortItems(item.children || []) }));
  return sortItems(roots);
}

export const list = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  const items = await MenuItem.find(filter).sort('parent order').lean();
  res.json({ success: true, data: { items, tree: buildTree(items) } });
});

export const get = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id).lean();
  if (!item) throw new AppError('Menu item not found', 404);
  res.json({ success: true, data: item });
});

export const create = asyncHandler(async (req, res) => {
  const count = await MenuItem.countDocuments({ parent: req.body.parent || null });
  const item = await MenuItem.create({ ...req.body, parent: req.body.parent || null, order: req.body.order ?? count + 1 });
  res.status(201).json({ success: true, data: item });
});

export const update = asyncHandler(async (req, res) => {
  if (req.body.parent === req.params.id) throw new AppError('A menu item cannot be its own parent', 400);
  const item = await MenuItem.findByIdAndUpdate(req.params.id, { ...req.body, parent: req.body.parent || null }, { new: true, runValidators: true });
  if (!item) throw new AppError('Menu item not found', 404);
  res.json({ success: true, data: item });
});

export const remove = asyncHandler(async (req, res) => {
  await MenuItem.deleteMany({ $or: [{ _id: req.params.id }, { parent: req.params.id }] });
  res.status(204).send();
});

export const reorder = asyncHandler(async (req, res) => {
  await Promise.all(req.body.items.map((item) => MenuItem.findByIdAndUpdate(item.id, { parent: item.parent || null, order: item.order })));
  res.json({ success: true, message: 'Menu reordered' });
});

export const publicMenu = asyncHandler(async (_req, res) => {
  const items = await MenuItem.find({ isActive: true }).sort('parent order').lean();
  res.json({ success: true, data: buildTree(items) });
});
