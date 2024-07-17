import React, { FC } from "react";
import { Link as GatsbyLink } from "gatsby";
import { getUrl } from "../../utils/link.utils";

interface InternalLink {
  slug?: string;
  content: string;
}

export interface IExternalLink {
  externalUrl: string;
}

export interface ILink {
  content?: string | InternalLink;
  slug?: string;
  link?: string | InternalLink;
}

interface Props {
  to: string | ILink | IExternalLink;
  externalURL?: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink: FC<Props> = ({ to, className, children, ...rest }) => {
  const url = getUrl(to);

  return (
    <GatsbyLink to={url} className={className} {...rest}>
      {children}
    </GatsbyLink>
  );
};

export default CustomLink;
