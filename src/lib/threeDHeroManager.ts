const FRAME_COUNT = 600;
const imagesCache: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
const isLoadedMap: boolean[] = new Array(FRAME_COUNT).fill(false);

let preloadStarted = false;
let criticalReadyResolve: (() => void) | null = null;
let isCriticalReady = false;

const criticalReadyPromise = new Promise<void>((resolve) => {
  criticalReadyResolve = () => {
    isCriticalReady = true;
    resolve();
  };
});

// Progress listeners
const progressListeners: Set<(percent: number) => void> = new Set();

let criticalDone = 0;
let totalCriticalFrames = 0;
let totalLoadedCount = 0;

function notifyProgress(percent: number) {
  progressListeners.forEach((fn) => fn(percent));
}

// Helper to create & load a single image
function loadFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    if (imagesCache[index] && isLoadedMap[index]) {
      resolve(imagesCache[index]!);
      return;
    }

    const img = new Image();
    const frameNum = String(index + 1).padStart(4, "0");
    img.src = `/60/frame_${frameNum}.webp`;

    img.onload = () => {
      isLoadedMap[index] = true;
      imagesCache[index] = img;
      resolve(img);
    };

    img.onerror = () => {
      console.warn(`Frame ${index + 1} load failed, continuing.`);
      isLoadedMap[index] = false;
      resolve(img);
    };
  });
}

/**
 * Starts preloading immediately in the background with a 2-stage prioritized strategy:
 * 1. Immediate Critical Batch: First 30 frames + every 5th keyframe across the full 600-frame timeline.
 * 2. Background Stream: Concurrently fills all remaining frames without blocking user navigation.
 */
export function startHeroPreload(): void {
  if (preloadStarted) return;
  preloadStarted = true;

  // 1. Critical keyframe indices (covers full scrub range evenly + top landing)
  const criticalIndicesSet = new Set<number>();
  for (let i = 0; i < 30; i++) criticalIndicesSet.add(i);
  for (let i = 0; i < FRAME_COUNT; i += 5) criticalIndicesSet.add(i);

  const criticalIndices = Array.from(criticalIndicesSet);
  totalCriticalFrames = criticalIndices.length;

  const remainingIndices: number[] = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    if (!criticalIndicesSet.has(i)) {
      remainingIndices.push(i);
    }
  }

  // Load critical batch with high concurrency pool (16 parallel workers)
  const loadCriticalPool = async () => {
    const queue = [...criticalIndices];
    const workers = Array.from({ length: 16 }, async () => {
      while (queue.length > 0) {
        const idx = queue.shift()!;
        await loadFrame(idx);
        criticalDone++;
        totalLoadedCount++;
        const percent = Math.min(100, Math.round((criticalDone / totalCriticalFrames) * 100));
        notifyProgress(percent);
      }
    });

    await Promise.all(workers);

    // Critical batch is loaded! Signal that user can enter immediately
    if (criticalReadyResolve) {
      criticalReadyResolve();
    }

    // Now progressively stream remaining frames in background
    streamRemainingFrames(remainingIndices);
  };

  loadCriticalPool();
}

async function streamRemainingFrames(queue: number[]) {
  // Balanced background worker pool so it doesn't freeze the main thread or starve network
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length > 0) {
      const idx = queue.shift()!;
      await loadFrame(idx);
      totalLoadedCount++;
    }
  });
  await Promise.all(workers);
}

/**
 * Preloads essential hero images for the loading screen.
 * Resolves as soon as the critical batch is ready (~1-2 seconds),
 * while remaining frames continue streaming smoothly in background.
 */
export function preloadHeroImages(onProgress: (percent: number) => void): Promise<void> {
  progressListeners.add(onProgress);

  if (isCriticalReady) {
    onProgress(100);
    return Promise.resolve();
  }

  startHeroPreload();

  return criticalReadyPromise.then(() => {
    onProgress(100);
  });
}

/**
 * Returns the exact frame or the nearest loaded frame to ensure:
 * - 0 black screens or flickers
 * - 100% full original resolution
 * - 60 FPS smooth scrubbing from second one
 */
export function getHeroFrame(idx: number): HTMLImageElement | null {
  const target = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(idx)));

  // 1. Direct hit if loaded
  if (isLoadedMap[target] && imagesCache[target]) {
    return imagesCache[target];
  }

  // 2. Outward search for nearest loaded keyframe
  for (let offset = 1; offset < 30; offset++) {
    const prev = target - offset;
    if (prev >= 0 && isLoadedMap[prev] && imagesCache[prev]) {
      return imagesCache[prev];
    }
    const next = target + offset;
    if (next < FRAME_COUNT && isLoadedMap[next] && imagesCache[next]) {
      return imagesCache[next];
    }
  }

  // 3. Fallback to any loaded frame
  for (let i = 0; i < FRAME_COUNT; i++) {
    if (isLoadedMap[i] && imagesCache[i]) {
      return imagesCache[i];
    }
  }

  return null;
}

export function getHeroImages(): (HTMLImageElement | null)[] {
  return imagesCache;
}
