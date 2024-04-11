import itemIcon from '../icons/item.svg';

export const pathToModel = (model = null, slug = '') => {
  if (model === 'post') {
    return `/post/${slug}`;
  } else {
    return `/${slug}`;
  }
};

// TODO: REFACTOR THIS...
export const getCtaUrl = (cta) => {
  if (typeof cta === 'string') {
    return '/' + cta;
  }

  if (cta.model) {
    const { apiKey: model } = cta.model;
    return pathToModel(model, cta.slug);
  }

  if (cta.content?.model) {
    const { apiKey: model } = cta.content?.model;
    return pathToModel(model, cta.content?.slug);
  }

  if (cta.link?.content?.model) {
    const { apiKey: model } = cta.link?.content?.model;
    return pathToModel(model, cta.link?.content?.slug);
  }

  if (cta.content?.slug) {
    return `/${cta.content.slug}`;
  }

  if (cta.slug) {
    return `/${cta.slug}`;
  }

  const url = cta.link?.content ? '/' + cta.link?.content?.slug : cta.link?.url;
  return url;
};

// Sidebar
export const getSidebarLinksFromBlocks = (blocks = []) => {
  return blocks.map((b) => ({
    id: b.id,
    label: b.__typename === 'DatoCmsSectionTitle' ? b.title : b.internalName,
    wrapper: b.__typename === 'DatoCmsSectionTitle',
    icon: itemIcon,
  }));
};
