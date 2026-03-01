import { useLayoutEffect, useRef, useState, useEffect } from 'react';
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

type LightboxState = { src: string; description: string } | null;

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

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

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);
    setTimeout(refresh, 200);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };

    ctx.revert();
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
                onOpenLightbox={(src, description) => setLightbox({ src, description })}
              />
            ))}
          </div>
        </div>
        <div className='overflow-hidden'>
          <StatsSection />
        </div>

        {/* Lightbox phóng to ảnh minh họa */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh phóng to"
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold"
              onClick={() => setLightbox(null)}
              aria-label="Đóng"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3 max-w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightbox.src}
                alt={lightbox.description}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {lightbox.description && (
                <p className="text-white/90 text-center text-sm sm:text-base px-4 max-w-2xl">
                  {lightbox.description}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}