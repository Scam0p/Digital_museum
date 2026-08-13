const FRAME_COUNT = 600;
const imagesCache: HTMLImageElement[] = [];
let preloadPromise: Promise<HTMLImageElement[]> | null = null;

/**
 * Preloads all 3D Hero webp sequence frames.
 * Returns a promise that resolves with the loaded image elements.
 * Progress is reported through the onProgress callback (0 to 100).
 */
export function preloadHeroImages(onProgress: (percent: number) => void): Promise<HTMLImageElement[]> {
  if (preloadPromise) {
    // If already preloaded or preloading, return the existing promise
    // But we still want to report 100% progress immediately if it's already done
    if (imagesCache.length === FRAME_COUNT) {
      onProgress(100);
    }
    return preloadPromise;
  }

  preloadPromise = new Promise((resolve) => {
    let loadedCount = 0;
    const totalFrames = FRAME_COUNT;

    const handleSingleImageLoad = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / totalFrames) * 100);
      onProgress(percent);

      if (loadedCount === totalFrames) {
        resolve(imagesCache);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Use absolute path relative to the public root where the files are served
      const frameNum = String(i + 1).padStart(4, '0');
      img.src = `/60/frame_${frameNum}.webp`;

      img.onload = handleSingleImageLoad;
      img.onerror = () => {
        console.warn(`Failed to preload frame: ${i + 1}`);
        // Count errors as loaded to prevent progress bar freezing
        handleSingleImageLoad();
      };

      imagesCache.push(img);
    }
  });

  return preloadPromise;
}

/**
 * Returns the cached preloaded images.
 */
export function getHeroImages(): HTMLImageElement[] {
  return imagesCache;
}
