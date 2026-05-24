import Link from "next/link";
import { LayoutDashboard, FolderTree, FileText, Image, ChevronLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* 左侧边栏 */}
      <aside className="w-[240px] shrink-0 bg-slate-950 text-white flex flex-col min-h-screen">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-3">
            <ChevronLeft className="h-4 w-4" /> 返回前台
          </Link>
          <h1 className="text-lg font-black">薛大大后台</h1>
          <p className="text-xs text-slate-400 mt-1">内容管理系统</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="仪表盘" />
          <SidebarLink href="/admin/categories" icon={FolderTree} label="分类管理" />
          <SidebarLink href="/admin/content" icon={FileText} label="内容管理" />
          <SidebarLink href="/admin/content/new" icon={Image} label="新增内容" />
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-slate-500">
          xuedda CMS v1.0
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

function SidebarLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-400 hover:bg-white/10 hover:text-white transition-all"
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}
