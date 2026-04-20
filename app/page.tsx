"use client";
import { useState } from "react";
import TwitterView from "@/components/TwitterView";
import LinkedInView from "@/components/LinkedInView";

export default function Home() {
  const [tab, setTab] = useState<"twitter" | "linkedin">("twitter");
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">✦</div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Claude Reply Suggester</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Type <kbd className="bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">/</kbd> in any comment box to get AI reply suggestions
          </p>
        </div>
        <div className="flex gap-2 mb-6">
          {(["twitter", "linkedin"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${tab === t
                ? "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-600 font-medium text-gray-900 dark:text-white shadow-sm"
                : "border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900"}`}>
              {t === "twitter" ? "Twitter / X" : "LinkedIn"}
            </button>
          ))}
        </div>
        {tab === "twitter" ? <TwitterView /> : <LinkedInView />}
        <p className="text-center text-xs text-gray-400 dark:text-zinc-600 mt-8">
          Prototype by XYZ Corp · Powered by Claude AI
        </p>
      </div>
    </main>
  );
}
