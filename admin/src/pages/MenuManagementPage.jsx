import { Edit, GripVertical, Plus, Save, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { Skeleton } from '../components/Skeleton.jsx';
import { api } from '../services/api.js';
import { localizedValue } from '../utils/localized.js';

const defaults = {
  label: { en: '', bn: '' },
  url: '/',
  parent: '',
  target: 'self',
  isActive: true
};

function flattenTree(items, level = 0) {
  return items.flatMap((item) => [{ ...item, level }, ...flattenTree(item.children || [], level + 1)]);
}

export function MenuManagementPage() {
  const [items, setItems] = useState([]);
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaults);
  const [editingId, setEditingId] = useState(null);
  const [dragged, setDragged] = useState(null);

  async function load() {
    setLoading(true);
    const response = await api.get('/menus');
    setItems(response.data.data.items || []);
    setTree(response.data.data.tree || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function edit(item) {
    setEditingId(item._id);
    setForm({
      label: { en: item.label?.en || '', bn: item.label?.bn || '' },
      url: item.url || '/',
      parent: item.parent || '',
      target: item.target || 'self',
      isActive: item.isActive !== false
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(defaults);
  }

  async function save(event) {
    event.preventDefault();
    const payload = { ...form, parent: form.parent || null };
    if (editingId) await api.put(`/menus/${editingId}`, payload);
    else await api.post('/menus', payload);
    resetForm();
    load();
  }

  async function remove(id) {
    if (!window.confirm('Delete this menu item and its submenus?')) return;
    await api.delete(`/menus/${id}`);
    load();
  }

  async function move(targetId) {
    if (!dragged || dragged.id === targetId) return;
    const sameParent = items.filter((item) => String(item.parent || '') === String(dragged.parent || '')).sort((a, b) => (a.order || 0) - (b.order || 0));
    const fromIndex = sameParent.findIndex((item) => item._id === dragged.id);
    const toIndex = sameParent.findIndex((item) => item._id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...sameParent];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    await api.patch('/menus/reorder', { items: next.map((menuItem, index) => ({ id: menuItem._id, parent: menuItem.parent || null, order: index + 1 })) });
    setDragged(null);
    load();
  }

  const flatTree = flattenTree(tree);
  const parentOptions = items.filter((item) => item._id !== editingId && !item.parent).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      <PageHeader title="Header Menu Management" description="Add pages or custom URLs, then organize top-level menus and submenus." />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <Card className="p-5">
          <div className="mb-4 font-semibold">Menu structure</div>
          {loading ? <Skeleton rows={6} /> : (
            <div className="space-y-2">
              {flatTree.map((item) => (
                <div
                  key={item._id}
                  draggable
                  onDragStart={() => setDragged({ id: item._id, parent: item.parent || '' })}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => move(item._id)}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  style={{ marginLeft: `${item.level * 24}px` }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <GripVertical className="shrink-0 text-slate-400" size={18} />
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{localizedValue(item.label, 'en') || localizedValue(item.label, 'bn')}</div>
                      <div className="truncate text-xs text-slate-500">{item.url} {item.target === 'blank' ? '· New tab' : ''} {!item.isActive ? '· Inactive' : ''}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" className="text-brand-600" onClick={() => edit(item)}><Edit size={17} /></button>
                    <button type="button" className="text-red-600" onClick={() => remove(item._id)}><Trash2 size={17} /></button>
                  </div>
                </div>
              ))}
              {!flatTree.length && <div className="rounded-lg bg-slate-50 px-3 py-8 text-center text-sm text-slate-500 dark:bg-slate-800">No menu items yet</div>}
            </div>
          )}
        </Card>

        <Card className="h-fit p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold">{editingId ? 'Edit menu item' : 'Add menu item'}</div>
            {editingId && <button type="button" className="text-slate-500" onClick={resetForm}><X size={18} /></button>}
          </div>
          <form className="space-y-4" onSubmit={save}>
            <FormField label="Label English">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={form.label.en} onChange={(event) => setForm({ ...form, label: { ...form.label, en: event.target.value } })} />
            </FormField>
            <FormField label="Label Bangla">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={form.label.bn} onChange={(event) => setForm({ ...form, label: { ...form.label, bn: event.target.value } })} />
            </FormField>
            <FormField label="Page or custom URL">
              <input placeholder="/notice or https://example.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} />
            </FormField>
            <FormField label="Parent menu">
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={form.parent} onChange={(event) => setForm({ ...form, parent: event.target.value })}>
                <option value="">Top level</option>
                {parentOptions.map((item) => <option key={item._id} value={item._id}>{localizedValue(item.label, 'en') || localizedValue(item.label, 'bn')}</option>)}
              </select>
            </FormField>
            <FormField label="Open link">
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })}>
                <option value="self">Same tab</option>
                <option value="blank">New tab</option>
              </select>
            </FormField>
            <label className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
              <span>Active</span><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />
            </label>
            <Button className="w-full"><Save size={16} /> {editingId ? 'Update menu item' : 'Add menu item'}</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
