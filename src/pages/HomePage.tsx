import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import ContentSection from '../components/ContentSection';
import StatsSection from '../components/StatsSection';
import { TIMELINE_DATA } from '../constants';
import { useModal } from '../context/ModalContext';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.content-section');

      gsap.set('.timeline-shell', {
        autoAlpha: 0,
        x: -24,
        scale: 0.96,
      });

      if (sections.length > 0) {
        ScrollTrigger.create({
          trigger: sections[0],
          start: 'top 85%',
          onEnter: () => {
            gsap.to('.timeline-shell', {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
            });
          },
          onLeaveBack: () => {
            gsap.to('.timeline-shell', {
              autoAlpha: 0,
              x: -24,
              scale: 0.96,
              duration: 0.35,
              ease: 'power2.inOut',
            });
          },
        });
      }

      sections.forEach((section, index) => {
        // This ScrollTrigger handles timeline state while sections use normal document flow.
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(`.timeline-dot-${index}`, {
                backgroundColor: '#FFCB9A',
                scale: 1.5,
              });
              gsap.to(`.timeline-year-${index}`, {
                opacity: 1,
              });
            } else {
              gsap.to(`.timeline-dot-${index}`, {
                backgroundColor: '#D1E8E2',
                scale: 1,
              });
              gsap.to(`.timeline-year-${index}`, {
                opacity: 0.5,
              });
            }
          },
        });

        gsap.from(section.querySelector('.section-content'), {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      });

      ScrollTrigger.create({
        trigger: '.content-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to('.progress-bar', { height: `${self.progress * 100}%` });
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main ref={mainRef} className="w-full bg-primary main-content">
        <Hero />
        <div className="relative">
          <Timeline />
          <div className="content-container">
            {TIMELINE_DATA.map((item, index) => (
              <ContentSection
                key={item.year}
                year={item.year}
                phase={item.phase}
                subtitle={item.subtitle}
                title={item.title}
                summary={item.summary}
                context={item.context}
                keywords={item.keywords}
                imageHint={item.imageHint}
                quote={item.quote}
                sectionIndex={index}
                onOpenModal={() => openModal(item)}
              />
            ))}
          </div>
        </div>
        <StatsSection />
      </main>
      
      
    </>
  );
}