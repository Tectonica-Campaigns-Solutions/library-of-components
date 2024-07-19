import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image'

import './share-buttons-styles.scss';

function ShareButtons(): JSX.Element {
  const [isFixed, setIsFixed] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    typeof window !== 'undefined' ? setShareUrl(window.location.href) : setShareUrl('');
    window.addEventListener('scroll', isSticky);

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = (): void => {
    const topHero = (document.querySelector('.header') as HTMLElement)?.offsetHeight;
    const topContent = (document.querySelector('.main-content') as HTMLElement)?.offsetHeight;
    const scrollTop = window.scrollY;

    if (scrollTop >= topHero && scrollTop <= topContent) {
      setIsFixed('show');
    } else {
      setIsFixed('');
    }
  };

  return (
    <div className={`share-buttons-fixed ${isFixed}`}>

      <span>Share</span>

      <div className="twitter">
        <Link target={'_blank'} to={`http://twitter.com/share?url=${shareUrl}`}>
          <StaticImage
            src="../../../icons/x-share.svg"
            alt="X icon"
            placeholder="blurred"
            layout="fixed"
            width={35}
            height={35}
          />
        </Link>
      </div>

      <div className="facebook">
        <Link target={'_blank'} to={`http://www.facebook.com/share.php?u=${shareUrl}`}>
          <StaticImage
            src="../../../icons/facebook-share.svg"
            alt="Facebook icon"
            placeholder="blurred"
            layout="fixed"
            width={35}
            height={36}
          />
        </Link>
      </div>

      <div className="mail">
        <Link target={'_blank'} to={`"mailto:?body=Hello! Check this ${shareUrl}`}>
          <StaticImage
            src="../../../icons/mail-share.svg"
            alt="Mail icon"
            placeholder="blurred"
            layout="fixed"
            width={35}
            height={36}
          />
        </Link>
      </div>

      <div className="linkedin">
        <Link target={'_blank'} to={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}>
          <StaticImage
            src="../../../icons/linkedin-share.svg"
            alt="LinkedIn icon"
            placeholder="blurred"
            layout="fixed"
            width={35}
            height={35}
          />
        </Link>
      </div>

      <div className="whatsapp">
        <Link target={'_blank'} to={`https://wa.me/?text=${shareUrl}`}>
          <StaticImage
            src="../../../icons/wp-share.svg"
            alt="Whatsapp icon"
            placeholder="blurred"
            layout="fixed"
            width={35}
            height={35}
          />
        </Link>
      </div>

    </div>
  );
}

export default ShareButtons;
