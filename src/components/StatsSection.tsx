import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { value: 90, label: 'Năm kinh nghiệm' },
  { value: 15, label: 'Kỳ Đại hội Đảng' },
  { value: 35, label: 'Năm Đổi mới' },
  { value: 98, label: 'Triệu dân' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        autoAlpha: 0,
        y: 100,
        duration: 1.5,
        ease: 'power3.out',
      });

      statsData.forEach((_, index) => {
        const target = { val: 0 };
        gsap.to(target, {
          val: statsData[index].value,
          duration: 3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const counter = sectionRef.current?.querySelector(`.stat-value-${index}`);
            if (counter) {
              counter.innerHTML = Math.round(target.val).toString();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-primary">
      <div className="w-full max-w-5xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-secondary-3 mb-4">Giá trị thực tiễn từ 1930 đến nay</h2>
        <p className="text-lg text-secondary-4/80 mb-16 max-w-3xl mx-auto">
          Cương lĩnh chính trị đầu tiên đã đặt nền móng vững chắc cho sự nghiệp cách mạng của Đảng và dân tộc, với những giá trị lý luận và thực tiễn sâu sắc vẫn còn nguyên giá trị cho đến ngày nay.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="p-8 bg-secondary-1/20 rounded-xl border border-secondary-4/10">
              <span className={`block text-6xl font-bold text-secondary-3 stat-value-${index}`}>
                0
              </span>
              <span className="block mt-2 text-secondary-4/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
