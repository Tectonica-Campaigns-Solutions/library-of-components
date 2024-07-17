import { ILink, IExternalLink } from "../blocks/CustomLink/CustomLink";

export const getUrl = (to: string | ILink | IExternalLink) => {
  let url = "";

  if (typeof to === "string") {
    url = to;
  } else if ("externalUrl" in to) {
    url = to.externalUrl;
  } else if ("link" in to && typeof to.link === "string") {
    url = to.link;
  } else if (to.slug) {
    url = `/${to.slug}`;
  }

  return url;
};
