import defaultSettings from '@/settings';

const title = defaultSettings.title || 'Vue3 Element Admin';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
