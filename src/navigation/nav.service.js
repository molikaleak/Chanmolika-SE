export function getActiveNav(pathname, navItems) {
  return navItems.find(item => pathname.startsWith(item.path));
}
