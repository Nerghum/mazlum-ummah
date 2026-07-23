const fs = require('fs');

// 1. app/(root)/gallery/components/gallery-grid.tsx
let f1 = 'frontend/app/(root)/gallery/components/gallery-grid.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = `import GalleryGridSkeleton from "./gallery-grid.skeleton";\n` + c1;
c1 = c1.replace(/\{\s*loading\s*\?\s*\(\s*\)\s*:\s*pageItems\.length\s*>\s*0\s*\?\s*\(/g, '{loading ? (\n        <GalleryGridSkeleton />\n      ) : pageItems.length > 0 ? (');
fs.writeFileSync(f1, c1);

// 2. app/(root)/media-achievements/page.tsx
let f2 = 'frontend/app/(root)/media-achievements/page.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = `import MediaAchievementPageSkeleton from "./page.skeleton";\n` + c2;
c2 = c2.replace(/\{\s*loading\s*\?\s*\(\s*\)\s*:\s*\(/g, '{loading ? (\n        <MediaAchievementPageSkeleton />\n      ) : (');
fs.writeFileSync(f2, c2);

// 3. app/(root)/social-posts/page.tsx
let f3 = 'frontend/app/(root)/social-posts/page.tsx';
let c3 = fs.readFileSync(f3, 'utf8');
c3 = `import SocialFeedSkeleton from "./components/social-feed.skeleton";\n` + c3;
c3 = c3.replace(/\{\s*loading\s*\?\s*:\s*<SocialFeed posts=\{posts\} \/>\s*\}/g, '{loading ? <SocialFeedSkeleton /> : <SocialFeed posts={posts} />}');
fs.writeFileSync(f3, c3);

// 4. components/home/gallery-section/index.tsx
let f4 = 'frontend/components/home/gallery-section/index.tsx';
let c4 = fs.readFileSync(f4, 'utf8');
c4 = `import GallerySectionSkeleton from "./gallery-section.skeleton";\n` + c4;
c4 = c4.replace(/\{\s*loading\s*\?\s*\(\s*\)\s*:\s*items\.length\s*>\s*0\s*\?\s*\(/g, '{loading ? (\n        <GallerySectionSkeleton />\n      ) : items.length > 0 ? (');
fs.writeFileSync(f4, c4);

// 5. app/(root)/notice/page.tsx
let f5 = 'frontend/app/(root)/notice/page.tsx';
let c5 = fs.readFileSync(f5, 'utf8');
c5 = `import NoContentSkeleton from "@/components/no-content/no-content.skeleton";\n` + c5;
c5 = c5.replace(/\{\s*loading\s*&&\s*\}/g, '{loading && <NoContentSkeleton />}');
fs.writeFileSync(f5, c5);

// 6. app/loading.tsx
let f6 = 'frontend/app/loading.tsx';
let c6 = fs.readFileSync(f6, 'utf8');
c6 = c6.replace('import logo from "@/assets/logo.png";', '');
c6 = c6.replace('src={logo}', 'src="/logo.png"');
fs.writeFileSync(f6, c6);

// 7. app/(root)/notice/loading.tsx - remove SectionBoundary import from notice loading, wait we copied it so it should resolve now!

console.log("Fixed syntax errors");
