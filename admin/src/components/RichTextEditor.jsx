import { Bold, Heading1, Heading2, ImagePlus, Italic, Link, List, ListOrdered, Pilcrow, Quote, Redo2, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MediaPicker, mediaAssetUrl } from './MediaPicker.jsx';

const tools = [
  { command: 'formatBlock', value: 'p', icon: Pilcrow, label: 'Paragraph' },
  { command: 'formatBlock', value: 'h1', icon: Heading1, label: 'Heading 1' },
  { command: 'formatBlock', value: 'h2', icon: Heading2, label: 'Heading 2' },
  { command: 'bold', icon: Bold, label: 'Bold' },
  { command: 'italic', icon: Italic, label: 'Italic' },
  { command: 'insertUnorderedList', icon: List, label: 'Bullet list' },
  { command: 'insertOrderedList', icon: ListOrdered, label: 'Numbered list' },
  { command: 'formatBlock', value: 'blockquote', icon: Quote, label: 'Quote' },
  { command: 'undo', icon: Undo2, label: 'Undo' },
  { command: 'redo', icon: Redo2, label: 'Redo' }
];

function editorDocument(iframe) {
  return iframe?.contentDocument || iframe?.contentWindow?.document || null;
}

function editorStyles() {
  return `
    html { color-scheme: light; }
    body {
      min-height: 360px;
      margin: 0;
      padding: 20px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 16px;
      line-height: 1.75;
      color: #0f172a;
      background: #fff;
      outline: none;
    }
    body:empty::before { content: "Start writing your article..."; color: #94a3b8; }
    h1 { margin: 24px 0 14px; font-size: 32px; line-height: 1.2; font-weight: 800; }
    h2 { margin: 22px 0 12px; font-size: 24px; line-height: 1.25; font-weight: 800; }
    p { margin: 0 0 16px; }
    ul { margin: 0 0 16px; padding-left: 24px; list-style: disc; }
    ol { margin: 0 0 16px; padding-left: 24px; list-style: decimal; }
    blockquote { margin: 0 0 16px; padding: 12px 16px; border-left: 4px solid #465fff; background: #f8fafc; color: #334155; font-style: italic; }
    a { color: #465fff; font-weight: 700; text-decoration: underline; }
    figure { margin: 20px 0; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; }
    img { display: block; max-width: 100%; height: auto; }
    figcaption { padding: 8px 12px; text-align: center; font-size: 12px; color: #64748b; }
  `;
}

export function RichTextEditor({ value, onChange, dir = 'ltr', lang = 'en' }) {
  const iframeRef = useRef(null);
  const selectionRef = useRef(null);
  const lastHtmlRef = useRef('');
  const dirtyRef = useRef(false);
  const debounceRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  function getDoc() {
    return editorDocument(iframeRef.current);
  }

  function getBody() {
    return getDoc()?.body || null;
  }

  function emitChange() {
    const html = getBody()?.innerHTML || '';
    lastHtmlRef.current = html;
    dirtyRef.current = false;
    onChange(html);
  }

  function scheduleChange() {
    dirtyRef.current = true;
    lastHtmlRef.current = getBody()?.innerHTML || '';
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(emitChange, 500);
  }

  function saveSelection() {
    const win = iframeRef.current?.contentWindow;
    const doc = getDoc();
    const selection = win?.getSelection();
    if (!selection?.rangeCount || !doc?.body) return;
    const range = selection.getRangeAt(0);
    if (doc.body.contains(range.commonAncestorContainer)) selectionRef.current = range.cloneRange();
  }

  function restoreSelection() {
    const win = iframeRef.current?.contentWindow;
    const doc = getDoc();
    if (!win || !doc?.body) return;
    doc.body.focus();
    const selection = win.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    if (selectionRef.current) {
      selection.addRange(selectionRef.current);
      return;
    }
    const range = doc.createRange();
    range.selectNodeContents(doc.body);
    range.collapse(false);
    selection.addRange(range);
  }

  function initializeEditor() {
    const doc = getDoc();
    if (!doc) return;
    doc.open();
    doc.write(`<!doctype html><html><head><style>${editorStyles()}</style></head><body contenteditable="true" dir="${dir}" lang="${lang}"></body></html>`);
    doc.close();
    doc.designMode = 'on';
    doc.body.innerHTML = value || '';
    lastHtmlRef.current = value || '';
    doc.body.addEventListener('input', scheduleChange);
    doc.body.addEventListener('keyup', saveSelection);
    doc.body.addEventListener('mouseup', saveSelection);
    doc.body.addEventListener('click', saveSelection);
    doc.body.addEventListener('blur', emitChange);
    setReady(true);
  }

  useEffect(() => {
    if (!ready) return;
    const body = getBody();
    const nextValue = value || '';
    if (!body || dirtyRef.current || nextValue === lastHtmlRef.current || nextValue === body.innerHTML) return;
    body.innerHTML = nextValue;
    lastHtmlRef.current = nextValue;
  }, [value, ready]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ready && iframeRef.current) {
        initializeEditor();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [ready]);

  function run(command, commandValue = null) {
    const doc = getDoc();
    if (!doc) return;
    clearTimeout(debounceRef.current);
    emitChange();
    restoreSelection();
    doc.execCommand(command, false, commandValue);
    emitChange();
    saveSelection();
  }

  function addLink() {
    const url = window.prompt('Enter URL');
    if (url) run('createLink', url);
  }

  function insertImage(item) {
    const doc = getDoc();
    if (!doc || !item) return;
    clearTimeout(debounceRef.current);
    emitChange();
    restoreSelection();
    const src = mediaAssetUrl(item);
    const alt = item.altText || item.originalName || '';
    doc.execCommand('insertHTML', false, `<figure><img src="${src}" alt="${alt}" /><figcaption>${alt}</figcaption></figure><p><br></p>`);
    emitChange();
    saveSelection();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
        {tools.map((tool) => (
          <button
            key={`${tool.command}-${tool.value || ''}`}
            type="button"
            title={tool.label}
            className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onMouseDown={(event) => {
              event.preventDefault();
              run(tool.command, tool.value);
            }}
          >
            <tool.icon size={17} />
          </button>
        ))}
        <button
          type="button"
          title="Insert link"
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          onMouseDown={(event) => {
            event.preventDefault();
            addLink();
          }}
        >
          <Link size={17} />
        </button>
        <button
          type="button"
          title="Insert image"
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          onMouseDown={(event) => {
            event.preventDefault();
            saveSelection();
            setMediaOpen(true);
          }}
        >
          <ImagePlus size={17} />
        </button>
      </div>
      <iframe
        ref={iframeRef}
        title={`Content editor ${lang}`}
        className="block min-h-96 w-full bg-white"
        onLoad={() => { if (!ready) initializeEditor(); }}
      />
      <MediaPicker open={mediaOpen} value={null} onClose={() => setMediaOpen(false)} onSelect={insertImage} />
    </div>
  );
}
