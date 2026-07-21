export const roles = ['Super Admin', 'Admin', 'Editor', 'Journalist', 'Moderator'];

export const permissions = {
  'Super Admin': ['*'],
  Admin: ['dashboard:read', 'news:*', 'blog:*', 'mediaAchievement:*', 'socialPost:*', 'notice:*', 'advertisement:*', 'menu:*', 'faq:*', 'category:*', 'country:*', 'media:*', 'homepage:*', 'analytics:*', 'settings:*'],
  Editor: ['dashboard:read', 'news:*', 'blog:*', 'mediaAchievement:*', 'socialPost:*', 'notice:*', 'media:*', 'category:read', 'country:read'],
  Journalist: ['dashboard:read', 'news:create', 'news:read', 'news:update-own', 'news:delete-own', 'blog:create', 'blog:read', 'blog:update-own', 'blog:delete-own', 'media:create', 'media:read', 'category:read', 'country:read'],
  Moderator: ['dashboard:read', 'news:read', 'blog:read', 'mediaAchievement:read', 'socialPost:read', 'notice:read', 'comment:*', 'analytics:read']
};

export function hasPermission(role, permission) {
  const rolePermissions = permissions[role] || [];
  const [resource] = permission.split(':');
  return rolePermissions.includes('*') || rolePermissions.includes(permission) || rolePermissions.includes(`${resource}:*`);
}
