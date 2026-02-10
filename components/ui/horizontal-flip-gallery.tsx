'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { title: 'DDC Event', url: '/photos/DSC_0161.JPG' },
  { title: 'Infuturum', url: '/photos/DSC_0163.JPG' },
  { title: 'DDC Workshop', url: '/photos/DSC_0179.JPG' },
  { title: 'ACM Community', url: '/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg' },
  { title: 'Tech Innovation', url: '/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg' }
];

const FLIP_SPEED = 750;
const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

const flipAnimationLeft = [
  { transform: 'rotateY(0)' },
  { transform: 'rotateY(90deg)' },
  { transform: 'rotateY(90deg)' }
];
const flipAnimationRight = [
  { transform: 'rotateY(-90deg)' },
  { transform: 'rotateY(-90deg)' },
  { transform: 'rotateY(0)' }
];

const flipAnimationLeftReverse = [
  { transform: 'rotateY(90deg)' },
  { transform: 'rotateY(90deg)' },
  { transform: 'rotateY(0)' }
];
const flipAnimationRightReverse = [
  { transform: 'rotateY(0)' },
  { transform: 'rotateY(-90deg)' },
  { transform: 'rotateY(-90deg)' }
];

export default function HorizontalFlipGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniteRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = containerRef.current.querySelectorAll('.unite');
    defineFirstImg();
  }, []);

  const defineFirstImg = () => {
    uniteRef.current?.forEach(setActiveImage);
    setImageTitle();
  };

  const setActiveImage = (el: HTMLDivElement) => {
    el.style.backgroundImage = `url('${images[currentIndex].url}')`;
  };

  const setImageTitle = () => {
    const gallery = containerRef.current;
    if (!gallery) return;
    gallery.setAttribute('data-title', images[currentIndex].title);
    gallery.style.setProperty('--title-y', '0');
    gallery.style.setProperty('--title-opacity', '1');
  };

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    const leftAnim = isReverse ? flipAnimationLeftReverse : flipAnimationLeft;
    const rightAnim = isReverse ? flipAnimationRightReverse : flipAnimationRight;

    gallery.querySelector('.overlay-left')?.animate(leftAnim, flipTiming);
    gallery.querySelector('.overlay-right')?.animate(rightAnim, flipTiming);

    gallery.style.setProperty('--title-y', '-1rem');
    gallery.style.setProperty('--title-opacity', '0');
    gallery.setAttribute('data-title', '');

    uniteRef.current?.forEach((el, idx) => {
      const delay = (isReverse && (idx !== 1 && idx !== 2)) || (!isReverse && (idx === 1 || idx === 2)) ? FLIP_SPEED - 200 : 0;
      setTimeout(() => setActiveImage(el), delay);
    });

    setTimeout(setImageTitle, FLIP_SPEED * 0.5);
  };

  const updateIndex = (increment: number) => {
    const newIndex = (currentIndex + increment + images.length) % images.length;
    const isReverse = increment < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative bg-white/10 border border-white/25 p-2'>
        <div
          id='flip-gallery-horizontal'
          ref={containerRef}
          className='relative w-[600px] h-[360px] md:w-[800px] md:h-[480px] text-center'
          style={{ perspective: '800px' }}
        >
          <div className='left unite bg-cover bg-no-repeat'></div>
          <div className='right unite bg-cover bg-no-repeat'></div>
          <div className='overlay-left unite bg-cover bg-no-repeat'></div>
          <div className='overlay-right unite bg-cover bg-no-repeat'></div>
        </div>

        <div className='absolute top-full right-0 mt-2 flex gap-2'>
          <button
            type='button'
            onClick={() => updateIndex(-1)}
            title='Previous'
            className='text-white opacity-75 hover:opacity-100 hover:scale-125 transition'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type='button'
            onClick={() => updateIndex(1)}
            title='Next'
            className='text-white opacity-75 hover:opacity-100 hover:scale-125 transition'
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        #flip-gallery-horizontal::after {
          content: '';
          position: absolute;
          background-color: black;
          height: 100%;
          width: 4px;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }

        #flip-gallery-horizontal::before {
          content: attr(data-title);
          color: rgba(255 255 255 / 0.75);
          font-size: 0.875rem;
          position: absolute;
          top: calc(100% + 1rem);
          left: 0;
          line-height: 2;
          opacity: var(--title-opacity, 0);
          transform: translateY(var(--title-y, 0));
          transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
        }

        #flip-gallery-horizontal > * {
          position: absolute;
          width: 50%;
          height: 100%;
          overflow: hidden;
          background-size: 600px 360px;
        }

        @media (min-width: 768px) {
          #flip-gallery-horizontal > * {
            background-size: 800px 480px;
          }
        }

        .left,
        .overlay-left {
          left: 0;
          transform-origin: right;
          background-position: left;
        }

        .right,
        .overlay-right {
          right: 0;
          transform-origin: left;
          background-position: right;
        }
      `}</style>
    </div>
  );
}
