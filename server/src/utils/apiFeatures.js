export function buildQuery(modelQuery, query) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 20), 1), 100);
  const skip = (page - 1) * limit;
  const sort = query.sort || '-createdAt';

  return {
    query: modelQuery.sort(sort).skip(skip).limit(limit),
    page,
    limit
  };
}

export async function paginate(model, filter, query, projection = null, populate = []) {
  const { query: mongoQuery, page, limit } = buildQuery(model.find(filter, projection), query);
  populate.forEach((item) => mongoQuery.populate(item));
  const [items, total] = await Promise.all([mongoQuery.lean(), model.countDocuments(filter)]);
  return { items, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
}
