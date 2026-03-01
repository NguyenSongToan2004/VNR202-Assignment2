import React from 'react';
import { TimelineEvent } from '../constants';

interface ContentSectionProps extends Pick<TimelineEvent, 'year' | 'phase' | 'subtitle' | 'title' | 'summary' | 'context' | 'keywords' | 'imageHint' | 'quote'> {
  sectionIndex: number;
  onOpenModal: () => void;
}

const parseImageUrls = (hint: string): string[] => {
  const urlPattern = /https?:\/\/[^\s,]+/gi;
  return hint.match(urlPattern) ?? [];
};

const ContentSection: React.FC<ContentSectionProps> = ({
  year,
  phase,
  subtitle,
  title,
  summary,
  context,
  keywords,
  imageHint,
  quote,
  sectionIndex,
  onOpenModal,
}) => {
  const imageUrls = parseImageUrls(imageHint);
  const hasImages = imageUrls.length > 0;

  return (
    <section className={`content-section relative min-h-screen overflow-hidden flex items-center justify-center section-${sectionIndex}`}>
      <div className="absolute left-16 top-1/2 -translate-y-1/2 text-8xl md:text-[16rem] lg:text-[20rem] font-bold text-white/5 opacity-50 pointer-events-none select-none">
        {year}
      </div>

      <div className="section-content w-full max-w-4xl px-8 text-left ml-auto md:pr-20 lg:pr-28">
        <p className="text-sm uppercase tracking-[0.2em] text-secondary-4/60 mb-2">{phase}</p>
        <h2 className="text-4xl font-bold text-secondary-3 mb-2">{year}</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-secondary-4 mb-3">{title}</h3>
        <p className="text-base md:text-lg text-secondary-3/90 mb-4">{subtitle}</p>

        <p className="text-lg text-secondary-4/90 leading-relaxed mb-4">{summary}</p>

        <div className="rounded-xl border border-secondary-4/20 bg-secondary-1/10 p-4 mb-4">
          <p className="text-sm uppercase tracking-wider text-secondary-4/60 mb-2">Khối chi tiết mở rộng</p>
          <p className="text-secondary-4/90 leading-relaxed">{context}</p>
        </div>

        <div className="rounded-xl border border-secondary-4/20 bg-primary/40 p-4 mb-4">
          <p className="text-sm uppercase tracking-wider text-secondary-4/60 mb-2">Hình ảnh minh họa (gợi ý)</p>
          {hasImages ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {imageUrls.map((src, i) => (
                <img
                  key={`${year}-img-${i}`}
                  src={src}
                  alt={`Minh họa ${i + 1}`}
                  className="w-full aspect-video object-contain rounded-lg border border-secondary-4/30 bg-secondary-2/20"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          ) : (
            <p className="text-secondary-4/85">{imageHint}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((keyword) => (
            <span
              key={`${year}-${keyword}`}
              className="px-3 py-1 rounded-full text-sm border border-secondary-3/50 text-secondary-3 bg-secondary-3/10"
            >
              {keyword}
            </span>
          ))}
        </div>

        {quote && (
          <blockquote className="border-l-2 border-secondary-3 pl-4 italic text-secondary-4/80 mb-5">
            {quote}
          </blockquote>
        )}

        <button 
          onClick={onOpenModal}
          className="mt-6 px-6 py-2 border border-secondary-3 text-secondary-3 rounded-full hover:bg-secondary-3 hover:text-primary transition-colors duration-300">
          Xem chi tiết
        </button>
      </div>
    </section>
  );
};

export default ContentSection;
