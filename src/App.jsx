import { useEffect, useRef } from 'react';
import captions from './captions.js';

const PHOTO_COUNT = 16;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { src: `/photos/${n}.webp`, caption: captions[i] ?? '' };
});

function PlumBlossom({ className = '', size = 64 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="32"
            cy="18"
            rx="9"
            ry="13"
            transform={`rotate(${deg} 32 32)`}
            opacity="0.95"
          />
        ))}
        <circle cx="32" cy="32" r="4.5" fill="#E8C76A" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <circle
            key={deg}
            cx="32"
            cy="25"
            r="1.2"
            fill="#E8C76A"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </g>
    </svg>
  );
}

function PhotoCard({ src, caption, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Math.min(index % 3, 2) * 90;
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <figure ref={ref} className="photo-card">
      <div className="aspect-square w-full overflow-hidden bg-crimsonDeep ring-1 ring-gold/30 shadow-photo">
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden';
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-ivory/80 font-serif italic leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function App() {
  return (
    <main className="relative min-h-screen text-ivory">
      <div className="bg-hanzi" />

      {/* Corner plum blossoms */}
      <PlumBlossom
        className="pointer-events-none absolute -left-4 top-8 text-blush/70 rotate-[-18deg]"
        size={96}
      />
      <PlumBlossom
        className="pointer-events-none absolute right-2 top-32 text-blush/50 rotate-[22deg] hidden sm:block"
        size={72}
      />
      <PlumBlossom
        className="pointer-events-none absolute -right-6 bottom-40 text-blush/60 rotate-[12deg]"
        size={110}
      />
      <PlumBlossom
        className="pointer-events-none absolute left-4 bottom-8 text-blush/40 rotate-[-30deg] hidden sm:block"
        size={80}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* Header */}
        <header className="text-center">
          <h1 className="font-zh text-5xl md:text-7xl font-semibold tracking-wide gold-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            给妈妈
          </h1>
          <p className="mt-4 text-sm md:text-base text-ivory/70 font-serif italic">
            From Felix, with love · 母亲节快乐
          </p>
          <div className="mx-auto mt-6 h-px w-24 ink-divider" aria-hidden="true" />
        </header>

        {/* Quote block */}
        <section className="mt-20 md:mt-28 text-center">
          <div className="mx-auto max-w-2xl rounded-sm border border-gold/30 bg-crimsonDeep/40 px-8 py-10 backdrop-blur-sm">
            <p className="font-zh text-2xl md:text-4xl leading-relaxed gold-text">
              慈母手中线，游子身上衣
            </p>
            <p className="mt-5 text-sm md:text-base text-ivory/75 font-serif italic">
              “The loving mother&apos;s thread is woven into the wandering son&apos;s coat”
            </p>
            <div className="mx-auto mt-7 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-12 bg-gold/60" />
              <PlumBlossom className="text-blush/80" size={20} />
              <span className="h-px w-12 bg-gold/60" />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <PhotoCard key={i} src={p.src} caption={p.caption} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
