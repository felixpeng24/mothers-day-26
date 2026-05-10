import { useEffect, useRef } from 'react';
import captions from './captions.js';

const PHOTO_COUNT = 16;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { src: `/photos/${n}.webp`, caption: captions[i] ?? '' };
});

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
            const delay = Math.min(index % 3, 2) * 80;
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
      <div className="aspect-square w-full overflow-hidden bg-stone-100">
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
      <figcaption className="mt-3 text-sm text-muted font-serif italic leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* Header */}
        <header className="text-center">
          <h1 className="font-zh text-5xl md:text-6xl font-medium tracking-wide text-ink">
            给妈妈
          </h1>
          <p className="mt-4 text-sm md:text-base text-muted font-serif italic">
            From Felix, with love
          </p>
        </header>

        {/* Quote block */}
        <section className="mt-20 md:mt-28 text-center">
          <p className="font-zh text-2xl md:text-3xl leading-relaxed text-ink">
            慈母手中线，游子身上衣
          </p>
          <p className="mt-5 text-sm md:text-base text-muted font-serif italic">
            “The loving mother&apos;s thread is woven into the wandering son&apos;s coat”
          </p>
          <div
            className="mx-auto mt-8 h-px w-16 bg-accent/70"
            aria-hidden="true"
          />
        </section>

        {/* Gallery */}
        <section className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <PhotoCard key={i} src={p.src} caption={p.caption} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
