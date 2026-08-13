// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Setup Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis scrolling with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Configuration for Image Sequence
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const frameCount = 600;
const currentFrame = (index) => `./60/frame_${(index + 1).toString().padStart(4, '0')}.webp`;

const images = [];
const sequence = { frame: 0 };
let loadedCount = 0;

// Setup image preloader
function preloadImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            updateProgress();
        };
        img.onerror = () => {
            loadedCount++; // count failed images to prevent progress bar freeze
            updateProgress();
            console.warn(`Failed to load frame: ${i + 1}`);
        };
        images.push(img);
    }
}

// Update preloader UI
function updateProgress() {
    const percent = Math.round((loadedCount / frameCount) * 100);
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    
    progressBar.style.width = `${percent}%`;
    progressText.innerText = `${percent}%`;
    
    if (loadedCount === frameCount) {
        // Fade out loader and initialize site
        setTimeout(() => {
            const loader = document.getElementById("loader");
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            
            initAnimation();
        }, 500); // slight delay for visual finish
    }
}

// Canvas Cover Rendering (CSS object-fit: cover equivalent)
function drawCoverImage(img) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;
    
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
    } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
    }
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// Handle resizing (High-DPI support & Image Smoothing Quality)
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Force browser to use high-quality image smoothing context algorithms
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    const currentImg = images[Math.round(sequence.frame)];
    if (currentImg && currentImg.complete) {
        drawCoverImage(currentImg);
    }
}

// Initialize animations once images are ready
function initAnimation() {
    // Set initial canvas size and draw first frame
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Scrub through the image frames with GSAP ScrollTrigger
    gsap.to(sequence, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
            trigger: "#scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // subtle lag for smooth interpolation
        },
        onUpdate: () => {
            const frameIndex = Math.round(sequence.frame);
            const img = images[frameIndex];
            if (img && img.complete) {
                drawCoverImage(img);
            }
        }
    });
}

// Start preloading
preloadImages();
