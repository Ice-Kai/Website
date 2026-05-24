import { prisma } from "@/lib/prisma";
import { Box, Play, Wrench, Image, Eye, FileText } from "lucide-react";

export default async function AdminDashboard() {
  const [modelCount, courseCount, softwareCount, materialCount, totalViews, recentItems] =
    await Promise.all([
      prisma.contentItem.count({ where: { contentType: "MODEL" } }),
      prisma.contentItem.count({ where: { contentType: "COURSE" } }),
      prisma.contentItem.count({ where: { contentType: "SOFTWARE" } }),
      prisma.contentItem.count({ where: { contentType: "MATERIAL" } }),
      prisma.contentItem.aggregate({ _sum: { viewCount: true } }),
      prisma.contentItem.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { categories: true, files: true },
      }),
    ]);

  const stats = [
    { label: "SU模型", value: modelCount, icon: Box, color: "text-red-500 bg-red-50" },
    { label: "教程", value: courseCount, icon: Play, color: "text-cyan-500 bg-cyan-50" },
    { label: "软件", value: softwareCount, icon: Wrench, color: "text-blue-500 bg-blue-50" },
    { label: "素材", value: materialCount, icon: Image, color: "text-violet-500 bg-violet-50" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">仪表盘</h2>
        <p className="text-sm text-slate-500 mt-1">内容数据概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-3xl font-black text-slate-900">{s.value}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* 总浏览 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Eye className="h-5 w-5 text-cyan-500" />
          <span className="text-sm font-semibold text-slate-500">累计浏览量</span>
          <span className="text-2xl font-black text-slate-900">{totalViews._sum.viewCount ?? 0}</span>
        </div>
      </div>

      {/* 最近内容 */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-600" />
            <h3 className="text-sm font-black text-slate-900">最近内容</h3>
          </div>
          <span className="text-xs text-slate-400">{recentItems.length} 条</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-2.5 text-xs font-bold text-slate-500">标题</th>
                <th className="px-5 py-2.5 text-xs font-bold text-slate-500">类型</th>
                <th className="px-5 py-2.5 text-xs font-bold text-slate-500">分类</th>
                <th className="px-5 py-2.5 text-xs font-bold text-slate-500">文件</th>
                <th className="px-5 py-2.5 text-xs font-bold text-slate-500">日期</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-bold text-slate-800 max-w-[300px] truncate">{item.title}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">{item.contentType}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{item.categories.map((c) => c.name).join(", ") || "-"}</td>
                  <td className="px-5 py-3">
                    {item.files.length > 0 ? (
                      <span className="text-xs font-bold text-cyan-600">{item.files.length} 个链接</span>
                    ) : (
                      <span className="text-xs text-slate-400">无</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-400">{item.createdAt.toISOString().slice(0, 10)}</td>
                </tr>
              ))}
              {recentItems.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">暂无内容，去新增内容吧</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
