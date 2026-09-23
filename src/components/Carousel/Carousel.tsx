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

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => startX.current = e.touches[0].clientX;
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev(); else if (dx < -50) next();
    startX.current = null;
  };

  return (
    <div className={`carousel ${className}`.trim()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)`, width: `${length * 100}%` }}>
        {React.Children.map(children, child => (
          <div className="carousel__slide" style={{ width: `${100 / length}%` }}>{child}</div>
        ))}
      </div>

      {length > 1 && (
        <>
          <button aria-label="Previous" onClick={prev} className="carousel__nav carousel__nav--prev">‹</button>
          <button aria-label="Next" onClick={next} className="carousel__nav carousel__nav--next">›</button>
        </>
      )}

      {length > 1 && (
        <div className="carousel__dots">
          {Array.from({ length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel__dot ${i === index ? 'is-active' : ''}`.trim()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
