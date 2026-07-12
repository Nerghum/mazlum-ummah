import { GripVertical, HelpCircle, Plus, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { Skeleton } from '../components/Skeleton.jsx';
import { api } from '../services/api.js';

const emptyLocalized = { en: '', bn: '' };
const defaults = {
  title: { en: 'FAQs', bn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন' },
  description: { ...emptyLocalized },
  slug: 'faqs',
  order: 1,
  isActive: true,
  items: [
    {
      question: { ...emptyLocalized },
      answer: { ...emptyLocalized },
      order: 1,
      isActive: true
    }
  ]
};

function newQuestion(order) {
  return {
    question: { ...emptyLocalized },
    answer: { ...emptyLocalized },
    order,
    isActive: true
  };
}

function normalizeItem(item, index) {
  return {
    question: { en: item.question?.en || '', bn: item.question?.bn || '' },
    answer: { en: item.answer?.en || '', bn: item.answer?.bn || '' },
    order: index + 1,
    isActive: item.isActive !== false
  };
}

export function FaqManagementPage() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaults);
  const [containerId, setContainerId] = useState(null);
  const [extraContainerIds, setExtraContainerIds] = useState([]);

  async function load() {
    setLoading(true);
    const response = await api.get('/faqs');
    const topics = response.data.data || [];
    const [primary, ...extra] = topics;
    const items = topics.flatMap((topic) => topic.items || []).map(normalizeItem);

    setContainerId(primary?._id || null);
    setExtraContainerIds(extra.map((topic) => topic._id));
    setForm({
      ...defaults,
      items: items.length ? items : [newQuestion(1)]
    });
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function updateQuestion(index, field, lang, value) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: { ...item[field], [lang]: value } } : item
      ))
    }));
  }

  function updateQuestionMeta(index, patch) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    }));
  }

  function addQuestion() {
    setForm((current) => ({ ...current, items: [...current.items, newQuestion(current.items.length + 1)] }));
  }

  function removeQuestion(index) {
    setForm((current) => {
      const nextItems = current.items.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        items: (nextItems.length ? nextItems : [newQuestion(1)]).map((item, itemIndex) => ({ ...item, order: itemIndex + 1 }))
      };
    });
  }

  function moveQuestion(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= form.items.length) return;
    const items = [...form.items];
    const [item] = items.splice(index, 1);
    items.splice(target, 0, item);
    setForm({ ...form, items: items.map((row, itemIndex) => ({ ...row, order: itemIndex + 1 })) });
  }

  async function save(event) {
    event.preventDefault();
    const payload = {
      ...defaults,
      items: form.items.map((item, index) => ({ ...item, order: index + 1 }))
    };

    if (containerId) await api.put(`/faqs/${containerId}`, payload);
    else await api.post('/faqs', payload);

    await Promise.all(extraContainerIds.map((id) => api.delete(`/faqs/${id}`)));
    await load();
  }

  return (
    <>
      <PageHeader title="FAQ Management" description="Create bilingual questions and answers for the website FAQ section." />
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2 font-semibold"><HelpCircle size={18} /> FAQ questions</div>
        {loading ? (
          <Skeleton rows={6} />
        ) : (
          <form className="space-y-4" onSubmit={save}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Questions and answers</div>
                <Button type="button" variant="secondary" onClick={addQuestion}><Plus size={16} /> Add Q&A</Button>
              </div>
              {form.items.map((item, index) => (
                <div key={index} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-semibold"><GripVertical size={16} /> Q&A {index + 1}</div>
                    <div className="flex gap-2">
                      <button type="button" className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700" onClick={() => moveQuestion(index, -1)}>Up</button>
                      <button type="button" className="rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-700" onClick={() => moveQuestion(index, 1)}>Down</button>
                      <button type="button" className="text-red-600" onClick={() => removeQuestion(index)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField label="Question English">
                      <input required className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={item.question.en} onChange={(event) => updateQuestion(index, 'question', 'en', event.target.value)} />
                    </FormField>
                    <FormField label="Question Bangla">
                      <input required className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={item.question.bn} onChange={(event) => updateQuestion(index, 'question', 'bn', event.target.value)} />
                    </FormField>
                    <FormField label="Answer English">
                      <textarea required rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={item.answer.en} onChange={(event) => updateQuestion(index, 'answer', 'en', event.target.value)} />
                    </FormField>
                    <FormField label="Answer Bangla">
                      <textarea required rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={item.answer.bn} onChange={(event) => updateQuestion(index, 'answer', 'bn', event.target.value)} />
                    </FormField>
                  </div>
                  <label className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                    <span>Active Q&A</span>
                    <input type="checkbox" checked={item.isActive} onChange={(event) => updateQuestionMeta(index, { isActive: event.target.checked })} />
                  </label>
                </div>
              ))}
            </div>
            <Button className="w-full"><Save size={16} /> Save FAQs</Button>
          </form>
        )}
      </Card>
    </>
  );
}
