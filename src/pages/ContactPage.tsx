import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PRACTICAL_CONTENT = [
  {
    title: '1. Thực tiễn khẳng định giá trị Cương lĩnh 1930',
    points: [
      'Cương lĩnh 1930 và vai trò lãnh đạo của Đảng được chứng minh qua toàn bộ tiến trình cách mạng Việt Nam qua các thời kỳ.',
    ],
  },
  {
    title: '2. Lãnh đạo giải phóng và thống nhất đất nước',
    points: [
      '1930–1945: Đảng lãnh đạo 3 cao trào cách mạng, dẫn đến thắng lợi Cách mạng tháng Tám 1945.',
      '1945–1975: Kiên trì mục tiêu độc lập dân tộc, lãnh đạo nhân dân đánh thắng thực dân Pháp và đế quốc Mỹ, thống nhất đất nước.',
    ],
  },
  {
    title: '3. Thành tựu Đổi mới và hội nhập (từ 1986)',
    points: [
      'Kinh tế tăng trưởng mạnh, kim ngạch xuất nhập khẩu đạt kỷ lục hơn 930 tỷ USD năm 2025.',
      'Kinh tế số tăng trưởng nhanh trong khu vực, đóng góp ngày càng lớn vào GDP.',
    ],
  },
  {
    title: '4. Phát triển con người và giảm nghèo',
    points: [
      'Tỷ lệ hộ nghèo giảm từ 58% (thập niên 1990) xuống còn dưới 2% (2025).',
      'Việt Nam được WB và UNDP đánh giá là hình mẫu toàn cầu về giảm nghèo.',
      'Chỉ số HDI cải thiện nổi bật so với nhiều quốc gia cùng mức thu nhập.',
    ],
  },
  {
    title: '5. Xây dựng, chỉnh đốn Đảng',
    points: [
      'Đẩy mạnh phòng, chống tham nhũng với phương châm “không vùng cấm, không ngoại lệ”.',
      'Chỉ số CPI (minh bạch quốc tế) được cải thiện, góp phần củng cố niềm tin của nhân dân.',
    ],
  },
  {
    title: '6. Tầm nhìn đến 2030 và 2045',
    points: [
      'Mục tiêu 2030 (100 năm thành lập Đảng): nước đang phát triển, công nghiệp hiện đại, thu nhập trung bình cao.',
      'Mục tiêu 2045 (100 năm thành lập nước): trở thành nước phát triển, thu nhập cao theo định hướng xã hội chủ nghĩa.',
    ],
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.content-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          clearProps: 'opacity,transform',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-secondary-4 py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="content-section text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Liên hệ thực tiễn</h1>
          <p className="text-lg md:text-xl text-secondary-4/80 max-w-4xl mx-auto leading-relaxed">
            Thực tiễn cách mạng Việt Nam qua các giai đoạn đã khẳng định rõ giá trị lý luận và giá trị hành động của Cương lĩnh chính trị đầu tiên năm 1930.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRACTICAL_CONTENT.map((section) => (
            <article key={section.title} className="content-section rounded-2xl border border-secondary-4/20 bg-secondary-1/10 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary-3">{section.title}</h2>
              <ul className="space-y-3 text-secondary-4/85 leading-relaxed list-disc pl-5">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
