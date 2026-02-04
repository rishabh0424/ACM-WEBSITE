import React, { useEffect, useRef, useState } from 'react';

class Text {
  size: number;
  copy: string;
  color: string;
  delay: number;
  basedelay: number;
  bound: any;
  x: number;
  y: number;
  data: ImageData;
  index: number;

  constructor(options: any = {}, canvasWidth: number, canvasHeight: number) {
    const pool = document.createElement('canvas');
    const buffer = pool.getContext('2d')!;

    pool.width = canvasWidth;
    pool.height = canvasHeight;

    buffer.fillStyle = '#000000';
    buffer.fillRect(0, 0, pool.width, pool.height);

    this.size = options.size || 120;
    this.copy = (options.copy || `ACM`) + ' ';
    this.color = options.color || '#0ea5e9';
    this.delay = options.delay || 1;
    this.basedelay = this.delay;

    buffer.font = `bold ${this.size}px Arial`;
    this.bound = buffer.measureText(this.copy);
    this.bound.height = this.size * 1.5;

    this.x = canvasWidth * 0.5 - this.bound.width * 0.5;
    this.y = canvasHeight * 0.5 - this.bound.height * 0.5;

    buffer.strokeStyle = this.color;
    buffer.lineWidth = 3;
    buffer.strokeText(this.copy, 0, this.bound.height * 0.8);

    this.data = buffer.getImageData(0, 0, this.bound.width, this.bound.height);
    this.index = 0;
  }

  update(thunder: any[], particles: any[]) {
    if (this.index >= this.bound.width) return;

    const data = this.data.data;

    for (let i = this.index * 4; i < data.length; i += 4 * this.data.width) {
      const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];

      if (bitmap > 255 && Math.random() > 0.94) {
        const x = this.x + this.index;
        const y = this.y + i / this.bound.width / 4;

        thunder.push(new Thunder({ x, y }));

        if (Math.random() > 0.3) {
          particles.push(new Particles({ x, y }));
        }
      }
    }

    if (this.delay-- < 0) {
      this.index += 1;
      this.delay += this.basedelay;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
  }
}

class Thunder {
  lifespan: number;
  maxlife: number;
  color: string;
  glow: string;
  x: number;
  y: number;
  width: number;
  direct: number;
  max: number;
  segments: any[];

  constructor(options: any = {}) {
    this.lifespan = options.lifespan || Math.round(Math.random() * 10 + 10);
    this.maxlife = this.lifespan;
    this.color = options.color || '#fefefe';
    this.glow = options.glow || '#0ea5e9';
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 2;
    this.direct = options.direct || Math.random() * Math.PI * 2;
    this.max = options.max || Math.round(Math.random() * 10 + 20);

    this.segments = [...new Array(this.max)].map(() => ({
      direct: this.direct + (Math.PI * Math.random() * 0.2 - 0.1),
      length: Math.random() * 20 + 80,
      change: Math.random() * 0.04 - 0.02
    }));
  }

  update(index: number, array: any[]) {
    this.segments.forEach(s => {
      s.direct += s.change;
      if (Math.random() > 0.96) s.change *= -1;
    });

    if (this.lifespan > 0) this.lifespan--;
    else this.remove(index, array);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.lifespan <= 0) return;

    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.shadowBlur = 32;
    ctx.shadowColor = this.glow;

    ctx.moveTo(this.x, this.y);

    let prev = { x: this.x, y: this.y };

    this.segments.forEach(s => {
      const x = prev.x + Math.cos(s.direct) * s.length;
      const y = prev.y + Math.sin(s.direct) * s.length;
      prev = { x, y };
      ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;
  }

  remove(index: number, array: any[]) {
    array.splice(index, 1);
  }
}

class Spark {
  x: number;
  y: number;
  prev: { x: number; y: number };
  lifespan: number;
  maxlife: number;
  color: string;
  width: number;
  v: any;
  a: any;
  g: any;

  constructor(options: any = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;

    this.v = {
      direct: Math.random() * Math.PI * 2,
      weight: Math.random() * 14 + 2,
      friction: 0.88
    };

    this.a = {
      change: Math.random() * 0.4 - 0.2,
      min: this.v.direct - Math.PI * 0.4,
      max: this.v.direct + Math.PI * 0.4
    };

    this.g = {
      direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2),
      weight: Math.random() * 0.25 + 0.25
    };

    this.width = Math.random() * 3;
    this.lifespan = Math.round(Math.random() * 20 + 40);
    this.maxlife = this.lifespan;
    this.color = '#0ea5e9';

    this.prev = { x: this.x, y: this.y };
  }

  update(index: number, array: any[]) {
    this.prev = { x: this.x, y: this.y };

    this.x += Math.cos(this.v.direct) * this.v.weight;
    this.y += Math.sin(this.v.direct) * this.v.weight;

    if (this.v.weight > 0.2) this.v.weight *= this.v.friction;

    if (this.lifespan > 0) this.lifespan--;
    else this.remove(index, array);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.lifespan <= 0) return;

    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.prev.x, this.prev.y);
    ctx.stroke();
    ctx.closePath();
  }

  remove(index: number, array: any[]) {
    array.splice(index, 1);
  }
}

class Particles {
  sparks: Spark[];

  constructor(options: any = {}) {
    const max = options.max || Math.round(Math.random() * 10 + 10);
    this.sparks = [...new Array(max)].map(() => new Spark(options));
  }

  update() {
    this.sparks.forEach((s, i) => s.update(i, this.sparks));
  }

  render(ctx: CanvasRenderingContext2D) {
    this.sparks.forEach(s => s.render(ctx));
  }
}

const LightningText = ({ onSkip }: { onSkip?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const thunderRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const textRef = useRef<any>(null);

  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    textRef.current = new Text({ copy: 'ACM' }, w, h);

    const loop = () => {
      textRef.current.update(thunderRef.current, particlesRef.current);

      thunderRef.current.forEach((l, i) => l.update(i, thunderRef.current));
      particlesRef.current.forEach(p => p.update());

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      textRef.current.render(ctx);
      thunderRef.current.forEach(l => l.render(ctx));
      particlesRef.current.forEach(p => p.render(ctx));

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(skipTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen bg-black overflow-hidden z-50">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {showSkip && onSkip && (
        <button
          onClick={onSkip}
          className="absolute bottom-8 right-8 px-5 py-2.5 bg-white text-black rounded-full"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export default LightningText;
