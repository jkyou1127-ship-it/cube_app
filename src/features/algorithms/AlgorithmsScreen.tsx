import { useMemo, useState } from 'react';
import { OLL_CASES } from './ollData';
import { PLL_CASES } from './pllData';
import { OllDiagram, PllDiagram } from './CubeDiagram';
import { AlgCard } from './AlgCard';

type Kind = 'OLL' | 'PLL';

export function AlgorithmsScreen() {
  const [kind, setKind] = useState<Kind>('OLL');
  const [query, setQuery] = useState('');

  const filteredOll = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OLL_CASES;
    return OLL_CASES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.group.toLowerCase().includes(q) || String(c.id).includes(q)
    );
  }, [query]);

  const filteredPll = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PLL_CASES;
    return PLL_CASES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.group.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="screen">
      <div className="pill-toggle" style={{ marginBottom: 12 }}>
        <button className={kind === 'OLL' ? 'active' : ''} onClick={() => setKind('OLL')}>
          OLL ({OLL_CASES.length})
        </button>
        <button className={kind === 'PLL' ? 'active' : ''} onClick={() => setKind('PLL')}>
          PLL ({PLL_CASES.length})
        </button>
      </div>

      <input
        className="text-input"
        style={{ marginBottom: 12 }}
        placeholder="번호, 이름으로 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="card disclaimer">
        ℹ️ 공식과 그림은 학습 참고용으로 정리한 자료예요. 실전 연습 전에는 다른 정식 자료와 한 번 더 비교해보는 걸 추천해요. 특히
        일부 PLL의 a/b 버전은 헷갈리기 쉬우니 꼭 확인해보세요.
      </div>

      <div className="alg-grid">
        {kind === 'OLL'
          ? filteredOll.map((c) => (
              <AlgCard
                key={c.id}
                title={`${c.id}. ${c.name}`}
                subtitle={c.group}
                alg={c.alg}
                diagram={<OllDiagram pattern={c.pattern} />}
              />
            ))
          : filteredPll.map((c) => (
              <AlgCard
                key={c.id}
                title={c.name}
                subtitle={c.group}
                alg={c.alg}
                diagram={<PllDiagram edges={c.edges} corners={c.corners} />}
              />
            ))}
      </div>

      {((kind === 'OLL' && filteredOll.length === 0) || (kind === 'PLL' && filteredPll.length === 0)) && (
        <div className="empty-state">검색 결과가 없어요.</div>
      )}
    </div>
  );
}
