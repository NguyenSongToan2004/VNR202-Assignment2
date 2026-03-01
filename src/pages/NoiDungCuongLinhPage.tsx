import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const IconMountain = () => (
  <svg className="w-9 h-9 text-secondary-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M14 2L4 22h16L14 2zm0 4l4 12h-3l-2-6-2 6H10l4-12z" />
  </svg>
);
const IconTarget = () => (
  <svg className="w-9 h-9 text-secondary-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconFist = () => (
  <svg className="w-9 h-9 text-secondary-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M10 2v6h4V2h-4zm-2 8v12h8V10H8zm2 2h4v8h-4v-8z" />
  </svg>
);
const IconFlag = () => (
  <svg className="w-9 h-9 text-secondary-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6 2v20H4V2h2zm14 0v10l-6-4-4 4V2h10z" />
  </svg>
);
// 4 hands together - 4 bàn tay đan nhau, outline
const IconHands = () => (
  <svg className="w-9 h-9 text-secondary-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {/* Tay trên: bàn tay + ngón hướng xuống, nối vào tâm */}
    <path d="M8 3.5c0-1 1.5-1.5 4-1.5s4 .5 4 1.5v3c0 .8-1 2-4 2s-4-1.2-4-2V3.5z" />
    <path d="M12 6.5v5M10.5 10l1.5 1.5 1.5-1.5" />
    {/* Tay phải: bàn tay + ngón hướng trái */}
    <path d="M20.5 8c1 0 1.5 1.5 1.5 4s-.5 4-1.5 4h-3c-.8 0-2-1-2-4s1.2-4 2-4h3z" />
    <path d="M17.5 12h-5M14 10.5L12.5 12 14 13.5" />
    {/* Tay dưới: bàn tay + ngón hướng lên */}
    <path d="M16 20.5c0 1-1.5 1.5-4 1.5s-4-.5-4-1.5v-3c0-.8 1-2 4-2s4 1.2 4 2v3z" />
    <path d="M12 17.5v-5M10.5 14l1.5-1.5 1.5 1.5" />
    {/* Tay trái: bàn tay + ngón hướng phải */}
    <path d="M3.5 16c-1 0-1.5-1.5-1.5-4s.5-4 1.5-4h3c.8 0 2 1 2 4s-1.2 4-2 4h-3z" />
    <path d="M6.5 12h5M10 13.5L11.5 12 10 10.5" />
    {/* Tâm: vòng nắm tay */}
    <circle cx="12" cy="12" r="2" />
  </svg>
);
function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-1 text-secondary-4 font-bold text-lg shrink-0">
        {number}
      </span>
      <h2 className="text-xl md:text-2xl font-bold text-secondary-3 border-b-2 border-secondary-3/50 pb-1">
        {title}
      </h2>
    </div>
  );
}

export default function NoiDungCuongLinhPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.content-section',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'opacity,transform',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-secondary-4 py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">
        {/* ----- Tiêu đề trang ----- */}
        <header className="content-section text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-secondary-4/60 mb-3">
            Trang nội dung
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-4 leading-tight max-w-3xl mx-auto">
            Nội dung bản Cương lĩnh chính trị đầu tiên của Đảng
          </h1>
          <p className="mt-5 text-secondary-4/80 max-w-2xl mx-auto text-base md:text-lg">
            Cương lĩnh được thông qua tại Hội nghị hợp nhất (2/1930), gồm Chánh cương vắn tắt và Sách lược vắn tắt.
          </p>
        </header>

        {/* ----- Phần 1: Hai văn bản (bố cục như hình 03: 3 phần tử ngang, mũi tên giữa) ----- */}
        <section className="content-section">
          <SectionTitle number="1" title="Hai văn bản cấu thành" />
          <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="flex flex-col items-center text-center shrink-0 order-1 md:order-1">
                <img
                  src="/documents/tu-lieu-chanh-cuong.jpg"
                  alt="Tư liệu Chánh cương vắn tắt"
                  className="w-28 h-36 object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20 mb-2"
                />
                <p className="text-secondary-3 font-bold">Chánh cương vắn tắt</p>
              </div>
              <p className="text-secondary-3 text-2xl font-bold shrink-0 order-2 md:order-2" aria-hidden>&gt;&gt;&gt;</p>
              <div className="rounded-xl bg-secondary-1 border border-secondary-4/20 border-dashed px-6 py-5 md:px-8 md:py-6 text-center shrink-0 order-3 md:order-3">
                <h3 className="text-xl md:text-2xl font-bold text-secondary-4 leading-tight">
                  Cương lĩnh chính trị<br />đầu tiên<br />của Đảng
                </h3>
              </div>
              <p className="text-secondary-3 text-2xl font-bold shrink-0 order-4 md:order-4" aria-hidden>&lt;&lt;&lt;</p>
              <div className="flex flex-col items-center text-center shrink-0 order-5 md:order-5">
                <img
                  src="/documents/tu-lieu-sach-luoc.png"
                  alt="Tư liệu Sách lược vắn tắt"
                  className="w-28 h-36 object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20 mb-2"
                />
                <p className="text-secondary-3 font-bold">Sách lược vắn tắt</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----- Phần 2: Sáu nội dung cốt lõi ----- */}
        <section className="content-section">
          <SectionTitle number="2" title="Sáu nội dung cốt lõi" />
          <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <IconMountain />
                  <span className="text-secondary-4 font-medium">Mục tiêu chiến lược</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconTarget />
                  <span className="text-secondary-4 font-medium">Nhiệm vụ chủ yếu trước mắt</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconFist />
                  <span className="text-secondary-4 font-medium">Lực lượng cách mạng</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <IconFlag />
                  <span className="text-secondary-4 font-medium">Phương pháp cách mạng</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-secondary-3/20 flex items-center justify-center text-secondary-3 text-base font-bold shrink-0">☭</span>
                  <span className="text-secondary-4 font-medium">Đoàn kết quốc tế</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconFlag />
                  <span className="text-secondary-4 font-medium">Vai trò lãnh đạo của Đảng</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----- Phần 3: Mục tiêu & Nhiệm vụ ----- */}
        <section className="content-section">
          <SectionTitle number="3" title="Mục tiêu chiến lược và nhiệm vụ trước mắt" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6">
              <h4 className="text-secondary-3 font-bold flex items-center gap-2 mb-3">
                <IconMountain />
                Mục tiêu chiến lược
              </h4>
              <p className="text-secondary-4/90 text-sm italic mb-2">
                &ldquo;Chủ trương làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản&rdquo;
              </p>
              <p className="text-secondary-4/90 text-sm">
                &ldquo;Đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến, làm cho nước Nam hoàn toàn độc lập&rdquo;
              </p>
            </div>
            <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6">
              <h4 className="text-secondary-3 font-bold flex items-center gap-2 mb-4">
                <IconTarget />
                Nhiệm vụ chủ yếu trước mắt
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
                <div className="flex flex-col items-center text-center min-w-0">
                  <img
                    src="https://ordi.vn/wp-content/uploads/2018/06/HD-Geneva.jpg"
                    alt="Hội nghị Geneva"
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20"
                  />
                  <p className="mt-2 text-secondary-4 text-sm font-medium">Đánh đuổi đế quốc chủ nghĩa Pháp</p>
                </div>
                <div className="flex flex-col items-center text-center min-w-0">
                  <img
                    src="https://lichsuvn.net/trang-chu/wp-content/uploads/2021/08/tECvb4T6.jpg"
                    alt="Tư liệu lịch sử"
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20"
                  />
                  <p className="mt-2 text-secondary-4 text-sm font-medium">Đánh đổ nhà nước Phong kiến</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----- Phần 4: Ba phương diện ----- */}
        <section className="content-section">
          <SectionTitle number="4" title="Phương diện xã hội, nhiệm vụ và kinh tế" />
          <div className="space-y-8">
            <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8 w-full">
              <h4 className="text-secondary-3 font-bold text-base border-b border-secondary-3/40 pb-2 mb-4">
                Phương diện xã hội
              </h4>
              <ul className="space-y-2 text-secondary-4/90 text-sm">
                <li>
                  • Dân chúng được tự do tổ chức
                  <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <img src="https://cdn2.olm.vn/docviewer/file/dethi/lichsu/5f047f95e3c0f.jpg" alt="Tư liệu dân chúng được tự do tổ chức" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://cdn2.olm.vn/docviewer/file/dethi/lichsu/5f047fc807484.jpg" alt="Tư liệu dân chúng được tự do tổ chức" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://cdn2.olm.vn/docviewer/file/dethi/lichsu/5f04801023dc5.jpg" alt="Tư liệu dân chúng được tự do tổ chức" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                  </div>
                </li>
                <li>• Nam nữ bình quyền
                <div className="mt-4 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    <img src="https://baotanghochiminh.vn/pic/Customer/HC_637192673482703681_HasThumb.jpg" alt="Tư liệu nam nữ bình quyền" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://phapluatchinhsach.vn/pic/News/bgd-3-333_2417.webp" alt="Tư liệu bình đẳng giới" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://baotanglichsu.vn/DataFiles/News/Tintuc_cgs_vn_201392015h43m14s.gif" alt="Tư liệu nam nữ bình quyền" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://img.webtech360.com/imagesupdate1/image-webtech360-com-2459695.jpg" alt="Tư liệu phụ nữ" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://vfa.gov.vn/storage/upload/anh-tu-lieu-hoi-phunu.jpg" alt="Ảnh tư liệu Hội Phụ nữ" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                  </div>
                </li>
                <li>• Phổ thông giáo dục theo công nông hóa
                <div className="mt-4 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    <img src="https://media.urbanistnetwork.com/saigoneer/article-images/2020/08/15/binh-dan-hoc-vu/7b.jpg" alt="Tư liệu bình dân học vụ" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://tse1.mm.bing.net/th/id/OIP.YZRN65l7QKq2a1co0ppLQgHaFk?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Tư liệu phổ thông giáo dục" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://sovhtt.hanoi.gov.vn/wp-content/uploads/2020/08/lop-binh-dan-hoc-vu-duoc-mo-o-nhieu-dia-phuong-thu-hut-dong-dao-nguoi-dan-tham-gia.jpg" alt="Lớp bình dân học vụ được mở ở nhiều địa phương, thu hút đông đảo người dân tham gia" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://tse4.mm.bing.net/th/id/OIP.C2AO42sZ5M7V0E9he81SDwHaGB?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Tư liệu giáo dục công nông" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                    <img src="https://congdankhuyenhoc.qltns.mediacdn.vn/thumb_w/660/449484899827462144/2025/1/8/binh-dan-hoc-vu-3-17363241769021233911249.jpg" alt="Bình dân học vụ" className="w-full aspect-[4/3] object-cover rounded-xl border border-secondary-4/30 bg-secondary-2/20" referrerPolicy="no-referrer" />
                  </div>
                </li>
              </ul>
            </div>

            {/* Phương diện kinh tế: gộp chung 2 nội dung (Quốc trái + Toàn bộ ruộng đất) + mục khác */}
            <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8">
              <h4 className="text-secondary-3 font-bold text-base border-b border-secondary-3/40 pb-2 mb-2">
                Phương diện kinh tế
              </h4>
              <p className="text-secondary-4/70 text-sm mb-6">Hai chính sách chủ yếu: Quốc trái và Toàn bộ ruộng đất.</p>
              <div className="space-y-10">
                {/* Luồng 1: Quốc trái - mũi tên nằm TRÊN ảnh + text */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4">
                  <div className="px-4 py-3 rounded-lg bg-secondary-1/20 text-secondary-4/95 text-sm text-center sm:w-[200px] sm:min-w-[200px] shrink-0 flex items-center justify-center">
                    Tư bản đế quốc chủ nghĩa Pháp
                  </div>
                  <div className="flex-1 flex flex-col items-center min-w-[200px] sm:min-w-[220px] gap-2">
                    <div className="flex items-center gap-2 bg-primary/95 rounded-xl px-3 py-2 shadow-md border border-secondary-4/10 w-fit">
                      <img src="https://toptradingforex.com/wp-content/uploads/2021/09/trai-phieu-2.jpg" alt="Trái phiếu" className="w-11 h-11 object-cover rounded-lg shrink-0" />
                      <span className="text-secondary-3 font-bold italic text-sm whitespace-nowrap">Quốc trái</span>
                    </div>
                    <svg viewBox="0 0 260 36" className="w-full h-9 shrink-0" fill="none" stroke="#FFCB9A" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <defs>
                        <marker id="arrow-quoctrai" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                          <polygon points="0,0 10,5 0,10" fill="#FFCB9A" stroke="none" />
                        </marker>
                      </defs>
                      <path d="M 8 28 Q 130 2 252 28" strokeWidth="3" markerEnd="url(#arrow-quoctrai)" />
                    </svg>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-secondary-3/15 text-secondary-4 text-sm text-center sm:min-w-[200px] shrink-0 flex items-center justify-center">
                    Chính phủ công nông binh quản lí
                  </div>
                </div>

                {/* Luồng 2: Toàn bộ ruộng đất - mũi tên nằm TRÊN ảnh + text */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4">
                  <div className="px-4 py-3 rounded-lg bg-secondary-1/20 text-secondary-4/95 text-sm text-center sm:w-[200px] sm:min-w-[200px] shrink-0 flex items-center justify-center">
                    Đế quốc chủ nghĩa
                  </div>
                  <div className="flex-1 flex flex-col items-center min-w-[200px] sm:min-w-[220px] gap-2">
                    <div className="flex items-center gap-2 bg-primary/95 rounded-xl px-3 py-2 shadow-md border border-secondary-4/10 w-fit">
                      <img src="https://png.pngtree.com/thumb_back/fw800/background/20220423/pngtree-landscape-of-rice-field-farmland-crop-food-photo-image_5540360.jpg" alt="Ruộng đất" className="w-11 h-11 object-cover rounded-lg shrink-0" />
                      <span className="text-secondary-3 font-bold italic text-sm whitespace-nowrap">Toàn bộ ruộng đất</span>
                    </div>
                    <svg viewBox="0 0 260 36" className="w-full h-9 shrink-0" fill="none" stroke="#FFCB9A" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <defs>
                        <marker id="arrow-ruongdat" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                          <polygon points="0,0 10,5 0,10" fill="#FFCB9A" stroke="none" />
                        </marker>
                      </defs>
                      <path d="M 8 28 Q 130 2 252 28" strokeWidth="3" markerEnd="url(#arrow-ruongdat)" />
                    </svg>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-secondary-3/15 text-secondary-4 text-sm text-center sm:min-w-[200px] shrink-0 flex items-center justify-center">
                    Dân cày nghèo, loại bỏ sưu thuế
                  </div>
                </div>
              </div>
              <ul className="mt-8 pt-6 border-t border-secondary-4/20 space-y-1 text-secondary-4/90 text-sm">
                <li>• Mở mang công nông nghiệp</li>
                <li>• Thi hành luật ngày làm tám giờ</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----- Phần 5: Lực lượng cách mạng ----- */}
        <section className="content-section">
          <SectionTitle number="5" title="Lực lượng cách mạng" />
          <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8">
            {/* Sơ đồ 4 góc, icon giữa trung tâm */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
              {/* 4 block 4 góc */}
              <div className="rounded-xl bg-secondary-1/40 border border-secondary-4/25 px-4 py-4 sm:px-6 sm:py-5 text-center flex items-center justify-center min-h-[80px] sm:min-h-[88px]">
                <p className="text-secondary-4 font-medium text-sm sm:text-base">Công nhân <span className="block text-secondary-4/80 text-xs sm:text-sm italic">(Lãnh đạo)</span></p>
              </div>
              <div className="rounded-xl bg-secondary-1/40 border border-secondary-4/25 px-4 py-4 sm:px-6 sm:py-5 text-center flex items-center justify-center min-h-[80px] sm:min-h-[88px]">
                <p className="text-secondary-4 font-medium text-sm sm:text-base">Nông dân <span className="block text-secondary-4/80 text-xs sm:text-sm italic">yêu nước</span></p>
              </div>
              <div className="rounded-xl bg-secondary-1/40 border border-secondary-4/25 px-4 py-4 sm:px-6 sm:py-5 text-center flex items-center justify-center min-h-[80px] sm:min-h-[88px]">
                <p className="text-secondary-4 font-medium text-sm sm:text-base">Tất cả lực lượng tiến bộ</p>
              </div>
              <div className="rounded-xl bg-secondary-1/40 border border-secondary-4/25 px-4 py-4 sm:px-6 sm:py-5 text-center flex items-center justify-center min-h-[80px] sm:min-h-[88px]">
                <p className="text-secondary-4 font-medium text-sm sm:text-base">Yêu nước</p>
              </div>
             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {/* Khối blockquote: Lực lượng căn bản + trích dẫn Đảng */}
              <div className="flex flex-col justify-around max-w-3xl">
                <blockquote className="text-secondary-4/90 text-sm md:text-base border-l-2 border-secondary-3 pl-4">
                  <p className="font-medium mb-2">Lực lượng căn bản:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Công nhân</li>
                    <li>Nông dân</li>
                  </ul>
                </blockquote>
                <blockquote className="text-secondary-4/90 text-sm md:text-base italic border-l-2 border-secondary-3 pl-4">
                  Đảng &ldquo;phải thu phục cho được đại bộ phận giai cấp mình ... đại bộ phận dân cày, ... hết sức liên lạc với tiểu tư sản, trí thức và trung nông ... để kéo họ đi vào phe vô sản giai cấp. Còn đối với bọn phú nông, trung, tiểu địa chủ và tư bản An Nam mà chưa rõ mặt phản c.m thì phải lợi dụng, ít lâu mới làm cho họ đứng trung lập&rdquo;
                </blockquote>
              </div>
              {/* Section ngang hàng: poster Thổ, Nùng, Mán, Kinh đoàn kết đuổi giặc Pháp */}
              <div className="rounded-xl border border-secondary-4/25 bg-secondary-1/10 overflow-hidden border-l-4 border-l-secondary-3">
                <div className="max-h-[400px] overflow-hidden">
                  <img
                    src="https://media.baoquangninh.vn/upload/image/202302/medium/2057740_ecfb52a7b5143fd1b27fcc7b69ab21ca.jpg"
                    alt="Thổ, Nùng, Mán, Kinh đoàn kết đuổi giặc Pháp"
                    className="w-full h-full max-h-[400px] object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-secondary-4/80 text-xs text-center py-2 px-3 border-t border-secondary-4/20">
                  Thổ, Nùng, Mán, Kinh — Đoàn kết đuổi giặc Pháp
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----- Phần 6: Phương pháp, đoàn kết, vai trò Đảng ----- */}
        <section className="content-section">
          <SectionTitle number="6" title="Phương pháp, đoàn kết quốc tế và vai trò Đảng" />
          <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8 space-y-8">
            <div>
              <h4 className="text-secondary-3 font-bold mb-2">Phương pháp cách mạng</h4>
              <blockquote className="text-secondary-4/90 text-sm md:text-base border-l-2 border-secondary-3 pl-4">
              <ul className="space-y-1 list-disc list-inside">
                  <li>Bạo lực cách mạng của quần chúng, không thỏa hiệp trong bất cứ hoàn cảnh nào. </li>
                  <li>Cách mạng Việt Nam là một bộ phận của cách mạng vô sản thế giới</li>
                </ul>
              </blockquote>
  
            </div>
           
            <div>
              <h4 className="text-secondary-3 font-bold mb-2">Vai trò lãnh đạo của Đảng</h4>
              <blockquote className="text-secondary-4/90 text-sm italic border-l-2 border-secondary-3 pl-4">
                &ldquo;Đảng là đội tiên phong của vô sản giai cấp phải thu phục cho được đại bộ phận giai cấp mình, phải làm cho giai cấp mình lãnh đạo được dân chúng&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ----- Phần 7: Ý nghĩa ----- */}
        <section className="content-section">
          <SectionTitle number="7" title="Ý nghĩa cương lĩnh" />
          <div className="rounded-2xl border border-secondary-4/25 bg-secondary-1/10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="shrink-0 self-start w-full max-w-xs">
                <img src="https://th.bing.com/th/id/OIP.o12iSLhliHRhCtsp3nBptgHaGr?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Cương lĩnh chính trị đầu tiên của Đảng" className="w-full rounded-xl border-2 border-secondary-4/30 object-cover aspect-[4/3]" referrerPolicy="no-referrer" />
                <p className="text-primary font-bold leading-tight text-sm mt-2 text-center">Cương lĩnh chính trị đầu tiên của Đảng</p>
              </div>
              <ul className="space-y-3 text-secondary-4/90 text-sm">
                <li className="pl-4 border-l-2 border-secondary-3/50">Phản ánh súc tích luận điểm cơ bản của cách mạng Việt Nam</li>
                <li className="pl-4 border-l-2 border-secondary-3/50">Thể hiện bản lĩnh chính trị độc lập, tự chủ, sáng tạo</li>
                <li className="pl-4 border-l-2 border-secondary-3/50">Đánh giá đúng mâu thuẫn cơ bản và chủ yếu của dân tộc Việt Nam</li>
                <li className="pl-4 border-l-2 border-secondary-3/50">Đánh giá đúng thái độ các giai tầng trong xã hội</li>
                <li className="pl-4 border-l-2 border-secondary-3/50">Thỏa mãn nhu cầu phát triển của thực tiễn cách mạng</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
