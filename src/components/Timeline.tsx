import { TIMELINE_DATA } from '../constants';

export default function Timeline() {
  return (
    <div className="timeline-shell fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block rounded-2xl border border-secondary-3/30 bg-primary/70 backdrop-blur-sm shadow-2xl px-4 py-6">
      <div className="relative h-[56vh] flex flex-col justify-between">
        <div className="absolute top-0 left-2 w-1 h-full rounded-full bg-secondary-4/25" />
        <div className="absolute top-0 left-2 w-1 h-0 rounded-full bg-secondary-3 progress-bar" />
        <div className="relative flex flex-col justify-between h-full">
          {TIMELINE_DATA.map((item, index) => (
            <div key={item.year} className="relative flex items-center">
              <div className={`w-5 h-5 rounded-full bg-secondary-4/50 border-2 border-secondary-4/60 timeline-dot timeline-dot-${index}`} />
              <span className={`ml-4 text-sm font-bold opacity-50 text-secondary-4 timeline-year timeline-year-${index}`}>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
