# API Documentation

Base URL: `http://localhost:4000/api/v1`

Protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Login with email and password |
| POST | `/auth/refresh` | Issue a new access token using refresh token |
| POST | `/auth/logout` | Invalidate refresh tokens for current user |
| GET | `/auth/me` | Current authenticated user |
| POST | `/auth/forgot-password` | Create password reset token |
| POST | `/auth/reset-password` | Reset password using token |

Login body:

```json
{
  "email": "superadmin@news.local",
  "password": "Admin123!"
}
```

## News

| Method | Endpoint | Permission | Description |
| --- | --- | --- | --- |
| GET | `/news` | `news:read` | List news with pagination, search, filters |
| POST | `/news` | `news:create` | Create news |
| GET | `/news/:id` | `news:read` | Get news by id |
| PUT | `/news/:id` | `news:*` or `news:update-own` | Update news |
| DELETE | `/news/:id` | `news:*` | Delete news |
| POST | `/news/bulk` | `news:*` | Bulk delete, publish, or category update |

List query parameters:

```text
page, limit, sort, search, status, country, mainCategory, language,
breakingNews, featuredNews, videoNews, isTrending, isPinned
```

News body supports all CMS fields:

```json
{
  "title": "Story title",
  "subtitle": "Optional subtitle",
  "shortDescription": "Summary",
  "content": "<p>Rich HTML content</p>",
  "status": "Draft",
  "country": ["<countryId>"],
  "mainCategory": "<categoryId>",
  "subCategory": "<categoryId>",
  "tags": ["<tagId>"],
  "tagNames": ["election", "analysis"],
  "breakingNews": true,
  "featuredNews": false,
  "countryWiseFeaturedNews": false,
  "mostRead": false,
  "videoNews": false,
  "seoTitle": "SEO title",
  "seoDescription": "SEO description",
  "seoKeywords": ["news", "cms"],
  "language": "en",
  "isTrending": true,
  "isHeadline": true,
  "isPinned": false,
  "priorityOrder": 1,
  "homepagePosition": "hero-1",
  "copyrightProtected": true,
  "allowComments": true
}
```

## Blogs

Blogs use the same bilingual content shape as news, but do not include homepage positioning or breaking/featured news placement controls.

| Method | Endpoint | Permission | Description |
| --- | --- | --- | --- |
| GET | `/blogs` | `blog:read` | List blogs with pagination, search, filters |
| POST | `/blogs` | `blog:create` | Create bilingual blog |
| GET | `/blogs/:id` | `blog:read` | Get blog by id |
| PUT | `/blogs/:id` | `blog:*` or `blog:update-own` | Update blog |
| DELETE | `/blogs/:id` | `blog:*` | Delete blog |
| POST | `/blogs/bulk` | `blog:*` | Bulk delete, publish, or category update |

Blog localized fields:

```json
{
  "title": { "en": "English title", "bn": "বাংলা শিরোনাম" },
  "subtitle": { "en": "English subtitle", "bn": "বাংলা সাবটাইটেল" },
  "shortDescription": { "en": "English summary", "bn": "বাংলা সারাংশ" },
  "content": { "en": "<p>English content</p>", "bn": "<p>বাংলা কনটেন্ট</p>" },
  "seoTitle": "Single meta title",
  "seoDescription": "Single meta description",
  "language": "both",
  "status": "Draft"
}
```

## Taxonomy

| Method | Endpoint | Description |
| --- | --- | --- |
| GET/POST | `/categories` | List or create categories |
| GET/PUT/DELETE | `/categories/:id` | Read, update, delete category |
| GET/POST | `/countries` | List or create countries |
| GET/PUT/DELETE | `/countries/:id` | Read, update, delete country |

## Media

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/media` | List media with folder/type/search filters |
| POST | `/media` | Upload image or video using multipart `file` |
| DELETE | `/media/:id` | Delete media record |

Upload body: `multipart/form-data` fields `file`, `folder`, `altText`.

## Homepage Builder

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/homepage-sections` | List active/inactive homepage blocks |
| POST | `/homepage-sections` | Create a section |
| PUT | `/homepage-sections/:id` | Update section and assigned news |
| PATCH | `/homepage-sections/reorder` | Drag-drop reorder persistence |
| DELETE | `/homepage-sections/:id` | Delete section |

Section types:

- Hero Slider
- Breaking News
- Featured News
- Country-wise News
- Most Read
- Video News
- Editor Picks
- Trending News

## Analytics

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/analytics/dashboard` | Dashboard widgets and daily events |
| GET | `/analytics/track-view/:id` | Track public news view |
| GET | `/analytics/short/:code` | Short URL redirect and tracking |

## Users, Comments, Settings

| Method | Endpoint | Description |
| --- | --- | --- |
| GET/POST | `/users` | List/create users |
| GET/PUT/DELETE | `/users/:id` | Manage users |
| GET/PUT/DELETE | `/comments/:id` | Moderate comments |
| GET/PUT | `/settings` | Platform settings and content protection |

## Public API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/public/homepage` | Published homepage sections |
| GET | `/public/news/:slug` | Published article |
| GET | `/public/blogs` | Published blogs |
| GET | `/public/blogs/:slug` | Published blog |
| POST | `/public/comments` | Submit comment |
| GET | `/public/rss` | RSS feed |

## Error Shape

```json
{
  "success": false,
  "message": "Validation failed",
  "details": {}
}
```
