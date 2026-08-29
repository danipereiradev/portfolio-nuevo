import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { trackPlayReviewVideo } from '../utils/analytics';

const VIDEO_SRC = '/video/juanvi-testimonio.mp4';
const POSTER_SRC = '/video/juanvi-testimonio.webp';
const SITE_URL = 'https://hoyviajamosweb.com';

function VideoTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedPlay = useRef(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const startPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.ended) video.currentTime = 0;
    setShowOverlay(false);

    try {
      await video.play();
    } catch {
      setShowOverlay(true);
      return;
    }

    if (!hasTrackedPlay.current) {
      hasTrackedPlay.current = true;
      trackPlayReviewVideo({
        videoName: 'Juanvi Raga',
        company: 'Hoy Viajamos',
      });
    }
  };

  return (
    <figure className='video-testimonial mx-auto w-full max-w-[20rem]'>
      <div className='relative overflow-hidden rounded-lg bg-black'>
        <video
          ref={videoRef}
          className='aspect-[9/16] w-full object-cover'
          poster={POSTER_SRC}
          playsInline
          preload='none'
          controls={!showOverlay}
          onEnded={() => setShowOverlay(true)}
        >
          <source src={VIDEO_SRC} type='video/mp4' />
        </video>

        {showOverlay ? (
          <button
            type='button'
            onClick={startPlayback}
            aria-label='Reproducir testimonio de Juanvi Raga'
            className='group absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink-dark/55 px-4 text-center transition-colors hover:bg-ink-dark/45'
          >
            <span className='flex h-20 w-20 items-center justify-center rounded-full bg-brand-light transition-transform duration-150 group-hover:scale-105'>
              <Play
                className='ml-1 h-9 w-9 fill-ink-dark text-ink-dark'
                aria-hidden='true'
              />
            </span>
            <span className='rounded-lg bg-brand-light px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink-dark'>
              Testimonio en vídeo
            </span>
          </button>
        ) : null}
      </div>
      <figcaption className='mt-3 text-center'>
        <p className='text-base font-extrabold text-ink-dark'>Juanvi Raga</p>
        <a
          href={SITE_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm font-semibold text-accent hover:underline'
        >
          hoyviajamosweb.com
        </a>
      </figcaption>
    </figure>
  );
}

export default VideoTestimonial;
