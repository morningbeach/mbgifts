import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(()=>null);
  const now = new Date().toISOString();
  let payload: any = {};
  if (form) payload = Object.fromEntries(form.entries());
  else { try { payload = await req.json(); } catch {} }

  const record = {
    id: crypto.randomUUID(),
    company: (payload.company||'').toString(),
    email: (payload.email||'').toString(),
    region: (payload.region||'').toString(),
    quantity: Number(payload.quantity||0),
    unit_budget: Number(payload.unit_budget||0),
    deadline: (payload.deadline||'').toString(),
    theme: (payload.theme||'').toString(),
    dietary: (payload.dietary||'').toString(),
    packaging_style: (payload.packaging_style||'').toString(),
    finishes: (payload.finishes||'').toString(),
    notes: (payload.notes||'').toString(),
    summary_json: (payload.payload||payload.summary_json||'').toString(),
    created_at: now
  };

  // Cloudflare Pages D1 binding
  // @ts-ignore
  const db = (globalThis as any).env?.DB;
  if (!db) return NextResponse.json({ ok:false, error:'D1 binding DB not found' }, { status: 500 });

  const stmt = `INSERT INTO rfqs (id,company,email,region,quantity,unit_budget,deadline,theme,dietary,packaging_style,finishes,notes,summary_json,created_at)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14)`;
  await db.prepare(stmt).bind(
    record.id,record.company,record.email,record.region,record.quantity,record.unit_budget,record.deadline,
    record.theme,record.dietary,record.packaging_style,record.finishes,record.notes,record.summary_json,record.created_at
  ).run();

  return NextResponse.json({ ok:true, id:record.id });
}
