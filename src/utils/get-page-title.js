import defaultSettings from '@/settings';

const title = defaultSettings.title || 'Vue3 ElementPlus Admin';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
