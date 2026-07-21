import { useEffect, useState } from 'react';
import { BadgeDollarSign, BarChart3, BookOpenText, FileText, HelpCircle, Home, Images, LayoutDashboard, LogOut, Megaphone, Menu, MessageSquareText, Moon, Settings, Sun, Users, X } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.js';
import { hideToast, toggleTheme } from '../store/uiSlice.js';
import { classNames } from '../utils/format.js';
import { hasPermission } from '../utils/roles.js';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: 'dashboard:read' },
  { to: '/news', label: 'News', icon: FileText, permission: 'news:read', children: [{ to: '/news', label: 'News list' }, { to: '/news-categories', label: 'Categories', permission: 'category:read' }] },
  { to: '/blogs', label: 'Blogs', icon: BookOpenText, permission: 'blog:read', children: [{ to: '/blogs', label: 'Blog list' }, { to: '/blog-categories', label: 'Categories', permission: 'category:read' }] },
  { to: '/media-achievements', label: 'Media Achievements', icon: Images, permission: 'mediaAchievement:read' },
  { to: '/social-posts', label: 'Social Posts', icon: MessageSquareText, permission: 'socialPost:read' },
  { to: '/notices', label: 'Notices', icon: Megaphone, permission: 'notice:read' },
  { to: '/advertisements', label: 'Ads Management', icon: BadgeDollarSign, permission: 'advertisement:read' },
  { to: '/media', label: 'Media Library', icon: Images, permission: 'media:read' },
  { to: '/homepage', label: 'Homepage Builder', icon: Home, permission: 'homepage:update' },
  { to: '/menus', label: 'Header Menu', icon: Menu, permission: 'menu:read' },
  { to: '/faqs', label: 'FAQs', icon: HelpCircle, permission: 'faq:read' },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, permission: 'analytics:read' },
  { to: '/users', label: 'Users', icon: Users, permission: 'user:read' },
  { to: '/settings', label: 'Settings', icon: Settings, permission: 'settings:read' }
];

export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode, toast } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(hideToast()), 3000);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  return (
    <div className={classNames('min-h-screen', darkMode && 'dark')}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-20 bg-slate-950/50 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
        <aside className={classNames(
          "no-print fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 transition-transform lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="mb-8 flex items-center justify-between px-3">
            <div>
              <div className="text-xl font-bold text-slate-950 dark:text-white">Newsroom CMS</div>
              <div className="text-sm text-slate-500">Mazlum Ummah Admin Console</div>
            </div>
            <button className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-1">
            {navItems
              .filter((item) => !item.permission || hasPermission(user?.role, item.permission))
              .map((item) => (
                <div key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      classNames(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                        isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )
                    }
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="mt-1 ml-6 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-800">
                      {item.children
                        .filter((child) => !child.permission || hasPermission(user?.role, child.permission))
                        .map(child => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              classNames(
                                'block rounded-lg px-3 py-2 text-sm font-medium transition',
                                isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </nav>
        </aside>
        <main className="flex min-h-screen flex-1 flex-col lg:pl-72">
          <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
              <div>
                <div className="text-sm text-slate-500">Welcome back</div>
                <div className="font-semibold">{user?.name || 'Editor'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 p-2 dark:border-slate-700" onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="rounded-lg border border-slate-200 p-2 text-red-600 dark:border-slate-700"
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                }}
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>
          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </section>
        </main>
      </div>
      {toast && (
        <button onClick={() => dispatch(hideToast())} className="fixed right-5 top-5 z-50 rounded-lg bg-slate-950 px-4 py-3 text-sm text-white shadow-soft dark:bg-white dark:text-slate-950">
          {toast}
        </button>
      )}
    </div>
  );
}
