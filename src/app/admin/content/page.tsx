"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

type ContentItem = {
  id: string; title: string; contentType: string; status: string;
  viewCount: number; createdAt: string;
  categories: { name: string }[];
  files: { fileUrl: string }[];
};

export default function ContentListPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filter) params.set("type", filter);
    const res = await fetch(`/api/admin/content?${params}`);
    const data = await res.json();
    setItems(data.items || []);
  }, [filter]);

  useEffect(() => {
    let ignore = false;
    const params = new URLSearchParams();
    if (filter) params.set("type", filter);

    fetch(`/api/admin/content?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setItems(data.items || []);
      });

    return () => {
      ignore = true;
    };
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const filtered = search
    ? items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">内容管理</h2>
        <Link href="/admin/content/new" className="btn-primary">
          <Plus className="h-4 w-4" /> 新增内容
        </Link>
      </div>

      {/* 筛选 + 搜索 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {["", "MODEL", "COURSE", "MATERIAL", "SOFTWARE", "CASE_STUDY"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${filter === t ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
              {t || "全部"}
            </button>
          ))}
        </div>
        <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="bg-transparent text-sm outline-none" placeholder="搜索标题…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} 条</span>
      </div>

      {/* 列表 */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-5 py-3 text-xs font-bold text-slate-500">标题</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-20">类型</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-20">状态</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-28">分类</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-20">文件</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-24">日期</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 w-24">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                <td className="px-5 py-3 font-bold text-slate-800 max-w-[300px] truncate">{item.title}</td>
                <td className="px-5 py-3"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">{item.contentType}</span></td>
                <td className="px-5 py-3"><span className={`rounded px-2 py-0.5 text-xs font-bold ${item.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{item.status}</span></td>
                <td className="px-5 py-3 text-xs text-slate-500">{item.categories?.map((c) => c.name).join(", ") || "-"}</td>
                <td className="px-5 py-3 text-xs font-bold text-cyan-600">{item.files?.length || 0} 个</td>
                <td className="px-5 py-3 text-xs text-slate-400">{item.createdAt?.slice(0, 10)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/content/new?id=${item.id}`} className="btn-icon text-slate-400 hover:text-cyan-600"><Pencil className="h-4 w-4" /></Link>
                    <button onClick={() => handleDelete(item.id)} className="btn-icon text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">暂无内容</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
