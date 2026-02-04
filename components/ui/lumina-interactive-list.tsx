import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

declare const gsap: any;
declare const THREE: any;

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  useEffect(() => {
    // --- DYNAMIC SCRIPT LOADING ---
    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
        if ((window as any)[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if ((window as any)[globalName]) { clearInterval(check); res(); }
          }, 50);
          setTimeout(() => { clearInterval(check); rej(new Error(`Timeout waiting for ${globalName}`)); }, 10000);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Failed to load base scripts:', e);
      }
      
      initApplication();
    };

    const initApplication = async () => {
        // --- MAIN LOGIC ---
        const SLIDER_CONFIG: any = {
            settings: {
                transitionDuration: 2.5, autoSlideSpeed: 5000, currentEffect: "glass", currentEffectPreset: "Default",
                globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
                glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
                frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
                rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
                plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
                timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4
            }
        };

        // --- GLOBAL STATE ---
        let currentSlideIndex = 0;
        let isTransitioning = false;
        let shaderMaterial: any, renderer: any, scene: any, camera: any;
        let slideTextures: any[] = [];
        let texturesLoaded = false;
        let autoSlideTimer: any = null;
        let progressAnimation: any = null;
        let sliderEnabled = false;

        const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
        const PROGRESS_UPDATE_INTERVAL = 50;
        const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

        const slides = [
            { title: "Our Journey", description: "Discover the story of our ACM chapter and the milestones we've achieved together.", media: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" },
            { title: "Past Events", description: "Explore the workshops, seminars, and conferences that shaped our community.", media: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
            { title: "Hackathons", description: "Join our competitive coding events and build innovative solutions with fellow developers.", media: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop" },
            { title: "Become a Member", description: "Take the next step and join our thriving community of tech enthusiasts and innovators.", media: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
            { title: "What We're Building", description: "See the cutting-edge projects and initiatives driving our chapter forward.", media: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" }
        ];

        // --- FUNCTIONS ---
        const startAutoSlide = () => {
            if (autoSlideTimer) clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(() => {
                if (!isTransitioning && sliderEnabled) {
                    const nextIndex = (currentSlideIndex + 1) % slides.length;
                    navigateToSlide(nextIndex);
                }
            }, SLIDE_DURATION());
        };

        const stopAutoSlide = () => {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        };

        // --- SHADERS ---
        const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform int uEffectType;
            uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
            uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            
            vec4 glassEffect(vec2 uv, float progress) {
                float time = progress * 5.0 * uSpeedMultiplier;
                vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
                float maxR = length(uResolution) * 0.85; float br = progress * maxR;
                vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
                float d = length(p - c); float nd = d / max(br, 0.001);
                float param = smoothstep(br + 3.0, br - 3.0, d);
                vec4 img;
                if (param > 0.0) {
                     float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                     vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                     vec2 distUV = uv2 - dir * ro;
                     distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                     float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                     img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                     if (uGlassEdgeGlow > 0.0) {
                        float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                        img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                     }
                } else { img = texture2D(uTexture2, uv2); }
                vec4 oldImg = texture2D(uTexture1, uv1);
                if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
                return mix(oldImg, img, param);
            }

            void main() {
                gl_FragColor = glassEffect(vUv, uProgress);
            }
        `;

        // --- CORE FUNCTIONS ---
        const updateShaderUniforms = () => {
             if (!shaderMaterial) return;
             const s = SLIDER_CONFIG.settings, u = shaderMaterial.uniforms;
             for (const key in s) {
                 const uName = 'u' + key.charAt(0).toUpperCase() + key.slice(1);
                 if (u[uName]) u[uName].value = s[key];
             }
        };

        const splitText = (text: string) => {
            return text.split('').map(char => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        };

        const updateContent = (idx: number) => {
            const titleEl = document.getElementById('mainTitle');
            const descEl = document.getElementById('mainDesc');
            if (titleEl && descEl) {
                 gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
                 gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
                 
                 setTimeout(() => {
                     titleEl.innerHTML = splitText(slides[idx].title);
                     descEl.textContent = slides[idx].description; 
                     
                     gsap.set(titleEl.children, { opacity: 0, y: 20 });
                     gsap.set(descEl, { y: 20, opacity: 0 });
                     gsap.to(titleEl.children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                     gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                 }, 500); 
            }
        };

        const navigateToSlide = (targetIndex: number) => {
            if (isTransitioning || targetIndex === currentSlideIndex || !slideTextures[targetIndex]) return;
            
            const currentTexture = slideTextures[currentSlideIndex];
            const targetTexture = slideTextures[targetIndex];
            if (!currentTexture || !targetTexture || !shaderMaterial) return;

            isTransitioning = true;
            
            // Update shader uniforms immediately
            shaderMaterial.uniforms.uTexture1.value = currentTexture;
            shaderMaterial.uniforms.uTexture2.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
            shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
            
            // Update content and navigation state
            updateContent(targetIndex);
            currentSlideIndex = targetIndex;
            updateNavigationState(currentSlideIndex);
            
            // Animate the transition
            gsap.fromTo(shaderMaterial.uniforms.uProgress, 
                { value: 0 },
                {
                    value: 1,
                    duration: TRANSITION_DURATION(),
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Reset progress and update base texture
                        shaderMaterial.uniforms.uProgress.value = 0;
                        shaderMaterial.uniforms.uTexture1.value = targetTexture;
                        shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                        isTransitioning = false;
                    }
                }
            );
        };

        const createSlidesNavigation = () => {
            const nav = document.getElementById("slidesNav"); 
            if (!nav) {
                console.warn('Navigation element not found');
                return;
            }
            
            nav.innerHTML = "";
            slides.forEach((slide, i) => {
                const item = document.createElement("div");
                item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                item.innerHTML = `<div class="slide-nav-title">${slide.title}</div>`;
                item.style.pointerEvents = 'auto';
                item.style.cursor = 'pointer';
                
                const handleClick = (e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Navigating to slide ${i}: ${slide.title}`);
                    
                    if (!isTransitioning && i !== currentSlideIndex && slideTextures[i] && shaderMaterial) {
                        stopAutoSlide();
                        navigateToSlide(i);
                        setTimeout(() => {
                            if (sliderEnabled) startAutoSlide();
                        }, 1000);
                    } else {
                        console.log('Navigation blocked:', { isTransitioning, currentSlideIndex, targetIndex: i, hasTexture: !!slideTextures[i], hasShader: !!shaderMaterial });
                    }
                };
                
                item.addEventListener("click", handleClick);
                item.addEventListener("touchend", handleClick);
                nav.appendChild(item);
            });
            
            console.log('Navigation created with', slides.length, 'items');
        };

        const updateNavigationState = (idx: number) => document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));

        const createSlidesNavigation = () => {
            const nav = document.getElementById("slidesNav"); 
            if (!nav) return;
            
            nav.innerHTML = "";
            slides.forEach((slide, i) => {
                const item = document.createElement("div");
                item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                item.innerHTML = `<div class="slide-nav-title">${slide.title}</div>`;
                
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isTransitioning && i !== currentSlideIndex && slideTextures[i]) {
                        stopAutoSlide();
                        navigateToSlide(i);
                        setTimeout(() => startAutoSlide(), 1000);
                    }
                });
                nav.appendChild(item);
            });
        };

        const updateNavigationState = (idx: number) => document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));

        const loadImageTexture = (src: string) => new Promise<any>((resolve, reject) => {
             const l = new THREE.TextureLoader();
             l.load(src, (t: any) => { t.minFilter = t.magFilter = THREE.LinearFilter; t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) }; resolve(t); }, undefined, reject);
        });

        const initRenderer = async () => {
            const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement; 
            if (!canvas) return;
            
            scene = new THREE.Scene(); 
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight); 
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTexture1Size: { value: new THREE.Vector2(1, 1) }, uTexture2Size: { value: new THREE.Vector2(1, 1) },
                    uEffectType: { value: 0 },
                    uGlobalIntensity: { value: 1.0 }, uSpeedMultiplier: { value: 1.0 }, uDistortionStrength: { value: 1.0 }, uColorEnhancement: { value: 1.0 },
                    uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 }
                },
                vertexShader, fragmentShader
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));
            
            for (const s of slides) { 
                try { 
                    const texture = await loadImageTexture(s.media);
                    slideTextures.push(texture);
                } catch (error) { 
                    console.warn(`Failed to load texture:`, error); 
                } 
            }
            
            if (slideTextures.length >= 2) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                texturesLoaded = true; 
                sliderEnabled = true;
                updateShaderUniforms();
                document.querySelector(".slider-wrapper")?.classList.add("loaded");
                
                createSlidesNavigation();
                setTimeout(() => startAutoSlide(), 2000);
            }
            
            const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
            render();
        };
        
        const tEl = document.getElementById('mainTitle');
        const dEl = document.getElementById('mainDesc');
        if (tEl && dEl) {
            tEl.innerHTML = splitText(slides[0].title);
            dEl.textContent = slides[0].description;
            gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
            gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
        }

        initRenderer();
    };

    loadScripts();
  }, []);
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <main className="slider-wrapper" ref={containerRef}>
        <canvas className="webgl-canvas"></canvas>
        
        <div className="slide-content">
            <h1 className="slide-title" id="mainTitle"></h1>
            <p className="slide-description" id="mainDesc"></p>
        </div>
       
        <nav className="slides-navigation" id="slidesNav"></nav>
      </main>
    </motion.div>
  );
}