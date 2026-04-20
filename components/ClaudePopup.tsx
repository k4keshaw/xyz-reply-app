"use client";
import { useState } from "react";

interface Reply { label: string; text: string; }
interface Props {
  platform: "tweet" | "linkedin";
  onUse: (text: string) => void;
  onClose: () => void;
}

export default function ClaudePopup({ platform, onUse, onClose }: Props) {
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [error, setError] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(false);
    setReplies([]);
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, instruction }),
      });
      const data = await res.json();
      if (data.replies) setReplies(data.replies);
      else setError(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="absolute top-full left-0 mt-2 w-[360px] z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f0f13]"
      style={{ animation: "popIn 0.15s cubic-bezier(0.22,1,0.36,1)" }}
    >
      <style>{`@keyframes popIn{from{opacity:0;transform:translateY(-6px) scale(0.97)}to{opacity:1;transform:none}}`}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <span className="text-violet-400 text-[12.5px] font-semibold tracking-wide">✦ Claude suggestions</span>
          <span className="text-[9px] bg-violet-500/20 text-violet-300 border border-violet-500/25 px-1.5 py-0.5 rounded-full font-medium tracking-wide uppercase">Demo</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-1 transition-colors">✕</button>
      </div>

      {/* Instruction row */}
      <div className="flex gap-2 px-3 py-2.5 border-b border-white/[0.06]">
        <input
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") generate(); e.stopPropagation(); }}
          placeholder="Instructions… e.g. make it funny, keep it short"
          className="flex-1 bg-white/[0.07] border border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-[#e8e8f0] placeholder-white/25 outline-none focus:border-violet-400/50 transition-colors"
        />
        <button
          onClick={generate}
          disabled={loading}
          className="bg-gradient-to-br from-violet-700 to-violet-400 text-white text-[12px] font-semibold rounded-lg px-3 py-1.5 disabled:opacity-50 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {loading ? "..." : "Generate"}
        </button>
      </div>

      {/* Body */}
      <div className="px-2.5 py-2 flex flex-col gap-1.5 max-h-80 overflow-y-auto">
        {loading && (
          <div className="flex justify-center gap-1.5 py-5">
            {[0, 150, 300].map(d => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-red-400 text-[12px] text-center py-4">Something went wrong. Please try again.</p>
        )}

        {!loading && !error && replies.length === 0 && (
          <div className="text-center py-5">
            <p className="text-white/30 text-[12px] mb-1">Click Generate to get suggestions</p>
            <p className="text-white/20 text-[11px]">Try: "make it funny" or "keep it short"</p>
          </div>
        )}

        {!loading && replies.map((r, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-2.5 hover:bg-violet-400/[0.08] hover:border-violet-400/20 transition-colors">
            <span className="text-[9.5px] font-bold tracking-widest uppercase text-violet-400 block mb-1">{r.label}</span>
            <p className="text-[12px] text-[#d4d4e0] leading-relaxed mb-2">{r.text}</p>
            <button
              onClick={() => onUse(r.text)}
              className="text-violet-400 border border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/25 text-[11px] font-semibold px-2.5 py-0.5 rounded-md transition-colors"
            >
              Use this ↗
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] text-white/20 py-1.5 border-t border-white/[0.05]">
        Press Esc to close · Demo mode — no API key needed
      </div>
    </div>
  );
}
