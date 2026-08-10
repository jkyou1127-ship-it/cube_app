import { useState, type ReactNode } from 'react';

export function AlgCard({ title, subtitle, alg, diagram }: { title: string; subtitle?: string; alg: string; diagram: ReactNode }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(alg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard unavailable - ignore
    }
  }

  return (
    <div className="alg-card">
      <div className="alg-card__diagram">{diagram}</div>
      <div className="alg-card__body">
        <div className="alg-card__title">{title}</div>
        {subtitle && <div className="faint">{subtitle}</div>}
        <div className="alg-card__alg mono">{alg}</div>
        <button className="btn btn-sm btn-ghost alg-card__copy" onClick={copy}>
          {copied ? '복사됨 ✓' : '공식 복사'}
        </button>
      </div>
    </div>
  );
}
