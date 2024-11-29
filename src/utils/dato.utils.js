import itemIcon from '../icons/item.svg';

export const pathToModel = (model = null, slug = '') => {
  if (model === 'post') {
    return `/post/${slug}`;
  } else {
    return `/${slug}`;
  }
};

// Sidebar
export const getSidebarLinksFromBlocks = (blocks = []) => {
  return blocks.map((b) => {
    if (b.__typename !== 'DatoCmsComponentInfo') {
      return (
        {
          id: b.id,
          label: b.__typename === 'DatoCmsSectionTitle' ? b.title : b.internalName,
          wrapper: b.__typename === 'DatoCmsSectionTitle',
          icon: itemIcon,
          type: b.__typename,
          link: b.__typename === 'DatoCmsLink' ? b.pageLink.externalUrl : null
        }
      )
    } else {
      return false
    }
  });
};
