// app/api/catalog/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';

type Row = Record<string, any>;
const J = (d:any, s=200)=>NextResponse.json(d,{status:s,headers:{'cache-control':'no-store'}});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const type = (url.searchParams.get('type') || '').toLowerCase(); // gifts | boxes | sets
  const theme = (url.searchParams.get('theme') || '').trim();       // 對應 tags 或 style
  const dietary = (url.searchParams.get('dietary') || '').trim();   // 對應 tags
  const min = Math.max(0, Number(url.searchParams.get('min') || 0));
  const max = Math.max(0, Number(url.searchParams.get('max') || 0));
  const limit = Math.min(Number(url.searchParams.get('limit') || 24), 60);

  // 以美元入參 -> 轉成 cents
  const minCents = min ? Math.round(min * 100) : 0;
  const maxCents = max ? Math.round(max * 100) : 0;

  // @ts-ignore D1 binding
  const db = (globalThis as any).env?.DB;

  if (!db) {
    // 沒綁 DB 的情況，返回示例資料
    if (type === 'gifts') return J([{ id:'g1', name:'Single-Origin Tea', price_cents:1200, tags:'tea,wellness' }]);
    if (type === 'boxes') return J([{ id:'box1', name:'Signature Rigid Box (M)', style:'rigid', base_cost_cents:450 }]);
    if (type === 'sets')  return J([{ id:'s1', name:'Welcome Kit', price_cents:5200, items_count:2 }]);
    return J({ok:false,error:'DB binding not found & unknown type'},500);
  }

  try {
    if (type === 'gifts') {
      // 動態組 WHERE 子句
      const where:string[] = [];
      const binds:any[] = [];

      if (theme) { where.push(`(name LIKE ? OR tags LIKE ?)`); binds.push(`%${theme}%`,`%${theme}%`); }
      if (dietary) { where.push(`(tags LIKE ?)`); binds.push(`%${dietary}%`); }
      if (minCents) { where.push(`price_cents >= ?`); binds.push(minCents); }
      if (maxCents) { where.push(`price_cents <= ?`); binds.push(maxCents); }

      let sql = `SELECT id, sku, name, price_cents, image, tags FROM gifts`;
      if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
      sql += ` ORDER BY created_at DESC LIMIT ?`;
      binds.push(limit);

      const res = await db.prepare(sql).bind(...binds).all<Row>();
      return J(res.results || []);
    }

    if (type === 'boxes') {
      const where:string[] = [];
      const binds:any[] = [];
      // theme 先拿來比對 style 或 finishes
      if (theme) { where.push(`(style LIKE ? OR name LIKE ? OR IFNULL(finishes,'') LIKE ?)`); binds.push(`%${theme}%`,`%${theme}%`,`%${theme}%`); }
      let sql = `SELECT id, style, name, base_cost_cents, finishes, image FROM boxes`;
      if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
      sql += ` ORDER BY name LIMIT ?`;
      binds.push(limit);
      const res = await db.prepare(sql).bind(...binds).all<Row>();
      return J(res.results || []);
    }

    if (type === 'sets') {
      const where:string[] = [];
      const binds:any[] = [];
      // theme/dietary 以內含 gifts 的 tags 搜尋
      if (theme || dietary) {
        where.push(`EXISTS (
          SELECT 1 FROM gift_set_items si
          JOIN gifts g ON g.id = si.gift_id
          WHERE si.set_id = s.id AND (g.tags LIKE ?)
        )`);
        const kw = `%${(theme || dietary)}%`;
        binds.push(kw);
      }
      if (minCents) { where.push(`IFNULL(s.price_cents,0) >= ?`); binds.push(minCents); }
      if (maxCents) { where.push(`IFNULL(s.price_cents,999999999) <= ?`); binds.push(maxCents); }

      let sql = `
        SELECT s.id, s.name, s.price_cents, s.image,
               (SELECT COUNT(*) FROM gift_set_items gsi WHERE gsi.set_id = s.id) AS items_count
        FROM gift_sets s
      `;
      if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
      sql += ` ORDER BY s.name LIMIT ?`;
      binds.push(limit);

      const res = await db.prepare(sql).bind(...binds).all<Row>();
      return J(res.results || []);
    }

    return J({ ok:false, error:'Unknown type'}, 400);
  } catch (err:any) {
    return J({ ok:false, error:String(err?.message||err) }, 500);
  }
}
