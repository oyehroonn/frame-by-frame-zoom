import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 250;
const FRAME_BASE_URL = "https://dev.heyharoon.io/scene2/samples_frames/frame";

const FrameSequenceScene2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const frameIndexRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imageArray: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
      
      console.log(`\n========== SCENE 2: STARTING FRAME LOAD ==========`);
      console.log(`Total frames to load: ${TOTAL_FRAMES}`);
      
      const BATCH_SIZE = 15;
      
      for (let batch = 0; batch < Math.ceil(TOTAL_FRAMES / BATCH_SIZE); batch++) {
        const batchPromises: Promise<void>[] = [];
        const startIdx = batch * BATCH_SIZE;
        const endIdx = Math.min(startIdx + BATCH_SIZE, TOTAL_FRAMES);
        
        for (let i = startIdx; i < endIdx; i++) {
          const frameNum = i + 1;
          const promise = new Promise<void>((resolve) => {
            const img = new Image();
            const frameUrl = `${FRAME_BASE_URL}${frameNum}.jpg`;
            img.crossOrigin = "anonymous";
            
            img.onload = () => {
              imageArray[i] = img;
              setLoadedCount((prev) => prev + 1);
              resolve();
            };
            
            img.onerror = () => {
              setLoadedCount((prev) => prev + 1);
              console.warn(`Scene2: Failed to load frame${frameNum}.jpg`);
              resolve();
            };
            
            img.src = frameUrl;
          });
          batchPromises.push(promise);
        }
        
        await Promise.all(batchPromises);
      }
      
      const validImages = imageArray.filter((img): img is HTMLImageElement => img !== null);
      setImages(validImages);
      imagesRef.current = validImages;
      setIsLoading(false);
      
      console.log(`Scene 2: Loaded ${validImages.length}/${TOTAL_FRAMES} frames`);
    };

    loadImages();
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs = imagesRef.current;
    if (imgs.length === 0) return;

    const frameIndex = Math.min(Math.max(index, 0), imgs.length - 1);
    const img = imgs[frameIndex];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Setup canvas sizing
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndexRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    renderFrame(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoading, images, renderFrame]);

  // Wheel event handler - only active when hovering
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || images.length === 0) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;
      
      const delta = e.deltaY;
      const currentFrame = frameIndexRef.current;
      const maxFrame = images.length - 1;
      
      // Allow normal scroll if at the end and scrolling down
      if (currentFrame >= maxFrame && delta > 0) {
        return;
      }
      
      // Allow normal scroll if at the beginning and scrolling up
      if (currentFrame <= 0 && delta < 0) {
        return;
      }
      
      // Otherwise, capture the scroll for animation
      e.preventDefault();
      e.stopPropagation();
      
      const sensitivity = 0.5;
      const frameChange = Math.sign(delta) * Math.max(1, Math.abs(delta) * sensitivity / 50);
      
      frameIndexRef.current = Math.min(
        Math.max(currentFrame + frameChange, 0),
        maxFrame
      );
      
      renderFrame(Math.round(frameIndexRef.current));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isHovering, isLoading, images, renderFrame]);

  // Touch event handler for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || images.length === 0) return;

    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentTouchY = e.touches[0].clientY;
      const delta = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;
      
      const currentFrame = frameIndexRef.current;
      const maxFrame = images.length - 1;
      
      // Allow normal scroll at boundaries
      if (currentFrame >= maxFrame && delta > 0) return;
      if (currentFrame <= 0 && delta < 0) return;
      
      e.preventDefault();
      
      const sensitivity = 0.3;
      const frameChange = delta * sensitivity;
      
      frameIndexRef.current = Math.min(
        Math.max(frameIndexRef.current + frameChange, 0),
        maxFrame
      );
      
      renderFrame(Math.round(frameIndexRef.current));
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLoading, images, renderFrame]);

  const loadingProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="relative z-0">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative h-screen w-full overflow-hidden bg-background cursor-grab active:cursor-grabbing"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background">
            <h2 className="font-display text-lg tracking-[0.3em] text-foreground/60">
              LOADING SCENE
            </h2>
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 bg-foreground/60 transition-all duration-150 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {loadedCount}/{TOTAL_FRAMES} ({loadingProgress}%)
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <p className="font-mono text-sm text-muted-foreground">Scene unavailable</p>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
            />
            {/* Hover indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-sans text-[10px] tracking-[0.25em] text-foreground/50 uppercase">
                Scroll to explore
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FrameSequenceScene2;
