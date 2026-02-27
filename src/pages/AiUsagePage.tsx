import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AiUsagePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ai-animate', {
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
    <div ref={containerRef} className="min-h-screen bg-primary text-secondary-4 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl">
        <h1 className="ai-animate text-5xl md:text-6xl font-bold mb-6">
          Ứng dụng AI trong dự án
        </h1>
        <div className="ai-animate w-32 h-1 bg-gradient-to-r from-[#FFCB9A] to-[#D9B08C] mx-auto mb-10"></div>
        <p className="ai-animate text-lg md:text-xl leading-relaxed text-secondary-4/80">
          Dự án này được xây dựng với sự hỗ trợ của các công nghệ AI tiên tiến để nâng cao trải nghiệm người dùng và tối ưu hóa quy trình phát triển. AI đã được sử dụng để tạo ra các hoạt ảnh GSAP phức tạp, thiết kế hệ thống UI/UX, và viết mã nguồn cho các thành phần React, giúp biến những ý tưởng sáng tạo thành hiện thực một cách nhanh chóng và hiệu quả.
        </p>
      </div>
    </div>
  );
}
