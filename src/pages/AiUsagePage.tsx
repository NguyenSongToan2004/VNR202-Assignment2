import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import notebookLMIcon from '../assets/icons/notebookLM.png';
import geminiIcon from '../assets/icons/gemini.png';
import chatGPTIcon from '../assets/icons/chatGPT.png';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────── data ── */

const AI_STEPS = [
  { step: '01', label: 'Nghiên cứu nội dung', tool: 'NotebookLM' },
  { step: '02', label: 'Tóm tắt & Deep Research', tool: 'Gemini' },
  { step: '03', label: 'Lên ý tưởng website', tool: 'ChatGPT' },
  { step: '04', label: 'Triển khai source code', tool: 'Copilot' },
];

interface AiTool {
  id: string;
  icon: string | null;
  iconLabel: string;
  name: string;
  tagline: string;
  accentColor: string;
  role: string;
  tasks: { label: string; detail: string }[];
  output: string;
}

const AI_TOOLS: AiTool[] = [
  {
    id: 'notebooklm',
    icon: notebookLMIcon,
    iconLabel: 'NotebookLM logo',
    name: 'Google NotebookLM',
    tagline: 'Tóm tắt & phân tích tài liệu học thuật',
    accentColor: '#4285F4',
    role: 'Công cụ nghiên cứu & tóm lược nội dung',
    tasks: [
      {
        label: 'Tóm tắt Chương 1',
        detail:
          'Upload tài liệu Chương 1: "Đảng Cộng sản Việt Nam ra đời và lãnh đạo đấu tranh giành chính quyền (1930 – 1945)" vào NotebookLM để trích xuất các luận điểm cốt lõi.',
      },
      {
        label: 'Phần 1 – Cương lĩnh chính trị 2/1930',
        detail:
          'Tập trung phân tích mục "Đảng Cộng sản Việt Nam ra đời và Cương lĩnh chính trị đầu tiên của Đảng tháng 2-1930", lấy các dữ kiện lịch sử quan trọng.',
      },
      {
        label: 'Tạo câu hỏi kiểm tra',
        detail:
          'Dùng tính năng Q&A tương tác để sinh câu hỏi ôn tập và kiểm tra mức độ nắm bài của nhóm trước khi xây dựng nội dung web.',
      },
    ],
    output:
      'Bản tóm tắt cấu trúc rõ ràng gồm bối cảnh lịch sử, quá trình thành lập Đảng, và 5 nội dung chính của Cương lĩnh chính trị đầu tiên.',
  },
  {
    id: 'gemini',
    icon: geminiIcon,
    iconLabel: 'Gemini logo',
    name: 'Google Gemini',
    tagline: 'Deep Research – nguồn thông tin chính xác từ Google',
    accentColor: '#34A853',
    role: 'Sinh nội dung & tìm kiếm tài nguyên thực tế',
    tasks: [
      {
        label: 'Sinh nội dung tóm tắt',
        detail:
          'Yêu cầu Gemini viết lại các đoạn tóm tắt theo phong cách súc tích, dễ đọc phù hợp với giao diện web hiện đại.',
      },
      {
        label: 'Deep Research – tìm nguồn chính xác',
        detail:
          'Kích hoạt chức năng Deep Research để Gemini tự động duyệt qua nhiều nguồn trên Google, xác thực dữ liệu lịch sử và trả về link bài báo uy tín (Nhân Dân, Tuyên giáo, v.v.).',
      },
      {
        label: 'Thu thập hình ảnh lịch sử',
        detail:
          'Dùng Deep Research để truy xuất đường dẫn đến các hình ảnh tư liệu lịch sử có bản quyền công khai liên quan đến sự kiện 1930.',
      },
    ],
    output:
      'Danh sách các đường dẫn bài báo, hình ảnh lịch sử và nội dung văn bản đã được kiểm chứng từ nguồn đáng tin cậy, sẵn sàng tích hợp vào website.',
  },
  {
    id: 'chatgpt',
    icon: chatGPTIcon,
    iconLabel: 'ChatGPT logo',
    name: 'ChatGPT',
    tagline: 'Brainstorm & cụ thể hoá ý tưởng thiết kế',
    accentColor: '#10A37F',
    role: 'Tư vấn UX/UI & lên ý tưởng website',
    tasks: [
      {
        label: 'Ideation – ý tưởng tổng thể',
        detail:
          'Prompt ChatGPT đề xuất cấu trúc trang web phù hợp với chủ đề lịch sử Đảng: timeline scroll, hero section, modal chi tiết, và trang game tương tác.',
      },
      {
        label: 'Cụ thể hoá bằng mô tả chi tiết',
        detail:
          'Dùng ChatGPT để viết design brief: màu sắc (earth tone ấm), typography, layout responsive, hiệu ứng GSAP ScrollTrigger và trải nghiệm cuộn mượt mà.',
      },
      {
        label: 'Sinh Prompt cho Copilot',
        detail:
          'Tạo danh sách các prompt engineering chi tiết từng component (Header, Timeline, ContentSection, Modal, GamePage) để chuyển sang Copilot triển khai.',
      },
    ],
    output:
      'Bộ thiết kế wireframe bằng ngôn ngữ tự nhiên + danh sách prompt sẵn sàng dùng cho Copilot, định hình toàn bộ kiến trúc giao diện.',
  },
  {
    id: 'copilot',
    icon: null,
    iconLabel: 'Copilot',
    name: 'GitHub Copilot',
    tagline: 'Triển khai source code React + TypeScript',
    accentColor: '#FFCB9A',
    role: 'Lập trình & tối ưu mã nguồn',
    tasks: [
      {
        label: 'Khởi tạo & scaffold dự án',
        detail:
          'Copilot hỗ trợ bootstrap dự án Vite + React + TypeScript + Tailwind CSS, cấu hình vite.config.ts và cài đặt GSAP, Framer Motion.',
      },
      {
        label: 'Xây dựng từng component',
        detail:
          'Dùng Copilot để viết Header, Hero, Timeline, ContentSection, Modal, StatsSection với animation GSAP ScrollTrigger theo design brief từ ChatGPT.',
      },
      {
        label: 'Tích hợp & tối ưu',
        detail:
          'Copilot giúp refactor code, xử lý TypeScript types, tối ưu performance (memoization, lazy-load), và viết custom cursor cùng loading screen.',
      },
    ],
    output:
      'Toàn bộ source code dự án hoạt động hoàn chỉnh: 6 trang, 10+ component, hệ thống animation scroll, game tương tác, và triển khai production-ready.',
  },
];

/* ────────────────────────────────────────────────── component ── */

export default function AiUsagePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── hero ── */
      gsap.from('.hero-badge', { opacity: 0, y: -16, duration: 0.6, ease: 'power3.out' });
      gsap.from('.hero-title', { opacity: 0, y: 32, duration: 0.8, delay: 0.15, ease: 'power3.out' });
      gsap.from('.hero-sub', { opacity: 0, y: 24, duration: 0.7, delay: 0.35, ease: 'power3.out' });
      gsap.from('.hero-divider', { scaleX: 0, duration: 0.8, delay: 0.5, ease: 'power3.out', transformOrigin: 'left' });

      /* ── workflow steps ── */
      gsap.from('.workflow-step', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.workflow-section', start: 'top 80%' },
      });

      /* ── ai tool cards ── */
      gsap.utils.toArray<HTMLElement>('.ai-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 48,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%' },
        });
      });

      /* ── conclusion ── */
      gsap.from('.conclusion-block', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.conclusion-block', start: 'top 85%' },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-primary text-secondary-4 py-20 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto space-y-24">

        {/* ═══════════ HERO ═══════════ */}
        <header className="text-center space-y-6">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-4/30 bg-secondary-4/5 text-sm font-medium tracking-widest uppercase text-secondary-3">
            <span className="w-2 h-2 rounded-full bg-secondary-3 animate-pulse" aria-hidden="true" />
            AI Usage Transparency
          </div>

          <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight">
            Nhóm chúng tôi đã sử dụng
            <br />
            <span className="bg-gradient-to-r from-[#FFCB9A] to-[#D9B08C] bg-clip-text text-transparent">
              AI như thế nào?
            </span>
          </h1>

          <p className="hero-sub max-w-2xl mx-auto text-secondary-4/70 text-lg leading-relaxed">
            Toàn bộ quy trình từ nghiên cứu nội dung, tóm tắt học thuật đến thiết kế
            và lập trình website đều có sự hỗ trợ của các công cụ AI. Trang này minh
            bạch từng bước chúng tôi đã làm.
          </p>

          <div
            className="hero-divider w-32 h-1 rounded-full bg-gradient-to-r from-[#FFCB9A] to-[#D9B08C] mx-auto"
            aria-hidden="true"
          />
        </header>

        {/* ═══════════ WORKFLOW ═══════════ */}
        <section className="workflow-section space-y-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight">
            Quy trình làm việc
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AI_STEPS.map(({ step, label, tool }) => (
              <div
                key={step}
                className="workflow-step relative flex flex-col items-center text-center gap-3 rounded-2xl border border-secondary-4/20 bg-secondary-4/[0.04] p-6 hover:border-secondary-3/50 transition-colors duration-300"
              >
                {/* connector line (desktop) */}
                <span
                  className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px bg-secondary-4/25 last:hidden"
                  aria-hidden="true"
                />
                <span className="text-4xl font-black text-secondary-3/30 leading-none select-none">
                  {step}
                </span>
                <p className="font-semibold text-sm leading-snug">{label}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-3/15 text-secondary-3 font-medium">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ AI TOOL CARDS ═══════════ */}
        <section className="space-y-12">
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight">
            Chi tiết từng công cụ AI
          </h2>

          {AI_TOOLS.map((tool) => (
            <article
              key={tool.id}
              className="ai-card rounded-3xl border border-secondary-4/20 bg-secondary-4/[0.03] overflow-hidden hover:border-secondary-4/40 transition-colors duration-300"
            >
              {/* card header */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 px-6 md:px-10 py-7"
                style={{ borderBottom: `1px solid ${tool.accentColor}22` }}
              >
                {/* logo */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center p-2"
                  style={{ backgroundColor: `${tool.accentColor}18`, border: `1.5px solid ${tool.accentColor}40` }}
                >
                  {tool.icon ? (
                    <img
                      src={tool.icon}
                      alt={tool.iconLabel}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    /* Copilot fallback icon */
                    <svg
                      viewBox="0 0 24 24"
                      className="w-9 h-9"
                      style={{ color: tool.accentColor }}
                      fill="currentColor"
                      aria-label="GitHub Copilot"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14c-2.67 0-5.027-1.33-6.48-3.37C5.88 14.87 8.78 14 12 14s6.12.87 6.48 2.63A7.963 7.963 0 0 1 12 20z" />
                    </svg>
                  )}
                </div>

                {/* title group */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold">{tool.name}</h3>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: `${tool.accentColor}20`, color: tool.accentColor }}
                    >
                      {tool.role}
                    </span>
                  </div>
                  <p className="text-secondary-4/60 text-sm">{tool.tagline}</p>
                </div>
              </div>

              {/* task list */}
              <div className="px-6 md:px-10 py-8 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-4/40">
                  Các tác vụ đã thực hiện
                </h4>

                <ol className="space-y-5">
                  {tool.tasks.map(({ label, detail }, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: `${tool.accentColor}20`, color: tool.accentColor }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-secondary-4">{label}</p>
                        <p className="text-sm text-secondary-4/65 leading-relaxed">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* output box */}
                <div
                  className="mt-6 rounded-xl p-4 flex gap-3 items-start"
                  style={{ backgroundColor: `${tool.accentColor}0d`, border: `1px solid ${tool.accentColor}30` }}
                >
                  <span style={{ color: tool.accentColor }} className="mt-0.5 flex-shrink-0" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: tool.accentColor }}>
                      Kết quả đầu ra
                    </p>
                    <p className="text-sm text-secondary-4/80 leading-relaxed">{tool.output}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ═══════════ CONCLUSION ═══════════ */}
        <section className="conclusion-block rounded-3xl border border-secondary-3/30 bg-gradient-to-br from-[#FFCB9A]/8 to-[#D9B08C]/5 p-8 md:p-12 text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">Tổng kết</h2>
          <p className="max-w-3xl mx-auto text-secondary-4/75 leading-relaxed text-base md:text-lg">
            Bốn công cụ AI — <strong className="text-secondary-3">NotebookLM</strong>,{' '}
            <strong className="text-secondary-3">Gemini</strong>,{' '}
            <strong className="text-secondary-3">ChatGPT</strong> và{' '}
            <strong className="text-secondary-3">GitHub Copilot</strong> — tạo thành
            một pipeline hoàn chỉnh: từ nghiên cứu học thuật, tìm kiếm nguồn thực tế,
            lên ý tưởng sáng tạo đến triển khai kỹ thuật. AI không thay thế tư duy của
            nhóm mà đóng vai trò công cụ khuếch đại năng lực, giúp chúng tôi hoàn thành
            dự án nhanh hơn, chính xác hơn và sáng tạo hơn.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['Nghiên cứu', 'Tóm tắt', 'Deep Research', 'Ideation', 'UI/UX Design', 'Code Generation', 'Refactoring'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-secondary-3/40 bg-secondary-3/10 text-secondary-3"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
