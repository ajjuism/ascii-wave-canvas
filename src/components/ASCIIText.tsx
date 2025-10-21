// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
  vUv = uv;
  float time = uTime * 5.;
  
  float waveFactor = uEnableWaves;
  
  vec3 transformed = position;
  
  transformed.x += sin(time + position.y) * 0.5 * waveFactor;
  transformed.y += cos(time + position.z) * 0.15 * waveFactor;
  transformed.z += sin(time + position.x) * waveFactor;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;
  vec2 pos = vUv;
  
  float move = sin(time + mouse) * 0.01;
  float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
  float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
  float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}
`;

// Utility function to map a value from one range to another
const mapRange = (n: number, start: number, stop: number, start2: number, stop2: number): number => {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
};

const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deg: number;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
  center: { x: number; y: number };
  mouse: { x: number; y: number };
  isInitialized: boolean;
  frameCount: number;
  hasValidContent: boolean;
  consecutiveValidFrames: number;
  previousAsciiContent: string;
  isWarmingUp: boolean;
  warmupFrames: number;
  onReadyCallback?: () => void;

  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: any = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.domElement.appendChild(this.canvas);

    this.deg = 0;
    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset = charset ?? ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

    // Disable image smoothing for crisp pixel rendering
    this.context.imageSmoothingEnabled = false;
    (this.context as any).webkitImageSmoothingEnabled = false;
    (this.context as any).mozImageSmoothingEnabled = false;
    (this.context as any).msImageSmoothingEnabled = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', this.onMouseMove);

    this.width = 0;
    this.height = 0;
    this.cols = 0;
    this.rows = 0;
    this.center = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.isInitialized = false;
    this.frameCount = 0;
    this.hasValidContent = false;
    this.consecutiveValidFrames = 0;
    this.previousAsciiContent = '';
    this.isWarmingUp = true;
    this.warmupFrames = 0;
    
    // Start hidden, will fade in after warmup
    this.domElement.style.opacity = '0';
    this.domElement.style.transition = 'opacity 1.5s ease-in-out';
  }

  setSize(width: number, height: number) {
    // Ensure even dimensions to prevent half-pixel rendering issues
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.renderer.setSize(this.width, this.height);
    this.reset();

    this.center = { x: this.width / 2, y: this.height / 2 };
    this.mouse = { x: this.center.x, y: this.center.y };
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    
    // For monospace fonts, character width should be consistent
    // Use a fixed ratio for more predictable results
    const charWidth = this.fontSize * 0.6; // Standard monospace ratio

    // Calculate columns and rows with floor to match viewport exactly
    this.cols = Math.floor(this.width / charWidth);
    this.rows = Math.floor(this.height / this.fontSize);

    // Ensure canvas dimensions match exactly
    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    
    // Set precise pre element styling with proper monospace rendering
    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = `${this.fontSize}px`;
    this.pre.style.margin = '0';
    this.pre.style.padding = '0';
    this.pre.style.lineHeight = '1em';
    this.pre.style.letterSpacing = '0';
    this.pre.style.position = 'absolute';
    this.pre.style.left = '50%';
    this.pre.style.top = '50%';
    this.pre.style.transform = 'translate(-50%, -50%)';
    this.pre.style.zIndex = '9';
    this.pre.style.backgroundAttachment = 'fixed';
    this.pre.style.mixBlendMode = 'difference';
    this.pre.style.whiteSpace = 'pre';
    this.pre.style.overflow = 'hidden';
    this.pre.style.fontFeatureSettings = '"kern" 0';
    this.pre.style.textRendering = 'geometricPrecision';
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.renderer.render(scene, camera);
    this.frameCount++;

    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Ensure we have valid dimensions and context
    if (!w || !h || !this.context || w <= 0 || h <= 0) return;
    
    // Check if the renderer's canvas has content and is properly sized
    const rendererCanvas = this.renderer.domElement;
    if (!rendererCanvas || rendererCanvas.width <= 0 || rendererCanvas.height <= 0) return;
    
    // Wait for stability - 5 frames to let WebGL initialize
    if (this.frameCount < 5) {
      return;
    }
    
    this.context.clearRect(0, 0, w, h);
    
    try {
      this.context.drawImage(rendererCanvas, 0, 0, w, h);
      
      // Check if we actually have meaningful content
      const imgData = this.context.getImageData(0, 0, w, h);
      const data = imgData.data;
      
      // More thorough content check - ensure we have enough non-transparent pixels
      let nonTransparentPixels = 0;
      const sampleSize = 100; // Sample every 100th pixel
      
      for (let i = 3; i < data.length; i += (sampleSize * 4)) {
        if (data[i] > 0) {
          nonTransparentPixels++;
        }
      }
      
      // Need at least some meaningful content
      const hasContent = nonTransparentPixels > 10;
      
      if (hasContent) {
        // Generate ASCII content
        const asciiContent = this.asciify(this.context, w, h);
        
        if (asciiContent) {
          this.pre.innerHTML = asciiContent;
          
          // Show immediately now that the character width issue is fixed
          if (!this.hasValidContent) {
            this.hasValidContent = true;
            this.domElement.style.opacity = '1';
          }
        }
      }
    } catch (error) {
      // Silently handle any drawing errors
      return;
    }
    
    if (this.hasValidContent) {
      this.hue();
    }
  }

  onMouseMove(e: MouseEvent) {
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };
  }

  get dx() {
    return this.mouse.x - this.center.x;
  }

  get dy() {
    return this.mouse.y - this.center.y;
  }

  hue() {
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number): string | null {
    if (!w || !h || w <= 0 || h <= 0) return null;
    
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      if (!imgData || !imgData.data) return null;
      
      const data = imgData.data;
      let str = '';
      
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (x + y * w) * 4;
          
          // Bounds check to prevent artifacts
          if (i + 3 >= data.length) {
            str += ' ';
            continue;
          }
          
          const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];

          if (a === 0) {
            str += ' ';
            continue;
          }

          let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));
          if (this.invert) idx = this.charset.length - idx - 1;
          str += this.charset[idx];
        }
        str += '\n';
      }
      return str;
    } catch (error) {
      // Silently handle any rendering errors to prevent artifacts
      console.warn('ASCII rendering error:', error);
      return null;
    }
  }

  dispose() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' } = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;

    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);

    const textWidth = Math.ceil(metrics.width) + 40;
    const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 40;

    // Ensure dimensions are even numbers to prevent half-pixel rendering
    this.canvas.width = Math.ceil(textWidth / 2) * 2;
    this.canvas.height = Math.ceil(textHeight / 2) * 2;
  }

  render() {
    // Clear with fully transparent background
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Enable better text rendering
    this.context.textBaseline = 'top';
    this.context.textAlign = 'left';
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = 'high';
    
    this.context.fillStyle = this.color;
    this.context.font = this.font;

    const metrics = this.context.measureText(this.txt);
    const yPos = 20 + metrics.actualBoundingBoxAscent;

    this.context.fillText(this.txt, 20, yPos);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get texture() {
    return this.canvas;
  }
}

class CanvAscii {
  textString: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  container: HTMLElement;
  width: number;
  height: number;
  enableWaves: boolean;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number };
  textCanvas: CanvasTxt;
  texture: THREE.CanvasTexture;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  filter: AsciiFilter;
  center: { x: number; y: number };
  animationFrameId?: number;

  constructor(
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves }: any,
    containerElem: HTMLElement,
    width: number,
    height: number
  ) {
    this.textString = text;
    this.asciiFontSize = asciiFontSize;
    this.textFontSize = textFontSize;
    this.textColor = textColor;
    this.planeBaseHeight = planeBaseHeight;
    this.container = containerElem;
    this.width = width;
    this.height = height;
    this.enableWaves = enableWaves;

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
    this.mouse = { x: 0, y: 0 };
    this.center = { x: width / 2, y: height / 2 };

    this.onMouseMove = this.onMouseMove.bind(this);

    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: 'IBM Plex Mono',
      color: this.textColor
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.needsUpdate = true;
    
    // Prevent texture wrapping issues that can cause seams
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.generateMipmaps = false;
    
    // Ensure texture is properly initialized
    this.texture.anisotropy = 1;

    const textAspect = this.textCanvas.width / this.textCanvas.height;
    const baseH = this.planeBaseHeight;
    const planeW = baseH * textAspect;
    const planeH = baseH;

    // Use a single quad (1x1 segments) - no geometry seams possible
    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        mouse: { value: 1.0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }
      }
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      preserveDrawingBuffer: false
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);
    
    // Clear the renderer completely
    this.renderer.clear(true, true, true);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: 'IBM Plex Mono',
      fontSize: this.asciiFontSize,
      invert: true
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);

    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('touchmove', this.onMouseMove);
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.filter.setSize(w, h);

    this.center = { x: w / 2, y: h / 2 };
  }

  load() {
    // Don't start animation automatically - let the parent control it
  }

  animate() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const e = 'touches' in evt ? evt.touches[0] : evt;
    const bounds = this.container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    this.mouse = { x, y };
  }

  render() {
    const time = new Date().getTime() * 0.001;

    this.textCanvas.render();
    this.texture.needsUpdate = true;

    // Start with a more gradual animation
    this.mesh.material.uniforms.uTime.value = Math.sin(time * 0.5);

    this.updateRotation();
    
    // Only render if everything is properly initialized
    if (this.renderer && this.scene && this.camera && this.filter) {
      this.filter.render(this.scene, this.camera);
    }
  }

  updateRotation() {
    const x = mapRange(this.mouse.y, 0, this.height, 0.5, -0.5);
    const y = mapRange(this.mouse.x, 0, this.width, -0.5, 0.5);

    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  clear() {
    this.scene.traverse(obj => {
      if ((obj as any).isMesh && typeof (obj as any).material === 'object' && (obj as any).material !== null) {
        Object.keys((obj as any).material).forEach(key => {
          const matProp = (obj as any).material[key];
          if (matProp !== null && typeof matProp === 'object' && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
        (obj as any).material.dispose();
        (obj as any).geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.filter.dispose();
    this.container.removeChild(this.filter.domElement);
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);
    this.clear();
    this.renderer.dispose();
  }
}

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
  onReady?: () => void;
}

export default function ASCIIText({
  text = 'David!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true,
  onReady
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);
  const [isReady, setIsReady] = useState(false);
  const readyCalledRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    const initializeAscii = (w: number, h: number) => {
      // Ensure container is ready and has proper dimensions
      if (!containerRef.current || w <= 0 || h <= 0) return;
      
      asciiRef.current = new CanvAscii(
        { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
        containerRef.current,
        w,
        h
      );
      
      // Pass the ready callback to the filter
      if (asciiRef.current.filter && onReady && !readyCalledRef.current) {
        asciiRef.current.filter.onReadyCallback = () => {
          if (!readyCalledRef.current) {
            readyCalledRef.current = true;
            onReady();
          }
        };
      }
      
      // The ASCII filter will handle its own visibility now
      asciiRef.current.load();
      asciiRef.current.animate();
      
      // Set ready immediately - the filter controls when it shows
      setIsReady(true);
    };

    if (width === 0 || height === 0) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {
            const { width: w, height: h } = entry.boundingClientRect;
            initializeAscii(w, h);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        if (asciiRef.current) {
          asciiRef.current.dispose();
        }
      };
    }

    initializeAscii(width, height);

    const ro = new ResizeObserver(entries => {
      if (!entries[0] || !asciiRef.current) return;
      const { width: w, height: h } = entries[0].contentRect;
      if (w > 0 && h > 0) {
        asciiRef.current.setSize(w, h);
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      if (asciiRef.current) {
        asciiRef.current.dispose();
      }
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return (
    <div
      ref={containerRef}
      className="ascii-text-container"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');

        .ascii-text-container canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          image-rendering: optimizeSpeed;
          image-rendering: -moz-crisp-edges;
          image-rendering: -o-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }

        .ascii-text-container pre {
          margin: 0;
          user-select: none;
          padding: 0;
          line-height: 1em;
          text-align: left;
          position: absolute;
          left: 0;
          top: 0;
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          z-index: 9;
          mix-blend-mode: difference;
        }
      `}</style>
    </div>
  );
}
