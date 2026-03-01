import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TimelineEvent } from '../constants';

const parseImageUrls = (hint: string): string[] => hint.match(/https?:\/\/[^\s,]+/gi) ?? [];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TimelineEvent | null;
}

export default function Modal({ isOpen, onClose, data }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(
        contentRef.current,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!data) return null;

  const imageUrls = parseImageUrls(data.imageHint);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center invisible bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="w-full max-w-4xl p-8 mx-4 bg-primary/80 border border-secondary-4/20 rounded-2xl shadow-2xl text-secondary-4 overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm uppercase tracking-[0.2em] text-secondary-4/70 mb-2">{data.phase}</h2>
        <h3 className="text-4xl font-bold text-secondary-3 mb-1">{data.year}</h3>
        <h4 className="text-2xl font-bold text-secondary-4 mb-2">{data.title}</h4>
        <p className="text-secondary-3/90 mb-6">{data.subtitle}</p>

        <div className="space-y-6">
          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Tóm tắt</h5>
            <p className="text-secondary-4/90 leading-relaxed">{data.summary}</p>
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Bối cảnh</h5>
            <p className="text-secondary-4/90 leading-relaxed">{data.context}</p>
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Nội dung chính</h5>
            <ul className="list-disc pl-6 space-y-2 text-secondary-4/90">
              {data.mainContent.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Nhân vật liên quan</h5>
            <div className="flex flex-wrap gap-2">
              {data.relatedFigures.map((figure) => (
                <span key={figure} className="px-3 py-1 rounded-full border border-secondary-4/30 text-sm text-secondary-4/90">
                  {figure}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Ý nghĩa</h5>
            <ul className="list-disc pl-6 space-y-2 text-secondary-4/90">
              {data.significance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Hình ảnh gợi ý</h5>
            {imageUrls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {imageUrls.map((src, i) => (
                  <img
                    key={`modal-img-${i}`}
                    src={src}
                    alt={`Minh họa ${i + 1}`}
                    className="w-full aspect-video object-contain rounded-lg border border-secondary-4/30 bg-secondary-2/20"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            ) : (
              <p className="text-secondary-4/90 leading-relaxed">{data.imageHint}</p>
            )}
          </section>

          <section>
            <h5 className="text-lg font-semibold text-secondary-3 mb-2">Từ khóa nổi bật</h5>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword) => (
                <span key={keyword} className="px-3 py-1 rounded-full text-sm border border-secondary-3/50 text-secondary-3 bg-secondary-3/10">
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {data.quote && (
            <section>
              <h5 className="text-lg font-semibold text-secondary-3 mb-2">Trích dẫn</h5>
              <blockquote className="border-l-2 border-secondary-3 pl-4 italic text-secondary-4/80">
                {data.quote}
              </blockquote>
            </section>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-4/50 hover:text-secondary-4 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
}
