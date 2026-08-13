// Global AudioManager to control ambient sound across the application

let audioInstance: HTMLAudioElement | null = null;
let isAudioMuted = false;
let isInitialized = false;

const initAudio = () => {
  if (typeof window === 'undefined' || isInitialized) return;
  audioInstance = new Audio('/song.mp3');
  audioInstance.loop = true;
  audioInstance.volume = 0.5; // Moderate volume
  isInitialized = true;
};

export const audioManager = {
  start: () => {
    initAudio();
    if (audioInstance && !isAudioMuted) {
      audioInstance.play().catch(err => {
        console.warn('Audio autoplay blocked by browser. Will play on first user click.', err);
      });
    }
  },

  pause: () => {
    if (audioInstance) {
      audioInstance.pause();
    }
  },

  resume: () => {
    if (audioInstance && !isAudioMuted) {
      audioInstance.play().catch(err => console.error('Audio resume failed', err));
    }
  },

  toggleMute: (): boolean => {
    isAudioMuted = !isAudioMuted;
    if (audioInstance) {
      if (isAudioMuted) {
        audioInstance.pause();
      } else {
        audioInstance.play().catch(err => console.error('Audio play failed after unmute', err));
      }
    }
    return isAudioMuted;
  },

  isMuted: (): boolean => {
    return isAudioMuted;
  },

  setVolume: (vol: number) => {
    if (audioInstance) {
      audioInstance.volume = vol;
    }
  }
};
