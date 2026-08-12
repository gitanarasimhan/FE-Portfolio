import React, { useEffect, useRef } from 'react';

type CarouselProps = {
  children: React.ReactNode[];
  interval?: number; // ms, 0 disables autoplay
  className?: string;
};

export const Carousel: React.FC<CarouselProps> = ({ children, interval = 4000, className = '' }) => {
  const [index, setIndex] = React.useState(0);
  const timerRef = useRef<number | null>(null);
  const length = React.Children.count(children);

  useEffect(() => {
    if (interval > 0) {
      timerRef.current = window.setInterval(() => setIndex(i => (i + 1) % length), interval);
      return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
    }
  }, [interval, length]);

  const prev = () => setIndex(i => (i - 1 + length) % length);
  const next = () => setIndex(i => (i + 1) % length);

  // basic touch support
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => startX.current = e.touches[0].clientX;
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev(); else if (dx < -50) next();
    startX.current = null;
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex transition-transform" style={{ transform: `translateX(-${index * 100}%)`, width: `${length * 100}%` }}>
        {React.Children.map(children, child => (
          <div className="w-full flex-shrink-0" style={{ width: `${100 / length}%` }}>{child}</div>
        ))}
      </div>

      <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">◀</button>
      <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">▶</button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i+1}`} className={`w-2 h-2 rounded-full ${i===index? 'bg-black' : 'bg-gray-300'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
