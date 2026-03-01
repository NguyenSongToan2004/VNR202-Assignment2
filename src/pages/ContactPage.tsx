import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── image URLs ─────────────────── */
/* All images sourced directly from provided reference links */

const IMGS = {
  /* Lịch sử – cdn.nhandan.vn (ảnh tư liệu lịch sử) */
  nguyen_ai_quoc:
    'https://cdn.nhandan.vn/images/0d9d0bc3be56a3f187b42e6a5802050370b3ae021ae9eb3dc4e578831dffb7d4f2780569bae36372828a9ae660b967525a8e5258e5c295f47c63c19dee53751182a4ed101575b3b41a57abd96a9f58f40e0bcc3fec90cf52ddd5b8a385dad2dd43e0e60974e99b343bc32d4a6df06f86964d0a78f137042e6f4da9ab6360b2d61cb35ab75c59973f01c5e4ecd9ffe28973001923205d0a49b44386f30957700048b9382a8c3d1e37736b78a1be2bbad7/dong-dao-nhan-dan-tap-trung-tai-quang-truong-ba-dinh-nghe-chu-tich-ho-chi-minh-doc-tuyen-ngon-doc-lap-sang-2-9-1945-3-2054.jpg.webp',
  cm_thang_tam:
    'https://cdn.nhandan.vn/images/a7ff3997279484804dd821851b49e1035443d739cfca56b1da5a18d5fd18de3e9c503a25bf52a382f604f6de5ffa03ad79091f33b6aee1ca517adebb71f0f377b5766e107401b20e81ed0b2b24a240e1ef997b0ff50421c260a506bea14505c7383e1b6ec31c684a5bd80acfa5c7e92620d9b585b4b59e1563146967b7bea59128dfb80b49361a3a5fafafa952448ff147c7fff122fdce1d2422733d7ed757694f3e6910eabc09ab1cc5f13a48412cdb/vna-potal-79-nam-cach-mang-thang-tam-va-quoc-khanh-2-9-1945-2024-moc-son-choi-loi-trong-lich-su-dan-toc-viet-nam-stand-1.jpg.webp',
  dai_hoi_vi_1986:
    'https://cdn.nhandan.vn/images/30bf1f1896ae060ca668c190753248b0cc2c65e6bb55719721d9de1946de16eff998c45385858be92cb9b5b5df43ce5c58dfb7ed86acce09e452f8750a184de632184fa9d39f245f18c4cdc0bf30eaac5e91b345219adb90b606023f43112029033e479b3527e35c95cf6262c6b1867c2e052c3197e73e49933dcb8393bc6adb/hinh-5khoi-nghia-gianh-chinh-quyen-o-sai-gon-ngay-25-8-1945-anh-tu-lieu.jpg.webp',

  /* Kinh tế 2025 – cand.com.vn */
  kinh_te_2025b:
    'https://img.cand.com.vn/resize/600x600/NewFiles/Images/2026/01/08/img11_17251188019941493834307_j-1767870091492.jpeg',
  du_lich_2025:
    'https://img.cand.com.vn/resize/600x600/NewFiles/Images/2026/01/08/image_9-1767870142187.jpg',

  /* Chuyển đổi số – hanoimoi.vn & baochinhphu.vn */
  so_hoa_forum:
    'https://hnm.1cdn.vn/thumbs/600x315/2024/11/14/cn7.jpg',
  pm_so_hoa:
    'https://bcp.cdnchinhphu.vn/thumb_w/777/334894974524682240/2025/2/6/img7069-17388291270981298825682.jpg',

  /* Giảm nghèo – hcmcpv.org.vn */
  giam_ngheo:
    'https://images.hcmcpv.org.vn/res/news/2025/08/26-08-2025-ky-tich-giam-ngheo-cua-viet-nam-hanh-trinh-tro-thanh-hinh-mau-toan-cau-CA9C4F1A-details.jpg?vs=26082025095149',

  /* Vị thế quốc tế – chinhphu.vn */
  vi_the_quoc_te:
    'https://xdcs.cdnchinhphu.vn/446259493575335936/2024/7/28/tang-truong-kinh-te-17220825681951494461775-1722130028276-1722130028432411571295.jpg',

  /* Đại hội XIII – moit.gov.vn */
  dai_hoi_xiii:
    'https://moit.gov.vn/upload/2005517/fck/files/dai-hoi-xiii-7_1d2d1.jpg',

  /* Xây dựng Đảng – ttbc-hcm.gov.vn */
  thanh_tuu_dang:
    'https://files.ttbc-hcm.gov.vn/2025/02/03/static.ttbc-hcm.gov.vn-640x360-images-upload-nhunghuynh-02032025-_screenshot-2025-02-03-092921.png',
} as const;

/* ─────────────────── reusable pieces ─────────────────── */

function SafeImage({
  src, alt, caption, source, className,
}: {
  src: string; alt: string; caption?: string; source?: string; className?: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomed(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomed]);

  if (hidden) return null;
  return (
    <>
      <figure className={`relative group overflow-hidden rounded-xl ${className ?? ''}`}>
        <div
          className="w-full h-full cursor-zoom-in relative"
          onClick={() => setZoomed(true)}
          role="button"
          aria-label={`Phóng to: ${alt}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setZoomed(true)}
        >
          <img
            src={src}
            alt={alt}
            onError={() => setHidden(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* hover zoom hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
            <svg
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="1.8" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
        </div>
        {caption && (
          <figcaption className="px-3 py-2 text-[11px] text-secondary-4/45 leading-snug bg-secondary-4/[0.03] border-t border-secondary-4/10 flex items-start gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 opacity-50" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
              {caption}
              {source && (
                <> —{' '}
                  <a href={source} target="_blank" rel="noopener noreferrer"
                    className="underline hover:text-secondary-3 transition-colors">Nguồn</a>
                </>
              )}
            </span>
          </figcaption>
        )}
      </figure>

      {/* ── Lightbox ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out animate-fade-in"
          onClick={() => setZoomed(false)}
        >
          {/* close button */}
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Đóng"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* image */}
          <img
            src={src}
            alt={alt}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          />

          {/* caption strip */}
          {caption && (
            <p
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[80vw] text-center text-xs text-white/60 leading-snug px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {caption}
            </p>
          )}

          {/* ESC hint */}
          <span className="absolute top-4 left-4 text-[11px] text-white/30 select-none">ESC để đóng</span>
        </div>
      )}
    </>
  );
}

function RefLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-secondary-4/20 bg-secondary-4/5 text-secondary-4/65 hover:border-secondary-3/60 hover:text-secondary-3 hover:bg-secondary-3/8 transition-all duration-200">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="shrink-0">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      {label}
    </a>
  );
}

function ConclusionBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#FFCB9A]/30 bg-[#FFCB9A]/6 px-5 py-4">
      <span className="shrink-0 mt-0.5 text-[#FFCB9A] font-black text-lg leading-none select-none" aria-hidden="true">⇒</span>
      <p className="text-sm md:text-base text-secondary-4/80 leading-relaxed">{children}</p>
    </div>
  );
}

function EpochBanner({ period, title, sub, icon, accent }: {
  period: string; title: string; sub?: string; icon: React.ReactNode; accent: string;
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-2xl p-5 overflow-hidden border"
      style={{ borderColor: `${accent}30`, background: `linear-gradient(135deg, ${accent}0d 0%, transparent 60%)` }}>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-7xl font-black opacity-[0.06] select-none leading-none" aria-hidden="true">{period}</span>
      <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}20`, border: `1.5px solid ${accent}40` }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: accent }}>{period}</p>
        <p className="font-bold text-secondary-4 text-base md:text-lg leading-snug">{title}</p>
        {sub && <p className="text-xs text-secondary-4/50 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function StatChip({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl border border-secondary-4/15 bg-secondary-4/[0.03]">
      <span className="text-2xl md:text-3xl font-black text-secondary-3 leading-none mb-1">{value}</span>
      <span className="text-xs font-semibold text-secondary-4/70 leading-snug">{label}</span>
      {sub && <span className="text-[10px] text-secondary-4/40 mt-0.5">{sub}</span>}
    </div>
  );
}

/* ── SVG icons ── */
const IconFlag   = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
const IconChart  = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const IconCpu    = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M20 9h2M2 15h2M20 15h2"/></svg>;
const IconHeart  = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IconShield = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconTarget = ({ c }: { c: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;

/* ─────────────────────────── page ─────────────────────────── */

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cp-hero-badge', { opacity: 0, y: -16, duration: 0.55, ease: 'power3.out' });
      gsap.from('.cp-hero-title', { opacity: 0, y: 28, duration: 0.75, delay: 0.1, ease: 'power3.out' });
      gsap.from('.cp-hero-sub',   { opacity: 0, y: 18, duration: 0.6, delay: 0.25, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.cp-section').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 48, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-secondary-4 py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* ══════════ HERO ══════════ */}
        <header className="text-center space-y-5">
          <div className="cp-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-4/25 bg-secondary-4/5 text-xs font-bold tracking-widest uppercase text-secondary-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-3 animate-pulse" aria-hidden="true" />
            Phần 5 — Liên hệ thực tiễn
          </div>

          <h1 className="cp-hero-title text-4xl md:text-6xl font-black leading-tight">
            Thực tiễn khẳng định&nbsp;
            <span className="bg-gradient-to-r from-[#FFCB9A] via-[#E8B87A] to-[#D9B08C] bg-clip-text text-transparent">
              giá trị bền vững
            </span>
            <br />của Cương lĩnh 1930
          </h1>

          <p className="cp-hero-sub max-w-3xl mx-auto text-secondary-4/65 text-base md:text-lg leading-relaxed">
            Giá trị của Cương lĩnh 1930 và vai trò lãnh đạo của Đảng được khẳng định
            mạnh mẽ nhất thông qua thực tiễn sinh động của cách mạng Việt Nam. Từ những
            cuộc đấu tranh giành chính quyền đầy gian khổ đến công cuộc đổi mới và hội
            nhập quốc tế sâu rộng, Đảng đã dẫn dắt dân tộc vượt qua mọi thách thức để
            đạt được những cơ đồ và vị thế như ngày nay.
          </p>

          <div className="mx-auto h-px w-48" style={{ background: 'linear-gradient(to right,transparent,#FFCB9A,transparent)' }} aria-hidden="true" />

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <RefLink href="https://nhandan.vn/kien-dinh-muc-tieu-doc-lap-dan-toc-va-chu-nghia-xa-hoi-trong-tinh-hinh-moi-post646825.html" label="Nhân Dân — Kiên định mục tiêu ĐLDT & CNXH" />
            <RefLink href="https://baovephapluat.vn/kiem-sat-24h/van-de-su-kien/kien-dinh-muc-tieu-doc-lap-dan-toc-tat-yeu-di-len-chu-nghia-xa-hoi-121844.html" label="Bảo vệ Pháp luật — Tất yếu đi lên CNXH" />
          </div>
        </header>

        {/* ══════════ SECTION 1 — Lãnh đạo giải phóng 1930–1975 ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="1930 – 1975"
            title="Sự lãnh đạo trong đấu tranh giải phóng dân tộc và thống nhất đất nước"
            sub="Ba cao trào cách mạng · Cách mạng tháng Tám 1945 · Kháng chiến chống Pháp & Mỹ"
            icon={<IconFlag c="#E87070" />} accent="#E87070"
          />

          <div className="grid md:grid-cols-2 gap-5 items-start">
            <SafeImage
              src={IMGS.nguyen_ai_quoc}
              alt="Đông đảo nhân dân tập trung tại Quảng trường Ba Đình nghe Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập 2-9-1945"
              caption="Đông đảo nhân dân tập trung tại Quảng trường Ba Đình nghe Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày 2-9-1945 — kết tinh của quá trình đấu tranh do Đảng khởi xướng từ Cương lĩnh 1930. Ảnh tư liệu VNA / Nhân Dân"
              source="https://nhandan.vn/tag/cach-mang-thang-tam/"
              className="aspect-[4/3]"
            />
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#E87070]/25 bg-[#E87070]/5 p-5 space-y-3">
                <span className="inline-block px-2 py-0.5 rounded bg-[#E87070]/20 text-[#E87070] text-xs font-bold">1930–1945</span>
                <p className="text-sm text-secondary-4/80 leading-relaxed">
                  Đảng đã lãnh đạo nhân dân qua <strong className="text-secondary-4">ba cao trào cách mạng lớn</strong>,
                  đưa đến thắng lợi của Cách mạng tháng Tám năm 1945. Đây là lần đầu tiên
                  một Đảng mới <strong className="text-secondary-4">15 tuổi</strong> lãnh đạo
                  thành công một cuộc cách mạng dân tộc dân chủ nhân dân ở một nước thuộc
                  địa, nắm chính quyền toàn quốc.
                </p>
              </div>
              <div className="rounded-2xl border border-[#C0784A]/25 bg-[#C0784A]/5 p-5 space-y-3">
                <span className="inline-block px-2 py-0.5 rounded bg-[#C0784A]/20 text-[#C0784A] text-xs font-bold">1945–1975</span>
                <p className="text-sm text-secondary-4/80 leading-relaxed">
                  Trong suốt <strong className="text-secondary-4">30 năm</strong>, Đảng đã
                  kiên trì mục tiêu độc lập dân tộc, lãnh đạo nhân dân đánh thắng{' '}
                  <strong className="text-secondary-4">hai đế quốc to lớn</strong>, hoàn
                  thành sự nghiệp thống nhất Tổ quốc, đưa cả nước đi lên chủ nghĩa xã hội.
                </p>
              </div>
            </div>
          </div>

          {/* Cách mạng tháng 8 image — full width */}
          <SafeImage
            src={IMGS.cm_thang_tam}
            alt="Kỷ niệm 79 năm Cách mạng tháng Tám và Quốc khánh 2-9"
            caption="Kỷ niệm 79 năm Cách mạng tháng Tám (19/8/1945 – 2024) và Quốc khánh 2-9 — Đảng Cộng sản Việt Nam lãnh đạo cách mạng thắng lợi, khai sinh nước Việt Nam Dân chủ Cộng hòa. Ảnh VNA / Nhân Dân"
            source="https://nhandan.vn/tag/cach-mang-thang-tam/"
            className="aspect-video"
          />

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://canhsatquanlyhanhchinh.gov.vn/gioi-thieu/dang-cong-san-viet-nam-nguoi-lanh-dao-to-chuc-moi-thang-loi-cua-cach-mang-viet-nam-3287" label="CSQLHC — Đảng lãnh đạo mọi thắng lợi" />
            <RefLink href="https://ttbc-hcm.gov.vn/nhung-thanh-tuu-noi-bat-cua-viet-nam-duoi-su-lanh-dao-cua-dang-1017928.html" label="TTBC HCM — Thành tựu dưới sự lãnh đạo của Đảng" />
          </div>
        </section>

        {/* ══════════ SECTION 2 — Đổi mới 1986 ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="Từ 1986"
            title="Thành tựu rực rỡ của công cuộc Đổi mới và hội nhập quốc tế"
            sub="Vận dụng sáng tạo chủ nghĩa Mác–Lênin và tư tưởng Hồ Chí Minh trong điều kiện mới"
            icon={<IconChart c="#FFCB9A" />} accent="#FFCB9A"
          />

          <div className="grid md:grid-cols-2 gap-5 items-start">
            <div className="space-y-4">
              <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
                Công cuộc Đổi mới từ năm 1986 đến nay là một sự vận dụng sáng tạo chủ
                nghĩa Mác-Lênin và tư tưởng Hồ Chí Minh trong điều kiện mới, một bước
                phát triển quan trọng từ Cương lĩnh 1930. Sau gần{' '}
                <strong className="text-secondary-3">40 năm</strong> thực hiện Đổi mới,
                Việt Nam đã đạt được những thành tựu to lớn, có ý nghĩa lịch sử trên mọi
                lĩnh vực từ kinh tế, xã hội đến quốc phòng, an ninh và đối ngoại.
              </p>
              <SafeImage
                src={IMGS.vi_the_quoc_te}
                alt="Quan hệ kinh tế Việt Nam mở rộng tới 230+ quốc gia"
                caption="Quan hệ kinh tế-thương mại của Việt Nam mở rộng tới hơn 230 quốc gia và vùng lãnh thổ sau hơn 35 năm Đổi mới và hội nhập"
                source="https://xaydungchinhsach.chinhphu.vn/dat-nuoc-ta-chua-bao-gio-co-duoc-co-do-tiem-luc-vi-the-va-uy-tin-quoc-te-nhu-ngay-nay-119240728083015243.htm"
                className="aspect-video"
              />
            </div>
            <SafeImage
              src={IMGS.dai_hoi_vi_1986}
              alt="Khởi nghĩa giành chính quyền ở Sài Gòn ngày 25-8-1945 — từ thắng lợi cách mạng đến Đổi mới 1986"
              caption="Khởi nghĩa giành chính quyền ở Sài Gòn ngày 25-8-1945 (ảnh tư liệu) — Từ thắng lợi Cách mạng tháng Tám đến công cuộc Đổi mới vĩ đại năm 1986, Đảng kiên định dẫn dắt dân tộc. Nguồn: Nhân Dân"
              source="https://nhandan.vn/tag/cach-mang-thang-tam/"
              className="aspect-[4/3]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://nhandan.vn/kien-dinh-muc-tieu-doc-lap-dan-toc-va-chu-nghia-xa-hoi-trong-tinh-hinh-moi-post646825.html" label="Nhân Dân — Kiên định mục tiêu" />
            <RefLink href="https://dcs.vn/tin-tuc-su-kien/vi-the-viet-nam-.html" label="DCS — Vị thế Việt Nam" />
          </div>
        </section>

        {/* ══════════ SECTION 3 — Kinh tế 2024–2025 ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="2024 – 2025"
            title="Dẫn chứng thực tiễn: Sức mạnh kinh tế và ổn định vĩ mô"
            sub="Kinh tế thị trường định hướng XHCN — tăng trưởng cao trong bối cảnh toàn cầu biến động"
            icon={<IconChart c="#4ADE80" />} accent="#4ADE80"
          />

          <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
            Trong giai đoạn 2024–2025, nền kinh tế Việt Nam tiếp tục chứng minh sức
            sống mạnh mẽ và khả năng thích ứng linh hoạt dưới sự điều hành của Đảng
            và Nhà nước. Sự kiên định với con đường phát triển kinh tế thị trường định
            hướng xã hội chủ nghĩa đã giúp Việt Nam duy trì đà tăng trưởng cao trong
            bối cảnh kinh tế toàn cầu đầy biến động.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatChip value=">930 tỷ" label="Kim ngạch XNK 2025" sub="USD — kỷ lục lịch sử" />
            <StatChip value="~7%" label="Tăng trưởng GDP 2024" sub="Cao nhất khu vực" />
            <StatChip value="Top 20" label="Nền KT xuất khẩu" sub="Toàn cầu (2024)" />
            <StatChip value="<4%" label="Lạm phát" sub="Kiểm soát hiệu quả" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <SafeImage
              src={IMGS.kinh_te_2025b}
              alt="Việt Nam đạt cả 15 chỉ tiêu kinh tế-xã hội"
              caption="Việt Nam đạt và vượt cả 15 chỉ tiêu kinh tế-xã hội đặt ra trong năm 2025 — được cộng đồng quốc tế đánh giá cao"
              source="https://cand.com.vn/the-gioi-24h/cong-dong-quoc-te-danh-gia-cao-thanh-tuu-kinh-te-nam-2025-cua-viet-nam-i793520/"
              className="aspect-video"
            />
            <SafeImage
              src={IMGS.du_lich_2025}
              alt="Du lịch Việt Nam đón hơn 20 triệu lượt khách quốc tế năm 2025"
              caption="Du lịch Việt Nam lập kỷ lục đón hơn 20 triệu lượt khách quốc tế năm 2025, phản ánh vị thế hội nhập ngày càng sâu rộng"
              source="https://cand.com.vn/the-gioi-24h/cong-dong-quoc-te-danh-gia-cao-thanh-tuu-kinh-te-nam-2025-cua-viet-nam-i793520/"
              className="aspect-video"
            />
          </div>

          <ConclusionBox>
            Thực tiễn cho thấy, Việt Nam không chỉ duy trì tăng trưởng mà còn đảm bảo
            chất lượng phát triển thông qua việc cải thiện năng suất lao động và kiểm
            soát lạm phát hiệu quả. Sự bứt phá của kim ngạch xuất nhập khẩu lên con số
            kỷ lục <strong className="text-secondary-3">hơn 930 tỷ USD năm 2025</strong>{' '}
            là minh chứng cho năng lực nội sinh và sự hội nhập sâu rộng của nền kinh tế.
          </ConclusionBox>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://cand.com.vn/the-gioi-24h/cong-dong-quoc-te-danh-gia-cao-thanh-tuu-kinh-te-nam-2025-cua-viet-nam-i793520/" label="Công an ND — Quốc tế đánh giá KT 2025" />
            <RefLink href="https://moit.gov.vn/tin-tuc/dai-hoi-lan-thu-xiii-cua-dang-mo-ra-giai-doan-phon-vinh-moi-cho-dat-nuoc.html" label="Bộ Công Thương — Đại hội XIII" />
            <RefLink href="https://vietnamfinance.vn/de-hien-thuc-hoa-muc-tieu-quy-mo-thi-truong-chung-khoan-vuot-100-gdp-d140635.html" label="VN Finance — Thị trường CK 100% GDP" />
            <RefLink href="https://www.nso.gov.vn/tin-tuc-thong-ke/2026/01/thong-cao-bao-chi-ty-trong-gia-tri-tang-them-cua-kinh-te-so-trong-gdp-grdp-giai-doan-2021-2025/" label="NSO — Kinh tế số GDP 2021–2025" />
            <RefLink href="https://xaydungchinhsach.chinhphu.vn/bao-cao-tinh-hinh-kinh-te-xa-hoi-quy-iv-va-nam-2024-119250106104456764.htm" label="Chính phủ — Báo cáo KTXH 2024" />
            <RefLink href="https://www.nso.gov.vn/du-lieu-va-so-lieu-thong-ke/2026/01/bao-cao-tinh-hinh-kinh-te-xa-hoi-quy-iv-va-nam-2025/" label="Tổng cục TK — Báo cáo KTXH 2025" />
          </div>
        </section>

        {/* ══════════ SECTION 4 — Chuyển đổi số ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="Kỷ nguyên số"
            title="Chuyển đổi số và kinh tế số: Động lực phát triển mới"
            sub="Vận dụng tinh thần Cương lĩnh về phát triển lực lượng sản xuất trong thời đại 4.0"
            icon={<IconCpu c="#60A5FA" />} accent="#60A5FA"
          />

          <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
            Vận dụng sáng tạo tinh thần của Cương lĩnh về <em>phát triển lực lượng sản
            xuất</em>, Đảng đã xác định chuyển đổi số là nhiệm vụ trọng tâm để đưa đất
            nước bước vào kỷ nguyên mới. Kinh tế số đã trở thành một trụ cột quan trọng,
            đóng góp ngày càng lớn vào sự tăng trưởng chung của quốc gia.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <SafeImage
              src={IMGS.so_hoa_forum}
              alt="Phó Thủ tướng tham quan triển lãm ứng dụng công nghệ số"
              caption="Phó Thủ tướng Thường trực Nguyễn Hòa Bình tham quan triển lãm ứng dụng công nghệ cho phát triển kinh tế số và xã hội số tại Diễn đàn quốc gia"
              source="https://hanoimoi.vn/ty-trong-kinh-te-so-trong-gdp-nam-2024-du-kien-dat-18-6-684491.html"
              className="aspect-video"
            />
            <SafeImage
              src={IMGS.pm_so_hoa}
              alt="Thủ tướng Phạm Minh Chính chủ trì họp Ủy ban Quốc gia về chuyển đổi số"
              caption="Thủ tướng Phạm Minh Chính chủ trì phiên họp thứ 10 của Ủy ban Quốc gia về chuyển đổi số — định hướng phát triển kinh tế số quốc gia"
              source="https://baochinhphu.vn/kinh-te-so-viet-nam-tang-truong-nhanh-nhat-khu-vuc-102250206152332651.htm"
              className="aspect-video"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatChip value="18.6%" label="Tỷ trọng KTS/GDP 2024" sub="Năm 2024 dự kiến đạt" />
            <StatChip value="≥20%" label="Mục tiêu năm 2025" sub="Kinh tế số trong GDP" />
            <StatChip value="#1" label="Tăng trưởng KTS" sub="Nhanh nhất Đông Nam Á" />
          </div>

          <ConclusionBox>
            Việc đẩy mạnh kinh tế số không chỉ giúp hiện đại hóa nền kinh tế mà còn
            tạo ra những mô hình kinh doanh mới, thúc đẩy hiệu quả và năng suất lao
            động xã hội, tiệm cận với chuẩn mực quốc tế.
          </ConclusionBox>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://baochinhphu.vn/kinh-te-so-viet-nam-tang-truong-nhanh-nhat-khu-vuc-102250206152332651.htm" label="Báo CP — KTS tăng nhanh nhất khu vực" />
            <RefLink href="https://hanoimoi.vn/ty-trong-kinh-te-so-trong-gdp-nam-2024-du-kien-dat-18-6-684491.html" label="Hà Nội Mới — Tỷ trọng KTS đạt 18.6%" />
            <RefLink href="https://moit.gov.vn/tin-tuc/dai-hoi-lan-thu-xiii-cua-dang-mo-ra-giai-doan-phon-vinh-moi-cho-dat-nuoc.html" label="Bộ CT — Đại hội XIII" />
            <RefLink href="https://htpldn.moj.gov.vn/Pages/chi-tiet-tin.aspx?ItemID=2009&l=Nghiencuutraodoi" label="Bộ Tư pháp — Chuyển đổi số" />
          </div>
        </section>

        {/* ══════════ SECTION 5 — Giảm nghèo ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="1990 → 2025"
            title="Giá trị nhân văn: Kỳ tích giảm nghèo bền vững — Hình mẫu toàn cầu"
            sub="Mục tiêu 'tự do, hạnh phúc cho nhân dân' trong Cương lĩnh 1930 được hiện thực hóa"
            icon={<IconHeart c="#F472B6" />} accent="#F472B6"
          />

          <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
            Mục tiêu <em>"tự do, hạnh phúc cho nhân dân"</em> trong Cương lĩnh 1930 đã
            được hiện thực hóa qua những kỳ tích về giảm nghèo và bảo đảm an sinh xã hội.
            Việt Nam đã trở thành một hình mẫu toàn cầu trong việc thực hiện các Mục tiêu
            Phát triển Thiên niên kỷ của Liên hợp quốc. Việt Nam là{' '}
            <strong className="text-secondary-4">quốc gia đầu tiên ở châu Á</strong> áp dụng
            chuẩn nghèo đa chiều, đo lường sự thiếu hụt không chỉ về thu nhập mà còn về
            y tế, giáo dục, nhà ở và thông tin.
          </p>

          <div className="grid md:grid-cols-2 gap-5 items-start">
            <SafeImage
              src={IMGS.giam_ngheo}
              alt="Kỳ tích giảm nghèo của Việt Nam — hành trình trở thành hình mẫu toàn cầu"
              caption="Kỳ tích giảm nghèo của Việt Nam — hành trình trở thành hình mẫu toàn cầu được WB và UNDP đánh giá là 'gần như chưa từng có'"
              source="https://hcmcpv.org.vn/tin-tuc/ky-tich-giam-ngheo-cua-viet-nam-hanh-trinh-tro-thanh-hinh-mau-toan-cau-1491938606"
              className="aspect-video"
            />

            <div className="rounded-2xl border border-[#F472B6]/20 bg-[#F472B6]/5 p-5 h-full flex flex-col justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F472B6]/70">Tỷ lệ hộ nghèo qua các thập kỷ</p>
              <div className="flex items-end gap-4 flex-1">
                {[
                  { year: '1993', pct: 58 },
                  { year: '2010', pct: 20 },
                  { year: '2020', pct: 5 },
                  { year: '2025', pct: 2 },
                ].map(({ year, pct }) => (
                  <div key={year} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-secondary-4/80">{year === '2025' ? '<2%' : `${pct}%`}</span>
                    <div className="w-full rounded-t-lg"
                      style={{ height: `${pct * 2.2}px`, background: 'linear-gradient(to top, #F472B6, #F472B680)', minHeight: '6px' }} />
                    <span className="text-[10px] text-secondary-4/50">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ConclusionBox>
            Thành tựu giảm nghèo "ngoạn mục" này đã được{' '}
            <strong className="text-secondary-3">Ngân hàng Thế giới (WB)</strong> và{' '}
            <strong className="text-secondary-3">UNDP</strong> đánh giá là{' '}
            <em>"gần như chưa từng có"</em> và là <em>"một cuộc cách mạng"</em> trong việc
            cải thiện đời sống nhân dân.{' '}
            <a href="https://hcmcpv.org.vn/tin-tuc/ky-tich-giam-ngheo-cua-viet-nam-hanh-trinh-tro-thanh-hinh-mau-toan-cau-1491938606"
              target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[1]</a>{' '}
            Tỷ lệ hộ nghèo giảm từ mức{' '}
            <strong className="text-[#F472B6]">trên 58%</strong> những năm 1990 xuống
            còn <strong className="text-[#4ADE80]">dưới 2% năm 2025</strong> là bằng chứng
            đanh thép nhất cho tính đúng đắn của đường lối mà Đảng đã lựa chọn.{' '}
            <a href="https://vjst.vn/viet-nam-dat-duoc-nhieu-thanh-tuu-vuot-troi-trong-giam-ngheo-ben-vung-77234.html"
              target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[2]</a>
          </ConclusionBox>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://hcmcpv.org.vn/tin-tuc/ky-tich-giam-ngheo-cua-viet-nam-hanh-trinh-tro-thanh-hinh-mau-toan-cau-1491938606" label="HCMCPV — Kỳ tích giảm nghèo [1]" />
            <RefLink href="https://vjst.vn/viet-nam-dat-duoc-nhieu-thanh-tuu-vuot-troi-trong-giam-ngheo-ben-vung-77234.html" label="VJST — Thành tựu giảm nghèo bền vững [2]" />
            <RefLink href="https://www.undp.org/sites/g/files/zskgke326/files/2023-07/int_pr_models_and_lessons_learnt_for_vn-eng.pdf" label="UNDP — Models & Lessons for VN (PDF)" />
            <RefLink href="https://en.nhandan.vn/vietnam-a-global-success-story-in-poverty-reduction-post142692.html" label="Nhân Dân EN — Global success story" />
            <RefLink href="https://xaydungchinhsach.chinhphu.vn/dat-nuoc-ta-chua-bao-gio-co-duoc-co-do-tiem-luc-vi-the-va-uy-tin-quoc-te-nhu-ngay-nay-119240728083015243.htm" label="Chính phủ — Vị thế chưa từng có" />
          </div>
        </section>

        {/* ══════════ SECTION 5b — HDI & Con người ══════════ */}
        <section className="cp-section space-y-5">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-secondary-3/20 text-secondary-3 text-xs font-black flex items-center justify-center border border-secondary-3/30">5b</span>
            <h2 className="text-xl md:text-2xl font-bold text-secondary-4 leading-snug">Bảo đảm quyền con người và tiến bộ xã hội</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatChip value="+11 bậc" label="Chỉ số Hạnh phúc 2023" sub="Tăng so với năm trước" />
            <StatChip value="0.726" label="HDI năm 2022" sub="Cao hơn nhóm TN trung bình" />
            <StatChip value="107.000+" label="Nhà tạm được xóa" sub="Xóa nhà dột nát" />
            <StatChip value="Hàng chục nghìn tỷ" label="Đầu tư sinh kế bền vững" sub="VNĐ" />
          </div>

          <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
            Việt Nam đã đạt được những bước tiến dài trong việc nâng cao{' '}
            <strong className="text-secondary-4">Chỉ số Phát triển Con người (HDI)</strong> và
            Chỉ số Hạnh phúc.{' '}
            <a href="https://xaydungchinhsach.chinhphu.vn/dat-nuoc-ta-chua-bao-gio-co-duoc-co-do-tiem-luc-vi-the-va-uy-tin-quoc-te-nhu-ngay-nay-119240728083015243.htm"
              target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[1]</a>{' '}
            HDI của Việt Nam hiện cao hơn nhiều so với các quốc gia có cùng mức thu
            nhập, và Chỉ số Hạnh phúc đã tăng <strong className="text-secondary-4">11 bậc</strong> vào
            năm 2023. Sự quan tâm của Đảng đối với các đối tượng yếu thế được thể hiện
            qua việc xóa bỏ hơn 107.000 nhà tạm, nhà dột nát và đầu tư hàng chục nghìn
            tỷ đồng vào các mô hình sinh kế bền vững.{' '}
            <a href="https://en.nhandan.vn/vietnam-a-global-success-story-in-poverty-reduction-post142692.html"
              target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[2]</a>
          </p>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://xaydungchinhsach.chinhphu.vn/dat-nuoc-ta-chua-bao-gio-co-duoc-co-do-tiem-luc-vi-the-va-uy-tin-quoc-te-nhu-ngay-nay-119240728083015243.htm" label="Chính phủ — HDI & vị thế quốc tế [1]" />
            <RefLink href="https://en.nhandan.vn/vietnam-a-global-success-story-in-poverty-reduction-post142692.html" label="Nhân Dân EN — Poverty reduction [2]" />
          </div>
        </section>

        {/* ══════════ SECTION 6 — Xây dựng Đảng ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="Nhiệm kỳ XIII"
            title="Công tác xây dựng và chỉnh đốn Đảng — Nhiệm vụ 'then chốt của then chốt'"
            sub="Đấu tranh phòng chống tham nhũng, tiêu cực quyết liệt — không có vùng cấm, không có ngoại lệ"
            icon={<IconShield c="#A78BFA" />} accent="#A78BFA"
          />

          <div className="grid md:grid-cols-2 gap-5 items-start">
            <div className="space-y-4">
              <div className="rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/5 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]/70">Quan điểm chỉ đạo</p>
                <p className="text-sm text-secondary-4/80 leading-relaxed">
                  Để duy trì vai trò lãnh đạo và giá trị của Cương lĩnh, Đảng luôn coi
                  trọng công tác xây dựng, chỉnh đốn Đảng, xem đây là nhiệm vụ{' '}
                  <em className="text-secondary-4">"then chốt của then chốt"</em>. Cuộc đấu
                  tranh phòng chống tham nhũng, tiêu cực đã được triển khai quyết liệt,
                  góp phần làm sạch bộ máy và củng cố niềm tin của nhân dân.
                </p>
              </div>
              <div className="rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/5 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]/70">Kết quả nhiệm kỳ XIII (đến 2025)</p>
                <p className="text-sm text-secondary-4/80 leading-relaxed">
                  Từ đầu nhiệm kỳ Đại hội XIII đến đầu năm 2025, công tác kiểm tra,
                  giám sát của Đảng đã đạt được những kết quả cụ thể, mang tính răn đe
                  cao, góp phần củng cố niềm tin của nhân dân.{' '}
                  <a href="https://canhsatquanlyhanhchinh.gov.vn/gioi-thieu/dang-cong-san-viet-nam-nguoi-lanh-dao-to-chuc-moi-thang-loi-cua-cach-mang-viet-nam-3287"
                    target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[1]</a>
                </p>
                <blockquote className="border-l-2 border-[#A78BFA]/50 pl-3 text-sm italic text-secondary-4">
                  "Không nghỉ, không ngừng, không có vùng cấm, không có ngoại lệ"
                </blockquote>
              </div>
            </div>
            <SafeImage
              src={IMGS.thanh_tuu_dang}
              alt="Những thành tựu nổi bật của Việt Nam dưới sự lãnh đạo của Đảng"
              caption="Những thành tựu nổi bật của Việt Nam dưới sự lãnh đạo của Đảng — nguồn Trung tâm Báo chí TP.HCM"
              source="https://ttbc-hcm.gov.vn/nhung-thanh-tuu-noi-bat-cua-viet-nam-duoi-su-lanh-dao-cua-dang-1017928.html"
              className="aspect-[4/3]"
            />
          </div>

          <ConclusionBox>
            Phương châm <em>"không nghỉ, không ngừng, không có vùng cấm, không có
            ngoại lệ"</em> đã giúp siết chặt kỷ luật, kỷ cương trong Đảng. Việc cải thiện
            chỉ số CPI của{' '}
            <strong className="text-secondary-3">Tổ chức Minh bạch Quốc tế</strong> cho
            thấy Việt Nam đang có những bước tiến thực chất trong việc xây dựng một hệ
            thống chính trị trong sạch, vững mạnh, tạo tiền đề vững chắc cho phát triển
            kinh tế bền vững.
          </ConclusionBox>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://canhsatquanlyhanhchinh.gov.vn/gioi-thieu/dang-cong-san-viet-nam-nguoi-lanh-dao-to-chuc-moi-thang-loi-cua-cach-mang-viet-nam-3287" label="CSQLHC — Đảng lãnh đạo mọi thắng lợi [1]" />
            <RefLink href="https://thanhtra.com.vn/tin-quoc-te-164A88425/chi-so-tham-nhung-toan-cau-giam-lan-dau-tien-sau-hon-mot-thap-ky-fd5a1bdfe.html" label="Thanh Tra — Chỉ số tham nhũng toàn cầu [2]" />
          </div>
        </section>

        {/* ══════════ SECTION 7 — Tầm nhìn 2030 & 2045 ══════════ */}
        <section className="cp-section space-y-5">
          <EpochBanner
            period="2030 · 2045"
            title="Tầm nhìn chiến lược và khát vọng vươn mình của dân tộc"
            sub="Nghị quyết Đại hội XIII — Kế thừa và phát triển tinh thần Cương lĩnh 1930 trong thế kỷ XXI"
            icon={<IconTarget c="#34D399" />} accent="#34D399"
          />

          <p className="text-secondary-4/80 leading-relaxed text-sm md:text-base">
            Sự ra đời của Đảng và bản Cương lĩnh 1930 không chỉ dừng lại ở những thắng
            lợi trong quá khứ mà còn soi sáng con đường đi tới tương lai của dân tộc
            Việt Nam trong thế kỷ XXI. Nghị quyết Đại hội XIII của Đảng đã cụ thể hóa
            khát vọng phát triển đất nước với những mốc thời gian mang tính biểu tượng
            lịch sử.{' '}
            <a href="https://moit.gov.vn/tin-tuc/dai-hoi-lan-thu-xiii-cua-dang-mo-ra-giai-doan-phon-vinh-moi-cho-dat-nuoc.html"
              target="_blank" rel="noopener noreferrer" className="text-secondary-3 underline">[1]</a>
          </p>

          <SafeImage
            src={IMGS.dai_hoi_xiii}
            alt="Đại biểu biểu quyết thông qua Nghị quyết Đại hội XIII của Đảng"
            caption="Đại biểu biểu quyết thông qua Nghị quyết Đại hội lần thứ XIII của Đảng — Nghị quyết cụ thể hóa khát vọng quốc gia hùng cường đến năm 2045. Ảnh: Bộ Công Thương / TTXVN"
            source="https://moit.gov.vn/tin-tuc/dai-hoi-lan-thu-xiii-cua-dang-mo-ra-giai-doan-phon-vinh-moi-cho-dat-nuoc.html"
            className="aspect-video"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative rounded-2xl border border-[#34D399]/30 bg-[#34D399]/6 p-6 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#34D399]/20 text-[#34D399] text-sm font-black">2030</span>
                <span className="text-xs text-secondary-4/50">100 năm thành lập Đảng</span>
              </div>
              <ul className="space-y-2.5 text-sm text-secondary-4/80">
                <li className="flex gap-2 items-start"><span className="text-[#34D399] shrink-0 mt-0.5">✓</span>Trở thành <strong className="text-secondary-4">nước đang phát triển</strong>, có công nghiệp hiện đại</li>
                <li className="flex gap-2 items-start"><span className="text-[#34D399] shrink-0 mt-0.5">✓</span>Thu nhập <strong className="text-secondary-4">trung bình cao</strong></li>
                <li className="flex gap-2 items-start"><span className="text-[#34D399] shrink-0 mt-0.5">✓</span>Tốc độ tăng trưởng GDP bình quân <strong className="text-secondary-4">≥ 7%/năm</strong></li>
              </ul>
            </div>
            <div className="relative rounded-2xl border border-[#FFCB9A]/30 bg-[#FFCB9A]/6 p-6 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FFCB9A]/25 text-[#D9A04A] text-sm font-black">2045</span>
                <span className="text-xs text-secondary-4/50">100 năm thành lập nước</span>
              </div>
              <ul className="space-y-2.5 text-sm text-secondary-4/80">
                <li className="flex gap-2 items-start"><span className="text-[#FFCB9A] shrink-0 mt-0.5">✓</span>Trở thành <strong className="text-secondary-4">nước phát triển</strong>, thu nhập cao</li>
                <li className="flex gap-2 items-start"><span className="text-[#FFCB9A] shrink-0 mt-0.5">✓</span>Theo định hướng <strong className="text-secondary-4">xã hội chủ nghĩa</strong></li>
                <li className="flex gap-2 items-start"><span className="text-[#FFCB9A] shrink-0 mt-0.5">✓</span>Quốc gia <strong className="text-secondary-4">hùng cường, phồn vinh, hạnh phúc</strong></li>
              </ul>
            </div>
          </div>

          <ConclusionBox>
            Các mục tiêu này là sự kế thừa và phát triển tinh thần độc lập dân tộc gắn
            liền với chủ nghĩa xã hội trong bối cảnh cuộc{' '}
            <strong className="text-secondary-3">Cách mạng công nghiệp lần thứ tư</strong>.
            Việt Nam đang đứng trước cơ hội lịch sử để "vươn mình" trở thành một quốc
            gia hùng cường, đóng góp xứng đáng vào tiến bộ của nhân loại.
          </ConclusionBox>

          <div className="flex flex-wrap gap-2">
            <RefLink href="https://moit.gov.vn/tin-tuc/dai-hoi-lan-thu-xiii-cua-dang-mo-ra-giai-doan-phon-vinh-moi-cho-dat-nuoc.html" label="Bộ CT — Đại hội XIII & tầm nhìn 2045 [1]" />
          </div>
        </section>

        {/* ══════════ CLOSING ══════════ */}
        <section className="cp-section rounded-3xl border border-secondary-3/25 bg-gradient-to-br from-[#FFCB9A]/8 to-[#D9B08C]/4 p-8 md:p-12 text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-black">Kết luận — Dòng chảy lịch sử</h2>
          <p className="max-w-3xl mx-auto text-secondary-4/75 leading-relaxed text-base md:text-lg">
            Từ Cương lĩnh chính trị đầu tiên năm{' '}
            <strong className="text-secondary-3">1930</strong> đến những mục tiêu chiến lược
            hướng tới <strong className="text-secondary-3">2045</strong>, Đảng Cộng sản
            Việt Nam đã và đang kiên định dẫn dắt dân tộc trên con đường độc lập — tự do
            — hạnh phúc. Thực tiễn sinh động của hơn 95 năm lịch sử là minh chứng hùng
            hồn nhất cho tính đúng đắn và giá trị trường tồn của Cương lĩnh.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['1930', '1945', '1975', '1986', '2024–2025', '2030', '2045'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-bold border border-secondary-3/35 bg-secondary-3/10 text-secondary-3">{t}</span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
