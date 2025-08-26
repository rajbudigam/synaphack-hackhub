"use client";
import { useState } from "react";

export type Parsed = { title?: string; date?: string; time?: string; location?: string; max?: number };

const parse = (t: string): Parsed => {
  const title = (
    t.match(/(?:event|title)\s*["“”']?([^"”']+)["“”']?/i)?.[1] ??
    t.match(/^([\w\s\-]{3,})/i)?.[1]
  )?.trim();
  const date = t.match(/\b(\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?)\b/i)?.[1];
  const time = t.match(/\b(\d{1,2}(:\d{2})?\s?(am|pm))\b/i)?.[1];
  const location = t.match(/\b(at|in)\s+([\w\s\-\.,#]+)$/i)?.[2]?.trim();
  const max = Number(t.match(/\b(max|limit)\s*(\d{1,4})\b/i)?.[2]);
  return { title, date, time, location, max: isNaN(max) ? undefined : max };
};

export default function NLForm({ onSubmit }: { onSubmit: (p: Parsed) => void }) {
  const [text, setText] = useState("");
  const p = parse(text);

  return (
    <div className="space-y-3">
      <label className="text-sm text-zinc-500">Describe your event in one sentence</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`ex: Hack Night on 09/05 6pm at Lab 2, max 50, title "Night Shift"`}
        className="w-full min-h-28 rounded-2xl border border-zinc-200 bg-white/60 p-4 leading-6 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex flex-wrap gap-2">
        {Object.entries(p)
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <span
              key={k}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs"
            >
              <b className="capitalize">{k}</b>
              <span className="text-zinc-600">{String(v)}</span>
            </span>
          ))}
      </div>
      <button
        onClick={() => onSubmit(p)}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:brightness-110 active:scale-[0.99]"
      >
        Create
      </button>
    </div>
  );
}
