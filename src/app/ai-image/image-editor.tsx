"use client";

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Circle, Eraser, ImagePlus, Pencil, RotateCcw, Type, X } from "lucide-react";

type Tool = "pen" | "circle" | "text";

type Props = {
  onChange: (image: string | null) => void;
};

export function ImageEditor({ onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const startRef = useRef({ x: 0, y: 0 });
  const [tool, setTool] = useState<Tool>("pen");
  const [drawing, setDrawing] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [color, setColor] = useState("#22d3ee");

  function publish() {
    onChange(canvasRef.current?.toDataURL("image/jpeg", 0.88) ?? null);
  }

  function drawBase(image: HTMLImageElement) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const max = 1400;
    const scale = Math.min(1, max / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
    publish();
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
      setHasImage(true);
      drawBase(image);
      URL.revokeObjectURL(image.src);
    };
    image.src = URL.createObjectURL(file);
    event.target.value = "";
  }

  function point(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function begin(event: MouseEvent<HTMLCanvasElement>) {
    if (!hasImage) return;
    const canvas = event.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = point(event);
    startRef.current = p;
    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === "text") {
      const text = window.prompt("输入要标注的文字");
      if (text) {
        ctx.fillStyle = color;
        ctx.font = `bold ${Math.max(24, canvas.width / 30)}px sans-serif`;
        ctx.fillText(text, p.x, p.y);
        publish();
      }
      return;
    }

    setDrawing(true);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(event: MouseEvent<HTMLCanvasElement>) {
    if (!drawing) return;
    const canvas = event.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = point(event);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(5, canvas.width / 180);
    ctx.lineCap = "round";

    if (tool === "pen") {
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
      const start = startRef.current;
      ctx.beginPath();
      ctx.ellipse(
        (start.x + p.x) / 2,
        (start.y + p.y) / 2,
        Math.abs(p.x - start.x) / 2,
        Math.abs(p.y - start.y) / 2,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }
  }

  function end() {
    if (!drawing) return;
    setDrawing(false);
    publish();
  }

  function reset() {
    if (imageRef.current) drawBase(imageRef.current);
  }

  function remove() {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    imageRef.current = null;
    setHasImage(false);
    onChange(null);
  }

  useEffect(() => () => onChange(null), [onChange]);

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/20">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 p-2">
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-cyan-300 px-2.5 py-2 text-xs font-black text-slate-950">
          <ImagePlus className="h-3.5 w-3.5" /> 上传图片
          <input type="file" accept="image/*" onChange={upload} className="hidden" />
        </label>
        {hasImage && (
          <>
            {([
              ["pen", Pencil, "涂抹"],
              ["circle", Circle, "画圈"],
              ["text", Type, "文字"],
            ] as const).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                title={label}
                onClick={() => setTool(id)}
                className={`grid h-8 w-8 place-items-center rounded-lg ${tool === id ? "bg-white text-slate-950" : "text-white/60 hover:bg-white/10"}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <input aria-label="标注颜色" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded bg-transparent" />
            <button type="button" title="清除标注" onClick={reset} className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button type="button" title="移除图片" onClick={remove} className="grid h-8 w-8 place-items-center rounded-lg text-red-300 hover:bg-red-400/10">
              <X className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {hasImage ? (
        <canvas
          ref={canvasRef}
          onMouseDown={begin}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          className="max-h-72 w-full cursor-crosshair object-contain"
        />
      ) : (
        <label className="grid min-h-28 cursor-pointer place-items-center text-xs font-bold text-white/35">
          <span className="flex items-center gap-2"><Eraser className="h-4 w-4" />上传图片后可涂抹、画圈或添加文字</span>
          <input type="file" accept="image/*" onChange={upload} className="hidden" />
        </label>
      )}
    </div>
  );
}
