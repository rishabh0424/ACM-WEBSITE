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

    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) =>
        new Promise<void>((res, rej) => {
          if ((window as any)[globalName]) return res();

          const s = document.createElement("script");
          s.src = src;
          s.onload = () => res();
          s.onerror = () => rej();
          document.head.appendChild(s);
        });

      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", "gsap");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "THREE");

      initApplication();
    };

    const initApplication = async () => {

      let currentSlideIndex = 0;
      let isTransitioning = false;
      let shaderMaterial: any, renderer: any, scene: any, camera: any;
      let slideTextures: any[] = [];
      let autoSlideTimer: any = null;

      const slides = [
        { title: "Our Journey", description: "Discover the story of our ACM chapter.", media: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" },
        { title: "Past Events", description: "Explore the workshops & seminars.", media: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" },
        { title: "Hackathons", description: "Join competitive coding events.", media: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800" }
      ];

      const splitText = (text: string) =>
        text.split("").map(c => `<span>${c === " " ? "&nbsp;" : c}</span>`).join("");

      const updateContent = (idx: number) => {
        const t = document.getElementById("mainTitle");
        const d = document.getElementById("mainDesc");

        if (t && d) {
          t.innerHTML = splitText(slides[idx].title);
          d.textContent = slides[idx].description;
        }
      };

      const updateNavigationState = (idx: number) =>
        document.querySelectorAll(".slide-nav-item")
          .forEach((el, i) => el.classList.toggle("active", i === idx));

      const navigateToSlide = (targetIndex: number) => {
        if (isTransitioning || targetIndex === currentSlideIndex) return;

        currentSlideIndex = targetIndex;
        updateContent(targetIndex);
        updateNavigationState(targetIndex);
      };

      const createSlidesNavigation = () => {
        const nav = document.getElementById("slidesNav");
        if (!nav) return;

        nav.innerHTML = "";

        slides.forEach((slide, i) => {
          const item = document.createElement("div");
          item.className = `slide-nav-item ${i === 0 ? "active" : ""}`;
          item.innerText = slide.title;

          item.onclick = () => navigateToSlide(i);
          nav.appendChild(item);
        });
      };

      const loadImageTexture = (src: string) =>
        new Promise<any>((resolve) => {
          const loader = new THREE.TextureLoader();
          loader.load(src, (texture: any) => resolve(texture));
        });

      const initRenderer = async () => {
        const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement;
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        shaderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

        for (const s of slides) {
          const texture = await loadImageTexture(s.media);
          slideTextures.push(texture);
        }

        createSlidesNavigation();
        updateContent(0);

        const render = () => {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
        };

        render();
      };

      initRenderer();
    };

    loadScripts();

  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <main className="slider-wrapper" ref={containerRef}>
        <canvas className="webgl-canvas"></canvas>

        <div className="slide-content">
          <h1 id="mainTitle"></h1>
          <p id="mainDesc"></p>
        </div>

        <nav id="slidesNav"></nav>
      </main>
    </motion.div>
  );
}
