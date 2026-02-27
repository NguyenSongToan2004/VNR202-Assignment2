import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
      })
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
        }, '-=1')
        .from('.hero-button', {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

    const handleStartJourney = () => {
    gsap.to(window, { 
      duration: 1.5, 
      scrollTo: { y: '.content-container', offsetY: 70 },
      ease: 'power3.inOut' 
    });
  };

  return (
    <section ref={heroRef} id="hero" className="h-screen px-20 flex flex-col items-center justify-center text-center">
      <h1 className="hero-title text-5xl md:text-7xl font-bold text-secondary-4 mb-4">
        Hành trình hình thành Cương lĩnh chính trị đầu tiên (1930)
      </h1>
      <p className="hero-subtitle text-lg text-secondary-4/80 mb-8">
        Một trải nghiệm du hành thời gian qua những trang sử hào hùng của dân tộc.
      </p>
      <button 
        onClick={handleStartJourney}
        className="hero-button px-8 py-3 bg-secondary-3/80 text-primary rounded-full font-bold hover:bg-secondary-3 transition-colors duration-300 shadow-[0_0_15px_rgba(255,203,154,0.5)] hover:shadow-[0_0_25px_rgba(255,203,154,0.8)]">

        Bắt đầu du hành
      </button>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
        <span className="text-sm text-secondary-4/70">Cuộn xuống</span>
        <div className="w-4 h-4 border-b-2 border-r-2 border-secondary-4/70 transform rotate-45"></div>
      </div>
    </section>
  );
}
