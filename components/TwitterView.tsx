"use client";
import { useState, useRef, useEffect } from "react";
import ClaudePopup from "./ClaudePopup";

export default function TwitterView() {
  const [value, setValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowPopup(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-200 text-sm font-semibold flex-shrink-0">XY</div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">XYZ Corp</span>
            <span className="text-gray-400 dark:text-zinc-500 text-xs">@xyzcorp · 2h</span>
          </div>
          <p className="text-sm text-gray-800 dark:text-zinc-200 leading-relaxed mt-0.5">
            Just shipped our biggest product update ever. Three months of work, zero sleep, and one very patient team. Proud doesn&apos;t even cover it. 🚀
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-6 px-1 py-2 border-t border-b border-gray-100 dark:border-zinc-800 mb-3 text-gray-400 dark:text-zinc-500 text-xs">
        <span>💬 47</span><span>🔁 124</span><span>❤️ 891</span>
      </div>

      {/* Reply box */}
      <div className="flex gap-2.5 items-start">
        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-800 dark:text-teal-200 text-xs font-semibold flex-shrink-0 mt-1">XZ</div>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={e => e.key === "Escape" && setShowPopup(false)}
            placeholder="Type your reply… (type / for Claude suggestions)"
            rows={2}
            className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:border-sky-400 dark:focus:border-sky-500 focus:bg-white dark:focus:bg-zinc-900 resize-none transition-colors"
          />
          {showPopup && (
            <ClaudePopup platform="tweet" onUse={handleUse} onClose={() => setShowPopup(false)} />
          )}
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-full mt-1 transition-colors whitespace-nowrap">
          Reply
        </button>
      </div>

      {/* Hint */}
      <div className="flex items-center gap-2 mt-3 ml-11">
        <kbd className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono text-gray-600 dark:text-zinc-400">/</kbd>
        <span className="text-xs text-gray-400 dark:text-zinc-500">Type / in the reply box to get Claude suggestions</span>
      </div>
    </div>
  );
}
