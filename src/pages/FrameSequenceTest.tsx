import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_BASE_URL = 'http://dev.heyharoon.io/scene2/samples_frames/';
const START_FRAME = 11;
const END_FRAME = 240;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

const FrameSequenceTest = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const frameIndexRef = useRef({ value: 0 });

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      
      for (let i = START_FRAME; i <= END_FRAME; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedCount(prev => prev + 1);
            resolve(img);
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            reject(new Error(`Failed to load frame ${i}`));
          };
          img.src = `${FRAME_BASE_URL}frame${i}.jpg`;
        });
        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.allSettled(imagePromises);
        const successfulImages = loadedImages
          .filter((result): result is PromiseFulfilledResult<HTMLImageElement> => 
            result.status === 'fulfilled'
          )
          .map(result => result.value);
        
        setImages(successfulImages);
        setIsLoading(false);
        console.log(`Loaded ${successfulImages.length} of ${TOTAL_FRAMES} frames`);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Setup GSAP animation
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(frameIndexRef.current.value));
    };

    const renderFrame = (index: number) => {
      const frameIdx = Math.max(0, Math.min(images.length - 1, index));
      const img = images[frameIdx];
      if (!img || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Scale image to cover canvas
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // GSAP ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${images.length * 8}`,
        pin: true,
        scrub: 1.5,
        onUpdate: () => {
          renderFrame(Math.round(frameIndexRef.current.value));
        },
        onLeave: () => renderFrame(images.length - 1),
        onLeaveBack: () => renderFrame(0),
        onEnterBack: () => renderFrame(Math.round(frameIndexRef.current.value)),
        onRefresh: () => renderFrame(Math.round(frameIndexRef.current.value)),
      }
    });

    tl.to(frameIndexRef.current, {
      value: images.length - 1,
      ease: 'none',
    });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, [images]);

  return (
    <div className="min-h-[200vh] bg-black">
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin mb-6" />
          <p className="text-white/60 font-light tracking-widest text-sm">
            Loading experience...
          </p>
          <p className="text-white/40 text-xs mt-2">
            {loadedCount} / {TOTAL_FRAMES} frames
          </p>
        </div>
      )}

      {/* Frame Sequence Container */}
      {!isLoading && images.length > 0 && (
        <div ref={containerRef} className="h-screen w-full relative">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {/* Content after animation */}
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center px-8">
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-6">
            Animation Complete
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            The scroll-triggered frame sequence has finished. Normal scrolling has resumed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrameSequenceTest;
