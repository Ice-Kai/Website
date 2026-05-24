"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Upload, Save } from "lucide-react";

type Category = { id: string; name: string; type: string; parentId: string | null };
type FileEntry = { label: string; fileUrl: string; password: string; fileSize: string };

export default function ContentFormPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm font-bold text-slate-400">加载中...</div>}>
      <ContentForm />
    </Suspense>
  );
}

function ContentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = !!editId;

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // 表单字段
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [contentType, setContentType] = useState("MODEL");
  const [status, setStatus] = useState("PUBLISHED");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 10));

  // 加载分类
  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
  }, []);

  // 编辑模式：加载已有数据
  useEffect(() => {
    if (!editId) return;
    fetch(`/api/admin/content?`)
      .then((r) => r.json())
      .then((data) => {
        const item = data.items?.find((i: { id: string }) => i.id === editId);
        if (!item) return;
        setTitle(item.title);
        setSummary(item.summary || "");
        setCoverImage(item.coverImage || "");
        setContentType(item.contentType);
        setStatus(item.status);
        setCategoryIds(item.categories?.map((c: { id: string }) => c.id) || []);
        setFiles(item.files?.map((f: { label: string; fileUrl: string; password: string; fileSize: string }) => ({
          label: f.label, fileUrl: f.fileUrl, password: f.password || "", fileSize: f.fileSize || "",
        })) || []);
        setPublishedAt(item.publishedAt?.slice(0, 10) || "");
      });
  }, [editId]);

  // 图片上传
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setCoverImage(data.url);
    setUploading(false);
  };

  // 文件条目操作
  const addFile = () => setFiles([...files, { label: "", fileUrl: "", password: "", fileSize: "" }]);
  const removeFile = (i: number) => setFiles(files.filter((_, idx) => idx !== i));
  const updateFile = (i: number, k: keyof FileEntry, v: string) => {
    const updated = [...files];
    updated[i] = { ...updated[i], [k]: v };
    setFiles(updated);
  };

  // 提交
  const handleSubmit = async () => {
    if (!title) return setMessage("请填写标题");
    setSaving(true);
    setMessage("");

    const body = { title, summary, coverImage, contentType, status, categoryIds, files: files.filter((f) => f.fileUrl), publishedAt };
    const url = isEdit ? `/api/admin/content/${editId}` : "/api/admin/content";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/content");
      router.refresh();
    } else {
      setMessage("保存失败");
    }
    setSaving(false);
  };

  const topCategories = categories.filter((c) => !c.parentId && c.type === contentType);

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content" className="text-slate-400 hover:text-slate-600"><ArrowLeft className="h-5 w-5" /></Link>
        <h2 className="text-2xl font-black text-slate-900">{isEdit ? "编辑内容" : "新增内容"}</h2>
      </div>

      {message && <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">{message}</div>}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {/* 基本信息 */}
        <Section title="基本信息">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>标题 *</Label>
              <input className="input w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="内容标题" />
            </div>
            <div className="sm:col-span-2">
              <Label>摘要</Label>
              <textarea className="input w-full h-20 resize-none" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="简要描述…" />
            </div>
            <div>
              <Label>内容类型</Label>
              <select className="input w-full" value={contentType} onChange={(e) => { setContentType(e.target.value); setCategoryIds([]); }}>
                <option value="MODEL">模型</option><option value="COURSE">教程</option><option value="MATERIAL">素材</option><option value="SOFTWARE">软件</option><option value="CASE_STUDY">案例</option>
              </select>
            </div>
            <div>
              <Label>发布状态</Label>
              <select className="input w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PUBLISHED">已发布</option><option value="DRAFT">草稿</option><option value="ARCHIVED">归档</option>
              </select>
            </div>
            <div>
              <Label>发布日期</Label>
              <input type="date" className="input w-full" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
            </div>
            <div>
              <Label>分类</Label>
              <select multiple className="input w-full h-32" value={categoryIds} onChange={(e) => setCategoryIds(Array.from(e.target.selectedOptions, (o) => o.value))}>
                {topCategories.map((c) => (
                  <optgroup key={c.id} label={c.name}>
                    <option value={c.id}>{c.name}</option>
                    {categories.filter((ch) => ch.parentId === c.id && ch.type === contentType).map((ch) => (
                      <option key={ch.id} value={ch.id}>&nbsp;&nbsp;└ {ch.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span className="text-xs text-slate-400 mt-1">Ctrl+点击多选</span>
            </div>
          </div>
        </Section>

        {/* 封面图上传 */}
        <Section title="封面图片">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Label>图片URL 或 上传</Label>
              <input className="input w-full" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https:// 或上传图片" />
            </div>
            <div className="pt-5">
              <label className="btn-secondary cursor-pointer">
                <Upload className="h-4 w-4" />
                {uploading ? "上传中…" : "本地上传"}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </div>
          {coverImage && (
            <div className="mt-3 relative w-40 aspect-video rounded-lg overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="封面预览" className="w-full h-full object-cover" />
            </div>
          )}
        </Section>

        {/* 百度网盘文件管理 */}
        <Section title={
          <div className="flex items-center justify-between w-full">
            <span>百度网盘文件</span>
            <button onClick={addFile} className="btn-primary text-xs"><Plus className="h-3.5 w-3.5" /> 添加链接</button>
          </div>
        }>
          {files.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">暂无文件链接，点击&quot;添加链接&quot;新增</p>
          )}
          {files.map((f, i) => (
            <div key={i} className="flex flex-wrap items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 mb-2">
              <div className="flex-1 min-w-[200px]">
                <Label>文件标签</Label>
                <input className="input w-full" value={f.label} onChange={(e) => updateFile(i, "label", e.target.value)} placeholder="如：SU模型下载" />
              </div>
              <div className="flex-[2] min-w-[300px]">
                <Label>百度网盘链接 *</Label>
                <input className="input w-full" value={f.fileUrl} onChange={(e) => updateFile(i, "fileUrl", e.target.value)} placeholder="https://pan.baidu.com/s/..." />
              </div>
              <div className="w-28">
                <Label>提取码</Label>
                <input className="input w-full" value={f.password} onChange={(e) => updateFile(i, "password", e.target.value)} placeholder="如：abcd" />
              </div>
              <div className="w-28">
                <Label>文件大小</Label>
                <input className="input w-full" value={f.fileSize} onChange={(e) => updateFile(i, "fileSize", e.target.value)} placeholder="如：378 MB" />
              </div>
              <button onClick={() => removeFile(i)} className="btn-icon text-red-400 hover:text-red-600 mt-5"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </Section>

        {/* 提交 */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button onClick={handleSubmit} disabled={saving} className="btn-primary text-base px-8">
            <Save className="h-4 w-4" />
            {saving ? "保存中…" : isEdit ? "更新内容" : "发布内容"}
          </button>
          <Link href="/admin/content" className="btn-ghost">取消</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-sm font-black text-slate-700">
        {typeof title === "string" ? <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> : null}
        {title}
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-bold text-slate-500 mb-1.5">{children}</label>;
}
