import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function VideoPage() {
  const [isIframeReady, setIframeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.vp-badge',    { opacity: 0, y: -20, duration: 0.5 })
        .from('.vp-title',    { opacity: 0, y: 30,  duration: 0.7 }, '-=0.2')
        .from('.vp-sub',      { opacity: 0, y: 20,  duration: 0.6 }, '-=0.3')
        .from('.vp-divider',  { scaleX: 0, duration: 0.7, transformOrigin: 'center' }, '-=0.3')
        .from('.vp-frame',    { opacity: 0, y: 40, scale: 0.97, duration: 0.8 }, '-=0.2')
        .from('.vp-meta',     { opacity: 0, y: 16, duration: 0.5 }, '-=0.2');

      /* floating glow orbs */
      gsap.to('.orb-1', {
        y: -18, x: 10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.orb-2', {
        y: 14, x: -12, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      });
      gsap.to('.orb-3', {
        y: -10, x: 8, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6,
      });

      /* pulsing border glow */
      gsap.to('.vp-glow-ring', {
        opacity: 0.5, scale: 1.02, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-primary overflow-hidden flex items-center justify-center py-24 px-4"
    >
      {/* ── background glow orbs ── */}
      <div
        className="orb-1 pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFCB9A 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="orb-2 pointer-events-none absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #D9B08C 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="orb-3 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFCB9A 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* ── decorative corner dots ── */}
      <div className="pointer-events-none absolute top-12 left-12 flex flex-col gap-2" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="w-1 h-1 rounded-full bg-secondary-4/15" />
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-12 right-12 flex flex-col gap-2" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="w-1 h-1 rounded-full bg-secondary-4/15" />
            ))}
          </div>
        ))}
      </div>

      {/* ── main content ── */}
      <div className="relative w-full max-w-4xl space-y-10">

        {/* header */}
        <div className="text-center space-y-5">
          <div className="vp-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-4/25 bg-secondary-4/5 text-xs font-semibold tracking-widest uppercase text-secondary-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Video Tư Liệu Lịch Sử
          </div>

          <h1 className="vp-title text-4xl md:text-6xl font-black leading-tight tracking-tight">
            <span className="text-secondary-4">Khám phá qua </span>
            <span className="bg-gradient-to-r from-[#FFCB9A] via-[#E8B87A] to-[#D9B08C] bg-clip-text text-transparent">
              Video
            </span>
          </h1>

          <p className="vp-sub max-w-xl mx-auto text-secondary-4/55 text-base leading-relaxed">
            Chương 1 — Đảng Cộng sản Việt Nam ra đời và lãnh đạo đấu tranh
            giành chính quyền <span className="text-secondary-3 font-medium">(1930 – 1945)</span>
          </p>

          <div
            className="vp-divider mx-auto h-px w-40"
            style={{ background: 'linear-gradient(to right, transparent, #FFCB9A, transparent)' }}
            aria-hidden="true"
          />
        </div>

        {/* video player */}
        <div className="vp-frame relative">
          {/* pulsing outer glow ring */}
          <div
            className="vp-glow-ring pointer-events-none absolute -inset-4 rounded-3xl opacity-30 blur-xl"
            style={{ background: 'linear-gradient(135deg, #FFCB9A40, #D9B08C30)' }}
            aria-hidden="true"
          />

          {/* gradient border shell */}
          <div
            className="relative rounded-2xl p-[2px]"
            style={{ background: 'linear-gradient(135deg, #FFCB9A, #D9B08C88, #FFCB9A44)' }}
          >
            {/* inner container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary">
              {/* loading state */}
              {!isIframeReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary">
                  {/* spinner */}
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-secondary-4/10" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                      style={{ borderTopColor: '#FFCB9A' }}
                    />
                  </div>
                  <p className="text-secondary-4/50 text-sm tracking-wide">Đang tải video...</p>
                </div>
              )}

              <iframe
                className={`w-full h-full transition-opacity duration-500 ${isIframeReady ? 'opacity-100' : 'opacity-0'}`}
                src="https://www.youtube.com/embed/-OkaxUqNqhQ?si=iHFJ4HkIgvdlVNbe"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                onLoad={() => setIframeReady(true)}
                allowFullScreen
              />
            </div>
          </div>

          {/* corner accent chips */}
          <div
            className="absolute -top-3 -left-3 w-6 h-6 rounded-full border-2 border-[#FFCB9A] bg-primary"
            aria-hidden="true"
          />
          <div
            className="absolute -top-3 -right-3 w-6 h-6 rounded-full border-2 border-[#D9B08C] bg-primary"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full border-2 border-[#D9B08C] bg-primary"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border-2 border-[#FFCB9A] bg-primary"
            aria-hidden="true"
          />
        </div>

        {/* meta footer */}
        <div className="vp-meta flex flex-wrap items-center justify-center gap-6 text-xs text-secondary-4/40">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.87v6.26a1 1 0 0 1-1.447.894L15 14"/><rect x="3" y="6" width="12" height="12" rx="2"/></svg>
            YouTube
          </span>
        </div>

      </div>
    </div>
  );
}
