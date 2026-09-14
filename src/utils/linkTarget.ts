const staysOnPage = (href: string) =>
  href.startsWith('#') ||
  href.startsWith('tel:') ||
  href.startsWith('mailto:') ||
  href.startsWith('sms:');

type NewTabAttrs = {
  target?: '_blank';
  rel?: 'noopener noreferrer';
};

export const newTabProps = (href?: string): NewTabAttrs => {
  if (!href || staysOnPage(href)) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
};
