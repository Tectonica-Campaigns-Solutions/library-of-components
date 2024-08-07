import React, { useId, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import './parallax-content-section.scss';

interface SectionProps {
  title: string;
  imageUrl: string | undefined;
  responsiveImageUrl: string | undefined;
  content: JSX.Element;
  extraContent?: JSX.Element;
  alignment: string;
  imageDesktop?: { url: string };
  imageMobile?: { url: string };
}

interface ParallaxSection {
  block: {
    sections: SectionProps[];
  };
}

const ParallaxSection: React.FC<SectionProps> = ({ title, imageUrl, responsiveImageUrl, content, extraContent, alignment }) => {

  const rawId = useId();
  const id = rawId.replaceAll(':', '');

  const sectionRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    // gsap.registerPlugin(ScrollTrigger);
    // gsap.to(boxRef.current, {
    // y: "100%",
    // ease: Power0.easeNone,
    // scrollTrigger: {
    //   trigger: sectionRef.current,
    //   start: "top top",
    //   end: "bottom top",
    //   scrub: true,
    //   pin: true,
    // },
    // });
  }, null);

  return (
    <section id={id} ref={sectionRef} className={`section ${extraContent ? 'extra' : ''}`}>
      <div className="background" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div ref={boxRef} className={`box ${alignment ? alignment : 'left'}`} dangerouslySetInnerHTML={{ __html: `<h3>${title}</h3>` + content }} />

      {extraContent && (
        <div className={`box extra-element ${alignment ? alignment : 'left'}`} dangerouslySetInnerHTML={{ __html: extraContent }} />
      )}

      {/* Responsive background image */}
      {responsiveImageUrl && (
        <style jsx>{`
          @media (max-width: 992px) {
            #${id} .background {
              background-image: url(${responsiveImageUrl}) !important;
            }
          }
        `}</style>
      )}
    </section>
  );
};

const ParallaxContentSection:React.FC<ParallaxSection> = ({ block }) => {
    
    const { sections } = block;
    const slideRef = useRef();

    console.log(block);

    return (
        <div ref={slideRef} className="fixed-slides-wrapper">
            <div>
              { sections.map((section: SectionProps, index: number) => (
                <ParallaxSection 
                    key={index}
                    title={section.title}
                    alignment={section.alignment}
                    imageUrl={section.imageDesktop?.url}
                    responsiveImageUrl={section.imageMobile?.url}
                    content={section.content}
                    extraContent={section.extraContent}
                />
              ))}
            </div>
        </div>
    );
};

export default ParallaxContentSection;
