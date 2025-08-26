// lib/plagiarism.ts
// Robust text + code normalization and three real similarity metrics.

export type Metrics = {
  cosine: number;      // 0..1 higher == more similar
  hamming: number;     // 0..64 lower  == more similar (SimHash bits)
  jaccard: number;     // 0..1 higher == more similar (k-gram set)
  overlapPercent: number; // naive overlap %
  snippetA: string;
  snippetB: string;
};

/** strip comments and normalize whitespace for common languages */
export function normalize(input: string) {
  const s = (input || "")
    // remove common line comments
    .replace(/\/\/.*$/gm, "")
    .replace(/#.*$/gm, "")
    // remove block comments
    .replace(/\/\*[\s\S]*?\*\//gm, "")
    .replace(/("""|''')[\s\S]*?\1/gm, "")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return s;
}

function tokenize(input: string) {
  return input.split(/[^\p{L}\p{N}_]+/u).filter(Boolean);
}

/** TF-IDF cosine similarity for two documents (tiny local corpus of two) */
function cosineSimilarity(aTokens: string[], bTokens: string[]) {
  const tf = (tokens: string[]) => {
    const m = new Map<string, number>();
    for (const t of tokens) m.set(t, (m.get(t) ?? 0) + 1);
    return m;
  };
  const A = tf(aTokens), B = tf(bTokens);
  const vocab = new Set([...A.keys(), ...B.keys()]);
  let dot = 0, a2 = 0, b2 = 0;
  for (const t of vocab) {
    const av = A.get(t) ?? 0;
    const bv = B.get(t) ?? 0;
    dot += av * bv;
    a2 += av * av;
    b2 += bv * bv;
  }
  if (!a2 || !b2) return 0;
  return dot / (Math.sqrt(a2) * Math.sqrt(b2));
}

/** SimHash (64-bit) over k-gram shingles */
function simhash(text: string, k = 5): bigint {
  const grams: string[] = [];
  for (let i = 0; i <= text.length - k; i++) grams.push(text.slice(i, i + k));
  const vec = new Array<number>(64).fill(0);
  for (const g of grams) {
    const h = murmur64n(g);
    for (let bit = 0; bit < 64; bit++) {
      const isSet = (h >> BigInt(bit)) & 1n;
      vec[bit] += isSet ? 1 : -1;
    }
  }
  let out = 0n;
  for (let bit = 0; bit < 64; bit++) if (vec[bit] > 0) out |= (1n << BigInt(bit));
  return out;
}

/** MurmurHash3-ish 64-bit (simple variant) */
function murmur64n(str: string): bigint {
  let h1 = 0x9368e53c2f6af274n;
  let h2 = 0x586dcd208f7cd3fdn;
  const c1 = 0x87c37b91114253d5n, c2 = 0x4cf5ad432745937fn;
  const bytes = Buffer.from(str, 'utf8');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let i = 0; i + 8 <= bytes.length; i += 8) {
    let k1 = view.getBigUint64(i, true);
    k1 *= c1; k1 = rotl64(k1, 31n); k1 *= c2; h1 ^= k1;
    h1 = rotl64(h1, 27n); h1 += h2; h1 = h1 * 5n + 0x52dce729n;
    if (i + 16 <= bytes.length) {
      let k2 = view.getBigUint64(i + 8, true);
      k2 *= c2; k2 = rotl64(k2, 33n); k2 *= c1; h2 ^= k2;
      h2 = rotl64(h2, 31n); h2 += h1; h2 = h2 * 5n + 0x38495ab5n;
    }
  }
  // finalize
  h1 ^= BigInt(bytes.length); h2 ^= BigInt(bytes.length);
  h1 += h2; h2 += h1;
  h1 = fmix64(h1); h2 = fmix64(h2);
  h1 += h2; h2 += h1;
  return h1 ^ h2;
}
const rotl64 = (x: bigint, r: bigint) => ((x << r) | (x >> (64n - r))) & ((1n << 64n) - 1n);
function fmix64(k: bigint) {
  k ^= k >> 33n;
  k *= 0xff51afd7ed558ccdn;
  k ^= k >> 33n;
  k *= 0xc4ceb9fe1a85ec53n;
  k ^= k >> 33n;
  return k & ((1n << 64n) - 1n);
}
function hamming(a: bigint, b: bigint) {
  let x = a ^ b, c = 0;
  while (x) { c += Number(x & 1n); x >>= 1n; }
  return c;
}

/** k-gram fingerprinting + Jaccard */
function jaccard(textA: string, textB: string, k = 5) {
  const setA = new Set<string>(), setB = new Set<string>();
  for (let i = 0; i <= textA.length - k; i++) setA.add(textA.slice(i, i + k));
  for (let i = 0; i <= textB.length - k; i++) setB.add(textB.slice(i, i + k));
  const inter = [...setA].filter(s => setB.has(s)).length;
  const uni = setA.size + setB.size - inter;
  return uni ? inter / uni : 0;
}

/** compute metrics and representative overlapping snippet */
export function computeMetrics(aRaw: string, bRaw: string): Metrics {
  const A = normalize(aRaw), B = normalize(bRaw);
  const aTok = tokenize(A), bTok = tokenize(B);
  const cosine = cosineSimilarity(aTok, bTok);
  const h = hamming(simhash(A), simhash(B));
  const jac = jaccard(A, B);
  const overlapPercent = (() => {
    const min = Math.min(A.length, B.length);
    if (!min) return 0;
    const k = 20;
    let best = 0;
    for (let i = 0; i + k <= A.length; i++) {
      const gram = A.slice(i, i + k);
      if (B.includes(gram)) best++;
    }
    return (best / Math.max(1, A.length - 20)) * 100;
  })();

  // pick a small common snippet for display
  let snippet = "";
  outer: for (let len = 40; len >= 20; len -= 5) {
    for (let i = 0; i + len <= A.length; i++) {
      const s = A.slice(i, i + len);
      const j = B.indexOf(s);
      if (j >= 0) { snippet = s; break outer; }
    }
  }
  return {
    cosine,
    hamming: h,
    jaccard: jac,
    overlapPercent,
    snippetA: snippet,
    snippetB: snippet
  };
}

/** classify risk */
export function classify(m: Metrics): "low"|"medium"|"high" {
  // tuned conservatively: high if 2+ strong signals agree
  const strongCos = m.cosine >= 0.85;
  const strongHam = m.hamming <= 6;
  const strongJac = m.jaccard >= 0.6;
  const strongOv  = m.overlapPercent >= 20;
  const votes = [strongCos, strongHam, strongJac, strongOv].filter(Boolean).length;
  if (votes >= 2) return "high";
  if (m.cosine >= 0.7 || m.jaccard >= 0.45) return "medium";
  return "low";
}
