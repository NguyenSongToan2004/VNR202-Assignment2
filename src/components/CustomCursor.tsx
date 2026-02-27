import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
    };

    const onHover = () => gsap.to(followerRef.current, { scale: 2.5 });
    const onUnhover = () => gsap.to(followerRef.current, { scale: 1 });

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a, .timeline-dot').forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('button, a, .timeline-dot').forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onUnhover);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-2 h-2 bg-secondary-3 rounded-full pointer-events-none z-50 top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={followerRef} className="fixed w-8 h-8 border-2 border-secondary-3 rounded-full pointer-events-none z-50 top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
}
