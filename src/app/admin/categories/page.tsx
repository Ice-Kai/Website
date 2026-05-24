"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

type Category = {
  id: string; name: string; slug: string; type: string; sortOrder: number;
  parentId: string | null; description: string | null;
  parent: { name: string } | null;
  _count: { items: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", type: "MODEL", sortOrder: 0, parentId: "" });
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    const res = await fetch("/api/admin/categories");
    setCategories(await res.json());
  }, []);

  useEffect(() => {
    let ignore = false;

    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setCategories(data);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleAdd = async () => {
    if (!form.name) return;
    setLoading(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, parentId: form.parentId || null }),
    });
    setForm({ name: "", slug: "", type: "MODEL", sortOrder: 0, parentId: "" });
    await fetchCategories();
    setLoading(false);
  };

  const handleUpdate = async (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    setLoading(true);
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: cat.name, slug: cat.slug, type: cat.type, sortOrder: cat.sortOrder, parentId: cat.parentId, description: cat.description }),
    });
    setEditing(null);
    await fetchCategories();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除此分类？")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    await fetchCategories();
  };

  const topCategories = categories.filter((c) => !c.parentId);
  const getChildren = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black text-slate-900">分类管理</h2>

      {/* 新增表单 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 mb-4">新增分类</h3>
        <div className="flex flex-wrap items-end gap-3">
          <Field label="名称">
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value })} placeholder="分类名称" />
          </Field>
          <Field label="类型">
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="MODEL">模型</option><option value="COURSE">教程</option><option value="MATERIAL">素材</option><option value="SOFTWARE">软件</option><option value="CASE_STUDY">案例</option><option value="NEWS">新闻</option>
            </select>
          </Field>
          <Field label="排序">
            <input className="input w-20" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: +e.target.value })} />
          </Field>
          <Field label="父分类">
            <select className="input" value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
              <option value="">无（顶级）</option>
              {topCategories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </Field>
          <button onClick={handleAdd} disabled={loading} className="btn-primary">
            <Plus className="h-4 w-4" /> 添加
          </button>
        </div>
      </div>

      {/* 分类列表 */}
      {topCategories.map((cat) => (
        <div key={cat.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <CatRow cat={cat} categories={categories} setCategories={setCategories} editing={editing} setEditing={setEditing} onDelete={handleDelete} onUpdate={handleUpdate} depth={0} />
          {getChildren(cat.id).map((child) => (
            <CatRow key={child.id} cat={child} categories={categories} setCategories={setCategories} editing={editing} setEditing={setEditing} onDelete={handleDelete} onUpdate={handleUpdate} depth={1} />
          ))}
        </div>
      ))}
    </div>
  );
}

function CatRow({ cat, categories, setCategories, editing, setEditing, onDelete, onUpdate, depth }: {
  cat: Category; categories: Category[]; setCategories: (c: Category[]) => void;
  editing: string | null; setEditing: (id: string | null) => void;
  onDelete: (id: string) => void; onUpdate: (id: string) => void; depth: number;
}) {
  const isEditing = editing === cat.id;
  const update = (k: keyof Category, v: string | number) => {
    setCategories(categories.map((c) => c.id === cat.id ? { ...c, [k]: v } : c));
  };

  return (
    <div className={`flex items-center gap-4 px-5 py-3 border-b border-slate-50 hover:bg-slate-50/50 ${depth === 1 ? "pl-12 bg-slate-50/30" : ""}`}>
      <span className="text-xs text-slate-400 w-8">{cat.sortOrder}</span>
      <span className="text-xs text-slate-300 w-20 truncate">{cat.id.slice(0, 8)}</span>
      {isEditing ? (
        <input className="input flex-1" value={cat.name} onChange={(e) => update("name", e.target.value)} autoFocus />
      ) : (
        <span className="flex-1 text-sm font-bold text-slate-800">{cat.name}</span>
      )}
      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500 w-16 text-center">{cat.type}</span>
      <span className="text-xs text-slate-400 w-12 text-right">{cat._count.items}</span>
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <button onClick={() => onUpdate(cat.id)} className="btn-icon text-emerald-600"><Save className="h-4 w-4" /></button>
            <button onClick={() => setEditing(null)} className="btn-icon text-slate-400"><X className="h-4 w-4" /></button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(cat.id)} className="btn-icon text-slate-400 hover:text-cyan-600"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => onDelete(cat.id)} className="btn-icon text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1 text-xs font-bold text-slate-500">{label}{children}</label>;
}
