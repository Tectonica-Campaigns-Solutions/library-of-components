import { ILink, IExternalLink } from "../blocks/CustomLink/CustomLink";

export const getUrl = (to: string | ILink | IExternalLink) => {
  let url = "";

  if (typeof to === "string") {
    url = to;
  } else if (to && "externalUrl" in to) {
    url = to.externalUrl;
  } else if (to && "link" in to && typeof to.link === "string") {
    url = to.link;
  } else if (to && to.slug) {
    url = `/${to.slug}`;
  }

  return url;
};
//Cannot use 'in' operator to search for 'externalUrl' in null
