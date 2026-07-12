import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, GripVertical, ImagePlus, Plus, Save, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { Skeleton } from '../components/Skeleton.jsx';
import { api } from '../services/api.js';
import { useApiResource } from '../hooks/useApiResource.js';
import { localizedValue } from '../utils/localized.js';
import { MediaPicker, mediaAssetUrl } from '../components/MediaPicker.jsx';
import { classNames } from '../utils/format.js';

const sectionTypes = [
  'Hero Slider',
  'Breaking News',
  "Today's News",
  'Manual Cards',
  'News Categories',
  'Blog Categories',
  'Video News',
  'Ad Slot'
];

const sectionHints = {
  'Hero Slider': 'Select Source (News or Blogs) and Mode (Auto or Manual). You can also add custom manual slides which will appear first.',
  'Breaking News': 'Select breaking news manually, or automatically use latest breaking news.',
  "Today's News": 'Manual ordered news, or automatic latest news.',
  'Manual Cards': 'Create custom cards for the humanitarian crisis area.',
  'News Categories': 'Add categories, then choose manual news or automatic latest news per category.',
  'Blog Categories': 'Add categories, then choose manual blogs or automatic latest blogs per category.',
  'Video News': 'Manual video news, or automatic latest news with YouTube video URLs.',
  'Ad Slot': 'Create a custom ad placement ID. Use the same ID in Ads Management.'
};

const defaultSectionTitles = {
  'Hero Slider': { en: 'Hero Slider', bn: 'হিরো স্লাইডার' },
  'Breaking News': { en: 'Breaking News', bn: 'ব্রেকিং নিউজ' },
  "Today's News": { en: "Today's News", bn: 'আজকের সংবাদ' },
  'Manual Cards': { en: 'Humanitarian Crisis', bn: 'মানবিক সংকট' },
  'News Categories': { en: 'News Categories', bn: 'সংবাদ বিভাগ' },
  'Blog Categories': { en: 'Blog Categories', bn: 'ব্লগ বিভাগ' },
  'Video News': { en: 'Videos', bn: 'ভিডিও' },
  'Ad Slot': { en: 'Home Ad Slot', bn: 'হোম বিজ্ঞাপন' }
};

const MAX_MANUAL_CARDS = 5;

function cleanKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function itemId(item) {
  return item?._id || item;
}

function titleOf(item) {
  return localizedValue(item?.title, 'en') || localizedValue(item?.title, 'bn') || item?.name || item?.nameBn || item;
}

function normalizedSectionTitle(value, fallback = '') {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || fallback, bn: value?.bn || '' };
}

function sectionTitle(section) {
  return localizedValue(section?.title, 'en') || localizedValue(section?.title, 'bn') || section?.type || 'Homepage section';
}

function updateSectionTitle(section, lang, value) {
  return { ...normalizedSectionTitle(section.title, section.type), [lang]: value };
}

function normalizedLocalizedValue(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function inputClass() {
  return 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950';
}

function SearchModal({ isOpen, onClose, onSelect, collection, categoryType }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        let endpoint = '';
        const params = { limit: 20 };
        if (collection === 'news') { endpoint = '/news'; params.search = query; params.status = 'Published'; }
        if (collection === 'blogs') { endpoint = '/blogs'; params.search = query; params.status = 'Published'; }
        if (collection === 'categories') {
          endpoint = '/categories';
          params.search = query;
          if (categoryType) params.type = categoryType;
        }
        
        const res = await api.get(endpoint, { params });
        setResults(res.data.data.items || res.data.data || []);
      } catch (err) {
        window.console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen, collection, categoryType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize">Select {collection}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"><X size={20} /></button>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            autoFocus
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm dark:border-slate-700 dark:bg-slate-950"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700">
          {loading ? (
            <div className="p-4 text-center text-sm text-slate-500">Loading...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No results found</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {results.map(item => (
                <div key={item._id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="text-sm font-medium">{titleOf(item)}</div>
                  <Button size="sm" variant="secondary" onClick={() => onSelect(item)}>Select</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardImageSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase text-slate-500">Image</span>
        <div className="flex gap-2">
          {value && (
            <Button type="button" variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => onChange('')}>
              Clear
            </Button>
          )}
          <Button type="button" variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setOpen(true)}>
            <ImagePlus size={14} /> {value ? 'Change image' : 'Select image'}
          </Button>
        </div>
      </div>
      {value ? (
        <img
          src={value}
          alt=""
          className="aspect-video w-full rounded-lg border border-slate-200 object-cover dark:border-slate-700"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm font-semibold text-slate-500 dark:border-slate-700"
        >
          Select image from Media Library
        </button>
      )}
      <input
        key={value || 'empty-image-url'}
        className={inputClass()}
        placeholder="Or paste image URL"
        defaultValue={value || ''}
        onBlur={(event) => onChange(event.target.value)}
      />
      <MediaPicker
        open={open}
        value={null}
        onClose={() => setOpen(false)}
        onSelect={(item) => onChange(mediaAssetUrl(item))}
      />
    </div>
  );
}

export function HomepageBuilderPage() {
  const { data, loading, reload } = useApiResource('/homepage-sections');
  const [draggedSection, setDraggedSection] = useState(null);
  const [dragOverSection, setDragOverSection] = useState(null);
  const [newType, setNewType] = useState("Today's News");
  const [collapsed, setCollapsed] = useState(new Set());
  const [searchModal, setSearchModal] = useState(null);

  const orderedSections = useMemo(() => [...data].sort((a, b) => (a.order || 0) - (b.order || 0)), [data]);
  const refreshSections = () => reload({ showLoading: false });

  function toggleCollapse(id) {
    const next = new Set(collapsed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCollapsed(next);
  }

  async function createSection(sectionType = newType) {
    const title = defaultSectionTitles[sectionType] || { en: sectionType, bn: '' };
    const key = `${cleanKey(sectionType)}-${Date.now()}`;
    const adPosition = sectionType === 'Ad Slot' ? `home_${key}` : '';
    await api.post('/homepage-sections', {
      title,
      key,
      type: sectionType,
      order: orderedSections.length + 1,
      isActive: true,
      news: [],
      blogs: [],
      categories: [],
      cards: [],
      adPosition,
      settings: { mode: 'auto', limit: 6 }
    });
    refreshSections();
  }

  async function saveSection(section, patch = {}) {
    const next = { ...section, ...patch };
    await api.put(`/homepage-sections/${section._id}`, {
      title: next.title,
      key: next.key,
      type: next.type,
      order: next.order,
      isActive: Boolean(next.isActive),
      country: next.country?._id || next.country || null,
      news: (next.news || []).map(itemId),
      blogs: (next.blogs || []).map(itemId),
      categories: (next.categories || []).map(itemId),
      cards: (next.cards || []).map((card, index) => ({ ...card, order: index + 1 })),
      adPosition: next.adPosition || '',
      settings: {
        mode: next.settings?.mode || 'auto',
        limit: Number(next.settings?.limit || 6),
        layout: next.settings?.layout || '',
        source: next.settings?.source || 'news',
        crisisNumbers: {
          gaza: normalizedLocalizedValue(next.settings?.crisisNumbers?.gaza),
          sudan: normalizedLocalizedValue(next.settings?.crisisNumbers?.sudan),
          middleEast: normalizedLocalizedValue(next.settings?.crisisNumbers?.middleEast)
        }
      }
    });
    refreshSections();
  }

  function saveCrisisNumber(section, key, lang, value) {
    const currentValue = normalizedLocalizedValue(section.settings?.crisisNumbers?.[key]);
    return saveSection(section, {
      settings: {
        ...section.settings,
        crisisNumbers: {
          ...(section.settings?.crisisNumbers || {}),
          [key]: { ...currentValue, [lang]: value }
        }
      }
    });
  }

  async function deleteSection(section) {
    if (window.confirm('Are you sure you want to delete this section?')) {
      await api.delete(`/homepage-sections/${section._id}`);
      refreshSections();
    }
  }

  async function reorderSections(next) {
    await api.patch('/homepage-sections/reorder', {
      sections: next.map((section, index) => ({ id: section._id, order: index + 1 }))
    });
    refreshSections();
  }

  async function dropSection(targetIndex) {
    if (draggedSection === null || draggedSection === targetIndex) {
      setDraggedSection(null);
      setDragOverSection(null);
      return;
    }
    const next = [...orderedSections];
    const [item] = next.splice(draggedSection, 1);
    next.splice(targetIndex, 0, item);
    await reorderSections(next);
    setDraggedSection(null);
    setDragOverSection(null);
  }

  async function moveSection(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= orderedSections.length) return;
    const next = [...orderedSections];
    const [item] = next.splice(index, 1);
    next.splice(targetIndex, 0, item);
    await reorderSections(next);
  }

  async function removeCollectionItem(section, collection, id) {
    await saveSection(section, { [collection]: (section[collection] || []).filter((entry) => itemId(entry) !== id) });
  }

  async function handleSelectFromModal(item) {
    if (!searchModal) return;
    const { section, collection } = searchModal;
    const current = [...(section[collection] || [])];
    if (!current.find(e => itemId(e) === item._id)) {
      current.push(item);
      await saveSection(section, { [collection]: current });
    }
    setSearchModal(null);
  }

  async function updateCard(section, index, patch) {
    const cards = [...(section.cards || [])];
    cards[index] = { ...cards[index], ...patch };
    await saveSection(section, { cards });
  }

  async function addCard(section) {
    if (section.type === 'Manual Cards' && (section.cards || []).length >= MAX_MANUAL_CARDS) return;
    await saveSection(section, {
      cards: [
        ...(section.cards || []),
        { title: { en: 'Custom card', bn: 'কাস্টম কার্ড' }, description: { en: '', bn: '' }, buttonText: { en: 'Learn more', bn: 'আরও জানুন' }, imageUrl: '', link: '', order: (section.cards || []).length + 1 }
      ]
    });
  }

  async function removeCard(section, index) {
    await saveSection(section, { cards: (section.cards || []).filter((_, cardIndex) => cardIndex !== index) });
  }

  const ItemDropZone = ({ section, collection, label }) => (
    <div className="rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-700">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setSearchModal({
            section,
            collection,
            categoryType: collection === 'categories'
              ? (section.type === 'Blog Categories' ? 'blog' : 'news')
              : undefined
          })}
        >
          <Search size={14} className="mr-1" /> Add Items
        </Button>
      </div>
      <div className="space-y-2">
        {(section[collection] || []).map((item) => (
          <div
            key={itemId(item)}
            className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800"
          >
            <span className="line-clamp-1">{titleOf(item)}</span>
            <button type="button" className="text-slate-400 hover:text-red-600" onClick={() => removeCollectionItem(section, collection, itemId(item))}>
              <X size={15} />
            </button>
          </div>
        ))}
        {!section[collection]?.length && <div className="rounded-lg bg-slate-50 px-3 py-5 text-center text-sm text-slate-500 dark:bg-slate-800">No items selected</div>}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Homepage Builder"
        description="Drag sections, choose manual or automatic content, and create ad slots for frontend placements."
        actions={(
          <form
            className="flex gap-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const sectionType = new FormData(event.currentTarget).get('sectionType') || newType;
              await createSection(String(sectionType));
            }}
          >
            <select name="sectionType" className={inputClass()} value={newType} onChange={(event) => setNewType(event.target.value)}>
              {sectionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <Button type="submit"><Plus size={16} /> Add section</Button>
          </form>
        )}
      />

      <SearchModal 
        isOpen={!!searchModal} 
        onClose={() => setSearchModal(null)} 
        onSelect={handleSelectFromModal}
        collection={searchModal?.collection}
        categoryType={searchModal?.categoryType}
      />

      <div className="max-w-4xl">
        {loading ? <Skeleton /> : (
          <div className="space-y-3">
            {orderedSections.map((section, index) => {
              const isCollapsed = collapsed.has(section._id);
              return (
                <Card
                  key={section._id}
                  className={classNames(
                    'p-4 transition',
                    draggedSection === index && 'opacity-60',
                    dragOverSection === index && draggedSection !== index && 'ring-2 ring-brand-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950'
                  )}
                >
                  <div
                    className="flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                    onClick={() => toggleCollapse(section._id)}
                    onDragOver={(event) => {
                      if (draggedSection === null) return;
                      event.preventDefault();
                      event.dataTransfer.dropEffect = 'move';
                      setDragOverSection(index);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      dropSection(index);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="cursor-grab rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        draggable
                        aria-label={`Drag ${sectionTitle(section)}`}
                        onClick={(event) => event.stopPropagation()}
                        onDragStart={(event) => {
                          event.stopPropagation();
                          event.dataTransfer.effectAllowed = 'move';
                          event.dataTransfer.setData('text/plain', section._id);
                          setDraggedSection(index);
                        }}
                        onDragEnd={() => {
                          setDraggedSection(null);
                          setDragOverSection(null);
                        }}
                      >
                        <GripVertical className="text-slate-400" />
                      </button>
                      <button className="text-slate-500">{isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}</button>
                      <div>
                        <div className="font-semibold">{sectionTitle(section)}</div>
                        <div className="text-sm text-slate-500">{section.type} · Order {section.order}</div>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2"
                      onClick={e => e.stopPropagation()}
                      onDragOver={(event) => {
                        if (draggedSection === null) return;
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        setDragOverSection(index);
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        dropSection(index);
                      }}
                    >
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                        disabled={index === 0}
                        aria-label={`Move ${sectionTitle(section)} up`}
                        onClick={() => moveSection(index, -1)}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                        disabled={index === orderedSections.length - 1}
                        aria-label={`Move ${sectionTitle(section)} down`}
                        onClick={() => moveSection(index, 1)}
                      >
                        <ArrowDown size={16} />
                      </button>
                      <label className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800 cursor-pointer">
                        <input type="checkbox" checked={Boolean(section.isActive)} onChange={(event) => saveSection(section, { isActive: event.target.checked })} />
                        Active
                      </label>
                      <button type="button" className="p-2 text-slate-400 hover:text-red-600" onClick={() => deleteSection(section)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div
                    className="mt-3 h-1 rounded-full"
                    onDragOver={(event) => {
                      if (draggedSection === null) return;
                      event.preventDefault();
                      event.dataTransfer.dropEffect = 'move';
                      setDragOverSection(index);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      dropSection(index);
                    }}
                  />

                  {!isCollapsed && (
                    <div
                      className="mt-3 border-t border-slate-100 pt-4 dark:border-slate-800"
                      onDragOver={(event) => {
                        if (draggedSection === null) return;
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        setDragOverSection(index);
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        dropSection(index);
                      }}
                    >
                      <div className="grid gap-3 lg:grid-cols-2">
                        <FormField label="Section title English">
                          <input
                            key={`${section._id}-title-en`}
                            className={inputClass()}
                            defaultValue={localizedValue(section.title, 'en')}
                            onBlur={(event) => saveSection(section, { title: updateSectionTitle(section, 'en', event.target.value) })}
                          />
                        </FormField>
                        <FormField label="Section title Bangla">
                          <input
                            key={`${section._id}-title-bn`}
                            dir="auto"
                            lang="bn"
                            className={inputClass()}
                            defaultValue={localizedValue(section.title, 'bn')}
                            onBlur={(event) => saveSection(section, { title: updateSectionTitle(section, 'bn', event.target.value) })}
                          />
                        </FormField>
                        <FormField label="Key">
                          <input className={inputClass()} defaultValue={section.key} onBlur={(event) => saveSection(section, { key: cleanKey(event.target.value) })} />
                        </FormField>
                        {section.type !== 'Manual Cards' && (
                          <FormField label="Mode">
                            <select className={inputClass()} value={section.settings?.mode || 'auto'} onChange={(event) => saveSection(section, { settings: { ...section.settings, mode: event.target.value } })}>
                              <option value="auto">Auto latest</option>
                              <option value="manual">Manual selected</option>
                            </select>
                          </FormField>
                        )}
                      </div>

                      <p className="mt-2 mb-4 text-xs text-slate-500">{sectionHints[section.type]}</p>

                      <div className="grid gap-4">
                        {['Breaking News', "Today's News", 'Video News'].includes(section.type) && (
                          <ItemDropZone section={section} collection="news" label="Manual News Selection" />
                        )}

                        {section.type === 'Hero Slider' && (
                          <div className="space-y-4">
                            <FormField label="Source Content">
                              <select className={inputClass()} value={section.settings?.source || 'news'} onChange={(event) => saveSection(section, { settings: { ...section.settings, source: event.target.value } })}>
                                <option value="news">News</option>
                                <option value="blogs">Blogs</option>
                              </select>
                            </FormField>
                            
                            {section.settings?.mode === 'manual' && section.settings?.source === 'news' && (
                              <ItemDropZone section={section} collection="news" label="Manual News Selection" />
                            )}
                            
                            {section.settings?.mode === 'manual' && section.settings?.source === 'blogs' && (
                              <ItemDropZone section={section} collection="blogs" label="Manual Blogs Selection" />
                            )}
                            
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
                              <h4 className="text-sm font-semibold mb-2">Custom Manual Slides</h4>
                              <p className="text-xs text-slate-500 mb-3">These will appear in the slider regardless of the dynamic source selected above.</p>
                              <div className="space-y-3">
                                {(section.cards || []).map((card, cardIndex) => (
                                  <div key={card._id || cardIndex} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                                    <div className="mb-3 flex items-center justify-between">
                                      <span className="text-sm font-semibold">Slide {cardIndex + 1}</span>
                                      <button type="button" className="text-slate-400 hover:text-red-600" onClick={() => removeCard(section, cardIndex)}><X size={15} /></button>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-2">
                                      <input className={inputClass()} placeholder="Title English" defaultValue={card.title?.en || ''} onBlur={(event) => updateCard(section, cardIndex, { title: { ...card.title, en: event.target.value } })} />
                                      <input className={inputClass()} placeholder="Title Bangla" defaultValue={card.title?.bn || ''} onBlur={(event) => updateCard(section, cardIndex, { title: { ...card.title, bn: event.target.value } })} />
                                      <input className={inputClass()} placeholder="Button text English" defaultValue={card.buttonText?.en || ''} onBlur={(event) => updateCard(section, cardIndex, { buttonText: { ...card.buttonText, en: event.target.value } })} />
                                      <input className={inputClass()} placeholder="Button text Bangla" defaultValue={card.buttonText?.bn || ''} onBlur={(event) => updateCard(section, cardIndex, { buttonText: { ...card.buttonText, bn: event.target.value } })} />
                                      <CardImageSelector value={card.imageUrl || ''} onChange={(imageUrl) => updateCard(section, cardIndex, { imageUrl })} />
                                      <input className={inputClass()} placeholder="Button URL" defaultValue={card.link || ''} onBlur={(event) => updateCard(section, cardIndex, { link: event.target.value })} />
                                    </div>
                                  </div>
                                ))}
                                <Button type="button" onClick={() => addCard(section)}><Plus size={16} /> Add custom slide</Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {section.type === 'News Categories' && (
                          <>
                            <ItemDropZone section={section} collection="categories" label="Selected Categories" />
                            {section.settings?.mode === 'manual' && <ItemDropZone section={section} collection="news" label="Manual News for these Categories" />}
                          </>
                        )}

                        {section.type === 'Blog Categories' && (
                          <>
                            <ItemDropZone section={section} collection="categories" label="Selected Categories" />
                            {section.settings?.mode === 'manual' && <ItemDropZone section={section} collection="blogs" label="Manual Blogs for these Categories" />}
                          </>
                        )}

                        {section.type === 'Manual Cards' && (
                          <div className="space-y-3">
                            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
                              This section uses the static homepage crisis cards. Only the displayed numbers can be changed here.
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              <FormField label="Gaza number English">
                                <input className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.gaza, 'en')} placeholder="100K+" onBlur={(event) => saveCrisisNumber(section, 'gaza', 'en', event.target.value)} />
                              </FormField>
                              <FormField label="Gaza number Bangla">
                                <input dir="auto" lang="bn" className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.gaza, 'bn')} placeholder="১ লক্ষ+" onBlur={(event) => saveCrisisNumber(section, 'gaza', 'bn', event.target.value)} />
                              </FormField>
                              <FormField label="Sudan number English">
                                <input className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.sudan, 'en')} placeholder="20,000+" onBlur={(event) => saveCrisisNumber(section, 'sudan', 'en', event.target.value)} />
                              </FormField>
                              <FormField label="Sudan number Bangla">
                                <input dir="auto" lang="bn" className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.sudan, 'bn')} placeholder="২০,০০০+" onBlur={(event) => saveCrisisNumber(section, 'sudan', 'bn', event.target.value)} />
                              </FormField>
                              <FormField label="Middle East number English">
                                <input className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.middleEast, 'en')} placeholder="1,000+" onBlur={(event) => saveCrisisNumber(section, 'middleEast', 'en', event.target.value)} />
                              </FormField>
                              <FormField label="Middle East number Bangla">
                                <input dir="auto" lang="bn" className={inputClass()} defaultValue={localizedValue(section.settings?.crisisNumbers?.middleEast, 'bn')} placeholder="১,০০০+" onBlur={(event) => saveCrisisNumber(section, 'middleEast', 'bn', event.target.value)} />
                              </FormField>
                            </div>
                          </div>
                        )}

                        {section.type === 'Ad Slot' && (
                          <FormField label="Ad placement ID">
                            <input className={inputClass()} defaultValue={section.adPosition || `home_${section.key}`} onBlur={(event) => saveSection(section, { adPosition: cleanKey(event.target.value).replaceAll('-', '_') })} />
                          </FormField>
                        )}

                        <div className="flex items-end justify-between mt-4">
                          {section.type !== 'Manual Cards' && (
                            <FormField label="Item Limit">
                              <input type="number" min="1" max="24" className={inputClass()} defaultValue={section.settings?.limit || 6} onBlur={(event) => saveSection(section, { settings: { ...section.settings, limit: Number(event.target.value || 6) } })} />
                            </FormField>
                          )}
                          <Button type="button" onClick={() => saveSection(section)}><Save size={16} /> Save Changes</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
