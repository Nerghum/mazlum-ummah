function normalizeItems(items) {
  return (Array.isArray(items) ? items : [items]).filter(Boolean);
}

function mediaId(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item._id || item.id || '';
}

const initialItems = { _id: "123", url: "/test.png" };
const selectedItems = normalizeItems(initialItems);
const value = "123";
const multiple = false;

const selectedIds = multiple ? normalizeItems(value).map(mediaId).filter(Boolean) : [mediaId(value)].filter(Boolean);
const visibleItems = selectedIds.map((id) => selectedItems.find((item) => mediaId(item) === id)).filter(Boolean);

console.log("selectedIds:", selectedIds);
console.log("visibleItems:", visibleItems);
