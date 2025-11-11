'use client';
/**
 * 篩選列（英文 UI / 中文註解）
 * - 價格區間（美元，會自動轉為 cents 傳到 API）
 * - 主題（theme -> 對應 tags 模糊比對）
 * - 飲食（dietary -> 對應 tags 模糊比對，例如 vegan, halal, gluten_free）
 * - 以 URL 查詢參數為單一真相：更新會 push URL（SSR 會依參數抓資料）
 */
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FilterBar({ category }: { category: 'gifts' | 'boxes' | 'sets' }) {
  const sp = useSearchParams();
  const router = useRouter();

  const [min, setMin] = useState(sp.get('min') || '');
  const [max, setMax] = useState(sp.get('max') || '');
  const [theme, setTheme] = useState(sp.get('theme') || '');
  const [dietary, setDietary] = useState(sp.get('dietary') || '');

  useEffect(() => {
    setMin(sp.get('min') || '');
    setMax(sp.get('max') || '');
    setTheme(sp.get('theme') || '');
    setDietary(sp.get('dietary') || '');
  }, [sp]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (min) p.set('min', min);
    if (max) p.set('max', max);
    if (theme) p.set('theme', theme);
    if (dietary) p.set('dietary', dietary);
    router.push(`?${p.toString()}`);
  }

  function clearAll() {
    setMin(''); setMax(''); setTheme(''); setDietary('');
    router.push(`?`);
  }

  return (
    <form onSubmit={submit} className="filterbar">
      <div className="row">
        <label>
          Min $
          <input inputMode="numeric" placeholder="0" value={min} onChange={e=>setMin(e.target.value)} />
        </label>
        <label>
          Max $
          <input inputMode="numeric" placeholder="999" value={max} onChange={e=>setMax(e.target.value)} />
        </label>
        <label>
          Theme
          <input placeholder="tea / wellness / tech" value={theme} onChange={e=>setTheme(e.target.value)} />
        </label>
        <label>
          Dietary
          <input placeholder="vegan / halal / gluten" value={dietary} onChange={e=>setDietary(e.target.value)} />
        </label>
        <div className="actions">
          <button className="btn btn-primary" type="submit">Apply</button>
          <button className="btn btn-ghost" type="button" onClick={clearAll}>Reset</button>
        </div>
      </div>
      {/* 保留：子選單（例如 Gifts -> Coffee / Tea / Tech；Sets -> Welcome / Holiday） */}
      <div className="subnav">
        <span className="hint">Subcategories (coming soon)</span>
        {/* 未來可改成動態 chips。此區先占位，避免版型大改 */}
      </div>
    </form>
  );
}
