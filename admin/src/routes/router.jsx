import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { AdvertisementEditorPage } from '../pages/AdvertisementEditorPage.jsx';
import { AdvertisementListPage } from '../pages/AdvertisementListPage.jsx';
import { AdminLayout } from '../layouts/AdminLayout.jsx';
import { AnalyticsPage } from '../pages/AnalyticsPage.jsx';
import { BlogEditorPage } from '../pages/BlogEditorPage.jsx';
import { BlogListPage } from '../pages/BlogListPage.jsx';
import { CategoriesPage } from '../pages/CategoriesPage.jsx';
import { CountriesPage } from '../pages/CountriesPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { FaqManagementPage } from '../pages/FaqManagementPage.jsx';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.jsx';
import { HomepageBuilderPage } from '../pages/HomepageBuilderPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { MediaLibraryPage } from '../pages/MediaLibraryPage.jsx';
import { MediaAchievementEditorPage } from '../pages/MediaAchievementEditorPage.jsx';
import { MediaAchievementListPage } from '../pages/MediaAchievementListPage.jsx';
import { MenuManagementPage } from '../pages/MenuManagementPage.jsx';
import { NewsEditorPage } from '../pages/NewsEditorPage.jsx';
import { NewsListPage } from '../pages/NewsListPage.jsx';
import { NoticeEditorPage } from '../pages/NoticeEditorPage.jsx';
import { NoticeListPage } from '../pages/NoticeListPage.jsx';
import { ResetPasswordPage } from '../pages/ResetPasswordPage.jsx';
import { SettingsPage } from '../pages/SettingsPage.jsx';
import { SocialPostEditorPage } from '../pages/SocialPostEditorPage.jsx';
import { SocialPostListPage } from '../pages/SocialPostListPage.jsx';
import { UsersPage } from '../pages/UsersPage.jsx';
import { SubscriberListPage } from '../pages/SubscriberListPage.jsx';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/news', element: <NewsListPage /> },
          { path: '/news/create', element: <NewsEditorPage /> },
          { path: '/news/:id/edit', element: <NewsEditorPage /> },
          { path: '/blogs', element: <BlogListPage /> },
          { path: '/blogs/create', element: <BlogEditorPage /> },
          { path: '/blogs/:id/edit', element: <BlogEditorPage /> },
          { path: '/media-achievements', element: <MediaAchievementListPage /> },
          { path: '/media-achievements/create', element: <MediaAchievementEditorPage /> },
          { path: '/media-achievements/:id/edit', element: <MediaAchievementEditorPage /> },
          { path: '/social-posts', element: <SocialPostListPage /> },
          { path: '/social-posts/create', element: <SocialPostEditorPage /> },
          { path: '/social-posts/:id/edit', element: <SocialPostEditorPage /> },
          { path: '/notices', element: <NoticeListPage /> },
          { path: '/notices/create', element: <NoticeEditorPage /> },
          { path: '/notices/:id/edit', element: <NoticeEditorPage /> },
          { path: '/advertisements', element: <AdvertisementListPage /> },
          { path: '/advertisements/create', element: <AdvertisementEditorPage /> },
          { path: '/advertisements/:id/edit', element: <AdvertisementEditorPage /> },
          { path: '/news-categories', element: <CategoriesPage type="news" /> },
          { path: '/blog-categories', element: <CategoriesPage type="blog" /> },
          { path: '/media', element: <MediaLibraryPage /> },
          { path: '/homepage', element: <HomepageBuilderPage /> },
          { path: '/menus', element: <MenuManagementPage /> },
          { path: '/faqs', element: <FaqManagementPage /> },
          { path: '/analytics', element: <AnalyticsPage /> },
          { path: '/users', element: <UsersPage /> },
          { path: '/settings', element: <SettingsPage /> },
          { path: '/subscribers', element: <SubscriberListPage /> }
        ]
      }
    ]
  }
]);
