"use client";

import { useState } from "react";
import { ExternalLink, Lock } from "lucide-react";

type DownloadButtonProps = {
  fileId: string;
};

export function DownloadButton({ fileId }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/public/download/${fileId}`, { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.fileUrl) {
        setError(data.error || "资源暂时无法打开");
        return;
      }

      setPassword(data.password || "");
      window.open(data.fileUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError("资源暂时无法打开");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ExternalLink className="h-4 w-4" />
        {loading ? "打开中..." : "前往下载"}
      </button>
      {password && (
        <p className="flex items-center gap-1 text-sm font-semibold text-amber-600">
          <Lock className="h-3 w-3" />
          提取码：{password}
        </p>
      )}
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}
