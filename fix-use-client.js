const fs = require('fs');

const files = [
  'frontend/app/(root)/gallery/components/gallery-grid.tsx',
  'frontend/app/(root)/media-achievements/page.tsx',
  'frontend/app/(root)/social-posts/page.tsx',
  'frontend/components/home/gallery-section/index.tsx',
  'frontend/app/(root)/notice/page.tsx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('"use client";')) {
    content = content.replace('"use client";', '');
    content = '"use client";\n' + content;
    fs.writeFileSync(f, content);
  }
}

console.log("Fixed use client");
