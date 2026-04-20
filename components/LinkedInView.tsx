"use client";
import { useState, useRef, useEffect } from "react";
import ClaudePopup from "./ClaudePopup";

export default function LinkedInView() {
  const [value, setValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowPopup(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val.endsWith("/")) setShowPopup(true);
  };

  const handleUse = (text: string) => {
    setValue(text);
    setShowPopup(false);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4">
      {/* Post */}
      <div className="flex gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center text-pink-800 dark:text-pink-200 text-sm font-semibold flex-shrink-0">XY</div>
        <div>
          <div className="font-semibold text-sm text-gray-900 dark:text-white">XYZ</div>
          <div className="text-xs text-gray-400 dark:text-zinc-500">Product Lead at XYZ Corp · 1st</div>
          <div className="text-xs text-gray-400 dark:text-zinc-500">4h · 🌐</div>
        </div>
      </div>

      <p className="text-sm text-gray-800 dark:text-zinc-200 leading-relaxed mb-3">
        Excited to share that XYZ Corp just crossed 1M users! This journey has been full of learnings — most importantly that listening to your users beats every internal assumption. What&apos;s the best piece of product feedback you&apos;ve ever received?
      </p>

      {/* Actions */}
      <div className="flex gap-1 py-2 border-t border-b border-gray-100 dark:border-zinc-800 mb-3">
        {["👍 Like", "💬 Comment", "🔁 Repost", "✈️ Send"].map(a => (
          <button key={a} className="text-xs text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded transition-colors">{a}</button>
        ))}
      </div>

      {/* Comment box */}
      <div className="flex gap-2.5 items-center">
        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-800 dark:text-teal-200 text-xs font-semibold flex-shrink-0">XZ</div>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={e => e.key === "Escape" && setShowPopup(false)}
            placeholder="Add a comment… (type / for Claude)"
            className="w-full border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm text-gray-800 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-colors"
          />
          {showPopup && (
            <ClaudePopup platform="linkedin" onUse={handleUse} onClose={() => setShowPopup(false)} />
          )}
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center gap-2 mt-3 ml-11">
        <kbd className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono text-gray-600 dark:text-zinc-400">/</kbd>
        <span className="text-xs text-gray-400 dark:text-zinc-500">Type / in the comment box to get Claude suggestions</span>
      </div>
    </div>
  );
}
