import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function VideoPage() {
  const [isIframeReady, setIframeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.video-animate', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-primary flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="video-animate text-4xl md:text-5xl font-bold text-secondary-4 text-center mb-12">
          Khám phá qua Video
        </h1>
        <div className="video-animate relative aspect-video rounded-2xl overflow-hidden shadow-2xl p-1 bg-gradient-to-br from-[#FFCB9A] to-[#D9B08C]">
          {!isIframeReady && (
            <div className="absolute inset-1 rounded-xl bg-primary/95 flex items-center justify-center text-secondary-4/70 text-sm">
              Đang tải video...
            </div>
          )}
          <iframe
            className={`w-full h-full rounded-xl bg-primary transition-opacity duration-300 ${isIframeReady ? 'opacity-100' : 'opacity-0'}`}
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            onLoad={() => setIframeReady(true)}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
