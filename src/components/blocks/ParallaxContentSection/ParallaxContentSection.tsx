import React, { useId, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import './parallax-content-section.scss';

interface SectionProps {
  imageUrl: string;
  responsiveImageUrl: string;
  content: JSX.Element;
  extraContent?: JSX.Element;
  alignment: string;
}

interface ParallaxSection {
  block: {
    props: SectionProps;
  };
}

const ParallaxSection: React.FC<SectionProps> = ({ imageUrl, responsiveImageUrl, content, extraContent, alignment }) => {

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
      <div ref={boxRef} className={`box ${alignment ? alignment : 'left'}`}>
        {content}
      </div>

      {extraContent && (
        <div className={`box extra-element ${alignment ? alignment : 'left'}`}>{extraContent}</div>
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
    
    const { props } = block;
    const slideRef = useRef();

    return (
        <div ref={slideRef} className="fixed-slides-wrapper">
            <div>
                <ParallaxSection 
                    alignment="left"
                    imageUrl="/slide-1.png"
                    responsiveImageUrl="/responsive-img-1.png"
                    content={
                        <>
                        <h3>Gender Based Violence and Harassment</h3>
                        <p>
                            While gender-based violence and harassment occurs in a large variety of workplaces, it can occur
                            particularly frequently in hotels where, in most countries, a large proportion of workers are women.
                        </p>
                        </>
                    }
                />

                <ParallaxSection
                    alignment="center"
                    imageUrl="/slide-2.png"
                    responsiveImageUrl="/responsive-img-2.png"
                    content={
                        <>
                        <h3>Gender Based Violence and Harassment</h3>
                        <p>
                            While gender-based violence and harassment occurs in a large variety of workplaces, it can occur
                            particularly frequently in hotels where, in most countries, a large proportion of workers are women.
                        </p>
                        </>
                    }
                />

                <ParallaxSection
                    alignment="right"
                    imageUrl="/slide-3.png"
                    responsiveImageUrl="/responsive-img-3.png"
                    content={
                        <>
                        <h3>Gender Based Violence and Harassment</h3>
                        <p>
                            While gender-based violence and harassment occurs in a large variety of workplaces, it can occur
                            particularly frequently in hotels where, in most countries, a large proportion of workers are women.
                        </p>
                        </>
                    }
                    extraContent={
                        <>
                        <h3>Extra card</h3>
                        <p>
                            While gender-based violence and harassment occurs in a large variety of workplaces, it can occur
                            particularly frequently in hotels where, in most countries, a large proportion of workers are women.
                        </p>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default ParallaxContentSection;
