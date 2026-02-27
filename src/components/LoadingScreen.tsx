import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circleSpin = gsap.to('.loader-circle', {
      rotation: 360,
      duration: 2,
      ease: 'none',
      repeat: -1,
    });

    const tl = gsap.timeline({
      onComplete: onFinished,
    });

    tl.fromTo(
      '.loader-text',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.inOut' }
    )
      .to('.loader-text', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, '+=2')
      .to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(containerRef.current, { pointerEvents: 'none' });
        }
      });

    return () => {
      tl.kill();
      circleSpin.kill();
    };
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
    >
      <div className="relative w-48 h-48">
        <svg
          className="absolute inset-0 w-full h-full loader-circle"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FFCB9A"
            strokeWidth="2"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="212"
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center text-sm text-center text-secondary-3 loader-text">
          Initializing Timeline...
        </p>
      </div>
    </div>
  );
}
