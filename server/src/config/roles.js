export const roles = ['Super Admin', 'Admin', 'Editor', 'Journalist', 'Moderator'];

export const permissions = {
  'Super Admin': ['*'],
  Admin: ['dashboard:read', 'news:*', 'blog:*', 'mediaAchievement:*', 'socialPost:*', 'notice:*', 'advertisement:*', 'menu:*', 'faq:*', 'category:*', 'country:*', 'media:*', 'homepage:*', 'analytics:read', 'user:*', 'settings:*'],
  Editor: ['dashboard:read', 'news:*', 'blog:*', 'mediaAchievement:*', 'socialPost:*', 'notice:*', 'advertisement:*', 'menu:*', 'faq:*', 'category:read', 'country:read', 'media:*', 'homepage:*', 'analytics:read'],
  Journalist: ['dashboard:read', 'news:create', 'news:read', 'news:update-own', 'blog:create', 'blog:read', 'blog:update-own', 'mediaAchievement:create', 'mediaAchievement:read', 'socialPost:create', 'socialPost:read', 'notice:read', 'media:create', 'media:read'],
  Moderator: ['dashboard:read', 'news:read', 'blog:read', 'mediaAchievement:read', 'socialPost:read', 'notice:read', 'comment:*', 'analytics:read']
};

export function hasPermission(role, permission) {
  const rolePermissions = permissions[role] || [];
  const [resource] = permission.split(':');
  return rolePermissions.includes('*') || rolePermissions.includes(permission) || rolePermissions.includes(`${resource}:*`);
}
