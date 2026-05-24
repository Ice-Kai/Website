export type NavItem = {
  label: string;
  href: string;
};

export type TopicItem = {
  label: string;
  href: string;
  tone: string;
};

export type ResourceItem = {
  title: string;
  summary: string;
  category: string;
  action: "下载" | "观看" | "详图";
  date: string;
  views: string;
  image: string;
  href: string;
  meta: string;
};

export type SectionData = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  items: ResourceItem[];
};

export type AdminQueueItem = {
  label: string;
  value: string;
  hint: string;
};

export type HotRecommendation = {
  label: string;
  href: string;
  badge?: string;
};

export type SoftwareItem = {
  label: string;
  icon: string;
  href: string;
  color: string;
};

export type ModelCategory = {
  id: string;
  name: string;
  slug: string;
  count: number;
  children?: ModelCategory[];
};

// ── 导航 ──

export const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "薛大大新闻", href: "/news" },
  { label: "模型", href: "/models" },
  { label: "灯光和贴图", href: "/lighting" },
  { label: "软件和参数", href: "/software" },
  { label: "视频教程", href: "/videos" },
  { label: "其他相关", href: "/others" },
  { label: "赞助支持", href: "/member" },
];

// ── Hero ──

export const heroSlides = [
  {
    title: "从入门到拟真·实战项目教学",
    subtitle: "D5 RENDER 全套教程",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=82",
    href: "/courses",
  },
];

export const heroFeatures = [
  { label: "系统化课程", icon: "📚" },
  { label: "案例实战", icon: "🎯" },
  { label: "素材配套", icon: "📦" },
  { label: "永久更新", icon: "🔄" },
];

// ── 热门推荐侧边栏 ──

export const hotRecommendations: HotRecommendation[] = [
  { label: "D5 全套渲染教程", href: "/courses", badge: "HOT" },
  { label: "SU 模型精选", href: "/models", badge: "NEW" },
  { label: "Layout 施工图教程", href: "/courses?tab=layout" },
  { label: "设计素材库", href: "/materials" },
  { label: "赞助支持", href: "/member" },
];

// ── 软件图标条 ──

export const softwareList: SoftwareItem[] = [
  { label: "SU模型", icon: "box", href: "/models", color: "from-red-500 to-orange-500" },
  { label: "D5教程", icon: "clapperboard", href: "/models?category=d5-model", color: "from-cyan-500 to-teal-500" },
  { label: "Enscape", icon: "eye", href: "/software?category=enscape", color: "from-blue-500 to-indigo-500" },
  { label: "Lumion", icon: "sun", href: "/software?category=lumion", color: "from-emerald-500 to-green-500" },
  { label: "Photoshop", icon: "image", href: "/software?category=photoshop", color: "from-sky-500 to-blue-600" },
  { label: "V-Ray", icon: "sparkles", href: "/software?category=vray", color: "from-violet-500 to-purple-500" },
  { label: "Rhino", icon: "shapes", href: "/software?category=rhino-sw", color: "from-slate-400 to-slate-600" },
  { label: "C4D", icon: "cube", href: "/software?category=c4d-sw", color: "from-orange-500 to-red-500" },
  { label: "Navisworks", icon: "building", href: "/software?category=utility", color: "from-teal-500 to-cyan-600" },
  { label: "CAD", icon: "ruler", href: "/software?category=cad", color: "from-rose-500 to-pink-500" },
];

// ── 快速统计 ──

export const quickEntries = [
  { label: "SU模型", value: "3,200+", hint: "建筑 / 工装 / 家装 / 园林" },
  { label: "专题教程", value: "180+", hint: "D5 / Layout / SketchUp" },
  { label: "素材下载", value: "560+", hint: "PBR / HDR / D5材质" },
  { label: "软件插件", value: "120+", hint: "安装包 / 渲染器 / 工具" },
];

export const topics: TopicItem[] = [
  { label: "SU模型精选", href: "/models", tone: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
  { label: "D5渲染教程", href: "/courses", tone: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100" },
  { label: "Layout施工图", href: "/courses?tab=layout", tone: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
  { label: "PBR / HDR素材", href: "/materials", tone: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  { label: "软件插件", href: "/software", tone: "bg-violet-50 text-violet-700 hover:bg-violet-100" },
  { label: "设计服务", href: "/services", tone: "bg-rose-50 text-rose-700 hover:bg-rose-100" },
];

// ── SU 模型精选 ──

export const suModelItems: ResourceItem[] = [
  {
    title: "SU-25 楼梯间扶手艺术造型",
    summary: "现代风格楼梯扶手模型，适合室内装饰与工装场景。",
    category: "SU模型 / 楼梯",
    action: "下载",
    date: "2026-05-18",
    views: "23",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/",
    meta: "SKP / 28 MB",
  },
  {
    title: "SU-24 现代旋转楼梯",
    summary: "优雅的旋转楼梯模型，适合别墅和商业空间表现。",
    category: "SU模型 / 楼梯",
    action: "下载",
    date: "2026-05-17",
    views: "45",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/",
    meta: "SKP / 35 MB",
  },
  {
    title: "SU-23 户外景观楼梯",
    summary: "景观与建筑结合的户外楼梯方案，含绿化配置。",
    category: "SU模型 / 景观",
    action: "下载",
    date: "2026-05-16",
    views: "31",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/",
    meta: "SKP / 42 MB",
  },
  {
    title: "SU-22 豪华别墅弧形楼梯",
    summary: "高端别墅室内弧形楼梯精细模型，欧式风格。",
    category: "SU模型 / 家装",
    action: "详图",
    date: "2026-05-15",
    views: "67",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/",
    meta: "SKP / 52 MB",
  },
  {
    title: "SU-21 商业空间中庭楼梯",
    summary: "大型商业空间中庭景观楼梯模型，含灯光氛围。",
    category: "SU模型 / 工装",
    action: "下载",
    date: "2026-05-14",
    views: "89",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/",
    meta: "SKP / 68 MB",
  },
];

// ── D5 渲染教程 ──

export const d5CourseItems: ResourceItem[] = [
  {
    title: "D5室内渲染全流程实战",
    summary: "从模型导入到最终出图，完整室内场景渲染教学。",
    category: "D5教程 / 室内",
    action: "观看",
    date: "2026-04-20",
    views: "2.1K",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/index/download/index/category_id/336.html",
    meta: "12课时",
  },
  {
    title: "D5建筑外观表现技法",
    summary: "建筑日景/夜景/阴天多场景渲染全流程。",
    category: "D5教程 / 建筑",
    action: "观看",
    date: "2026-04-18",
    views: "1.8K",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/index/download/index/category_id/336.html",
    meta: "10课时",
  },
  {
    title: "D5景观与园林渲染",
    summary: "植物配置、水景、地形全流程景观渲染教学。",
    category: "D5教程 / 景观",
    action: "观看",
    date: "2026-04-15",
    views: "1.5K",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/index/download/index/category_id/336.html",
    meta: "8课时",
  },
  {
    title: "D5动画与漫游制作",
    summary: "镜头动画、路径漫游和剪辑输出全流程教学。",
    category: "D5教程 / 动画",
    action: "观看",
    date: "2026-04-10",
    views: "1.2K",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/index/download/index/category_id/336.html",
    meta: "6课时",
  },
];

// ── 原有 sections（给旧组件保留兼容）──

const materialItems: ResourceItem[] = [
  {
    title: "10组墙面PBR贴图素材",
    summary: "4K高清墙面贴图，适合室内与建筑表现快速调用。",
    category: "PBR贴图",
    action: "下载",
    date: "2023-09-26",
    views: "1.1K",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=82",
    href: "https://www.xuedda.com/",
    meta: "360 MB",
  },
  {
    title: "D5素材 - 环绕背景",
    summary: "用于 D5 场景氛围表现的环境背景素材。",
    category: "D5材质库",
    action: "下载",
    date: "2023-09-24",
    views: "126",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    href: "https://www.xuedda.com/",
    meta: "环境背景",
  },
  {
    title: "HDR贴图素材 - 室外环境",
    summary: "适配建筑、景观与室外渲染的 HDR 环境贴图。",
    category: "HDR贴图",
    action: "下载",
    date: "2023-09-21",
    views: "1.2K",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=82",
    href: "https://www.xuedda.com/",
    meta: "HDR",
  },
];

const softwareItems: ResourceItem[] = [
  {
    title: "SU2026版本",
    summary: "SketchUp新版安装包入口，保留旧站软件栏目高频访问路径。",
    category: "SketchUp / 软件",
    action: "下载",
    date: "2025-10-17",
    views: "560",
    image: "https://www.xuedda.com/uploads/images/20230524/a81b815356521566ec00dcb69a3622ea.jpg",
    href: "https://xuedda.com/index/download/index/category_id/222.html",
    meta: "Windows",
  },
  {
    title: "SU插件合集（薛大大版）",
    summary: "常用 SketchUp 插件合集，适合新装环境一次性配置。",
    category: "SketchUp / 插件",
    action: "下载",
    date: "2025-03-02",
    views: "2.1K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=82",
    href: "https://xuedda.com/index/download/index/category_id/222.html",
    meta: "插件合集",
  },
  {
    title: "ENS4.0版本",
    summary: "Enscape 软件与材质资产库入口，后续可按版本细分。",
    category: "Enscape / 软件",
    action: "下载",
    date: "2024-05-21",
    views: "2.0K",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=82",
    href: "https://www.xuedda.com/",
    meta: "渲染器",
  },
];

export const sections: SectionData[] = [
  {
    id: "su-models",
    eyebrow: "SU MODEL",
    title: "SU模型精选",
    description: "建筑、工装、家装、园林与D5模型统一展示，保留下载与详图双动作。",
    href: "https://www.xuedda.com/index/download/index/category_id/107.html",
    items: suModelItems,
  },
  {
    id: "d5-courses",
    eyebrow: "D5 COURSE",
    title: "D5渲染教程",
    description: "D5 全套渲染教程，从界面设置到项目表现系统学习。",
    href: "https://www.xuedda.com/index/download/index/category_id/336.html",
    items: d5CourseItems,
  },
  {
    id: "materials",
    eyebrow: "MATERIAL",
    title: "设计素材库",
    description: "PBR、HDR、D5材质、IES灯光和后期贴图集中呈现。",
    href: "https://www.xuedda.com/index/download/lists/category_id/296.html",
    items: materialItems,
  },
  {
    id: "software",
    eyebrow: "SOFTWARE",
    title: "软件插件",
    description: "软件安装包、渲染器、插件、快捷键模板和智达云相关工具的新版入口。",
    href: "https://xuedda.com/index/download/index/category_id/222.html",
    items: softwareItems,
  },
];

export const spotlightResources = sections.flatMap((section) => section.items);

export const adminQueues: AdminQueueItem[] = [
  { label: "待发布内容", value: "18", hint: "模型、教程、软件更新统一走内容审核" },
  { label: "待补下载链接", value: "9", hint: "ResourceFile 记录网盘、密码、文件大小" },
  { label: "赞助支持", value: "126", hint: "赞助者管理和致谢名单展示" },
  { label: "本周新增浏览", value: "4.8K", hint: "后续从内容统计表或日志聚合" },
];

export const categoryGroups = sections.map((section) => ({
  title: section.title,
  href: `#${section.id}`,
  description: section.description,
  children: section.items.map((item) => ({
    label: item.category.split(" / ")[0],
    href: item.href,
  })),
}));

export const contentWorkflow = ["采集旧站栏目与资源", "清洗分类、标签、封面和正文", "补齐下载文件与权限", "发布到前台栏目和专题页"];

// ── SU 模型分类树（参考旧站 xuedda.com 结构）──

export const modelCategories: ModelCategory[] = [
  {
    id: "all",
    name: "全部模型",
    slug: "all",
    count: 3280,
  },
  {
    id: "architecture",
    name: "建筑SU模型",
    slug: "architecture",
    count: 860,
    children: [
      { id: "arch-residential", name: "住宅建筑", slug: "arch-residential", count: 230 },
      { id: "arch-commercial", name: "商业建筑", slug: "arch-commercial", count: 185 },
      { id: "arch-cultural", name: "文化建筑", slug: "arch-cultural", count: 142 },
      { id: "arch-office", name: "办公建筑", slug: "arch-office", count: 156 },
      { id: "arch-other", name: "其他建筑", slug: "arch-other", count: 147 },
    ],
  },
  {
    id: "commercial",
    name: "工装SU模型",
    slug: "commercial",
    count: 720,
    children: [
      { id: "comm-education", name: "教育空间", slug: "comm-education", count: 210 },
      { id: "comm-office", name: "办公空间", slug: "comm-office", count: 185 },
      { id: "comm-medical", name: "医疗空间", slug: "comm-medical", count: 95 },
      { id: "comm-retail", name: "商业店铺", slug: "comm-retail", count: 148 },
      { id: "comm-other", name: "其他工装", slug: "comm-other", count: 82 },
    ],
  },
  {
    id: "residential",
    name: "家装SU模型",
    slug: "residential",
    count: 650,
    children: [
      { id: "resi-living", name: "客厅餐厅", slug: "resi-living", count: 185 },
      { id: "resi-bedroom", name: "卧室空间", slug: "resi-bedroom", count: 156 },
      { id: "resi-kitchen", name: "厨房卫浴", slug: "resi-kitchen", count: 142 },
      { id: "resi-study", name: "书房空间", slug: "resi-study", count: 88 },
      { id: "resi-other", name: "其他家装", slug: "resi-other", count: 79 },
    ],
  },
  {
    id: "landscape",
    name: "园林SU模型",
    slug: "landscape",
    count: 580,
    children: [
      { id: "land-garden", name: "庭院景观", slug: "land-garden", count: 168 },
      { id: "land-park", name: "公园广场", slug: "land-park", count: 142 },
      { id: "land-pavilion", name: "亭廊花架", slug: "land-pavilion", count: 125 },
      { id: "land-water", name: "水景小品", slug: "land-water", count: 88 },
      { id: "land-other", name: "其他园林", slug: "land-other", count: 57 },
    ],
  },
  {
    id: "d5-model",
    name: "D5模型",
    slug: "d5-model",
    count: 470,
    children: [
      { id: "d5-furniture", name: "D5家具", slug: "d5-furniture", count: 186 },
      { id: "d5-appliance", name: "D5电器", slug: "d5-appliance", count: 98 },
      { id: "d5-decoration", name: "D5摆件", slug: "d5-decoration", count: 112 },
      { id: "d5-other", name: "其他D5", slug: "d5-other", count: 74 },
    ],
  },
];

// ── SU 模型列表页扩展数据 ──

export const allModelItems: ResourceItem[] = [
  // 建筑
  {
    title: "SU-25 现代别墅建筑设计",
    summary: "两层现代风格别墅，含庭院景观和室内基础布局，适合建筑方案表现。",
    category: "建筑SU模型 / 住宅建筑",
    action: "下载", date: "2026-05-18", views: "156",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 85 MB",
  },
  {
    title: "SU-24 商业综合体外观",
    summary: "大型商业综合体建筑外观模型，含幕墙细节和周边场地。",
    category: "建筑SU模型 / 商业建筑",
    action: "下载", date: "2026-05-17", views: "203",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 120 MB",
  },
  {
    title: "SU-23 文化展览馆设计",
    summary: "现代文化展览馆建筑方案，含室内展厅布局和外观造型。",
    category: "建筑SU模型 / 文化建筑",
    action: "详图", date: "2026-05-16", views: "178",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 95 MB",
  },
  // 工装
  {
    title: "SU-22 现代办公空间设计",
    summary: "开放式办公空间，含工位区、会议室和休闲区完整布局。",
    category: "工装SU模型 / 办公空间",
    action: "下载", date: "2026-05-15", views: "132",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 62 MB",
  },
  {
    title: "SU-21 幼儿园室内设计",
    summary: "幼儿园教室及活动空间全套模型，色彩明亮适合教育空间参考。",
    category: "工装SU模型 / 教育空间",
    action: "下载", date: "2026-05-14", views: "245",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 48 MB",
  },
  {
    title: "SU-20 品牌服装店铺设计",
    summary: "时尚品牌服装店室内设计，含展示区、试衣间和收银台布局。",
    category: "工装SU模型 / 商业店铺",
    action: "下载", date: "2026-05-13", views: "98",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 55 MB",
  },
  // 家装
  {
    title: "SU-19 现代轻奢客厅",
    summary: "现代轻奢风格客厅空间，含电视背景墙和沙发区完整家具。",
    category: "家装SU模型 / 客厅餐厅",
    action: "下载", date: "2026-05-12", views: "312",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 42 MB",
  },
  {
    title: "SU-18 主卧套房设计",
    summary: "主卧套房含衣帽间和卫生间，新中式风格软装搭配。",
    category: "家装SU模型 / 卧室空间",
    action: "详图", date: "2026-05-11", views: "187",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 38 MB",
  },
  {
    title: "SU-17 开放式厨房设计",
    summary: "现代开放式厨房含岛台，全套橱柜和电器模型。",
    category: "家装SU模型 / 厨房卫浴",
    action: "下载", date: "2026-05-10", views: "156",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 35 MB",
  },
  // 园林
  {
    title: "SU-16 新中式庭院景观",
    summary: "新中式私家庭院设计，含水景、植物配置和休闲区。",
    category: "园林SU模型 / 庭院景观",
    action: "下载", date: "2026-05-09", views: "278",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 72 MB",
  },
  {
    title: "SU-15 城市公园广场景观",
    summary: "城市公园景观设计，含广场铺装、绿化带和水景喷泉。",
    category: "园林SU模型 / 公园广场",
    action: "下载", date: "2026-05-08", views: "195",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 110 MB",
  },
  {
    title: "SU-14 景观廊架设计",
    summary: "现代景观廊架和花架组合，适合公园和商业景观使用。",
    category: "园林SU模型 / 亭廊花架",
    action: "详图", date: "2026-05-07", views: "143",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "SKP / 28 MB",
  },
  // D5模型
  {
    title: "D5素材 - 现代沙发组合",
    summary: "D5现代沙发家具组合，含茶几和装饰摆件配套。",
    category: "D5模型 / D5家具",
    action: "下载", date: "2026-05-06", views: "1.8K",
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "D5 / 45 MB",
  },
  {
    title: "D5素材 - 中式吊灯合集",
    summary: "中式风格吊灯D5模型合集，适合中式空间搭配。",
    category: "D5模型 / D5电器",
    action: "下载", date: "2026-05-05", views: "1.2K",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "D5 / 32 MB",
  },
  {
    title: "D5素材 - 装饰花瓶摆件",
    summary: "陶瓷花瓶和装饰摆件D5模型组，适配各种室内场景。",
    category: "D5模型 / D5摆件",
    action: "下载", date: "2026-05-04", views: "890",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "D5 / 18 MB",
  },
];

// ── 软件插件分类树 ──

export const softwareCategories: ModelCategory[] = [
  { id: "sw-all", name: "全部软件", slug: "all", count: 128 },
  {
    id: "sw-sketchup",
    name: "SketchUp",
    slug: "sketchup",
    count: 35,
    children: [
      { id: "sw-su-install", name: "安装包", slug: "su-install", count: 18 },
      { id: "sw-su-plugin", name: "插件合集", slug: "su-plugin", count: 12 },
      { id: "sw-su-template", name: "模板/快捷键", slug: "su-template", count: 5 },
    ],
  },
  {
    id: "sw-render",
    name: "渲染器",
    slug: "render",
    count: 42,
    children: [
      { id: "sw-enscape", name: "Enscape", slug: "enscape", count: 12 },
      { id: "sw-vray", name: "V-Ray", slug: "vray", count: 10 },
      { id: "sw-lumion", name: "Lumion", slug: "lumion", count: 8 },
      { id: "sw-d5-sw", name: "D5 Render", slug: "d5-sw", count: 7 },
      { id: "sw-corona", name: "Corona", slug: "corona", count: 5 },
    ],
  },
  {
    id: "sw-cad",
    name: "CAD / 施工图",
    slug: "cad",
    count: 28,
    children: [
      { id: "sw-autocad", name: "AutoCAD", slug: "autocad", count: 14 },
      { id: "sw-tArch", name: "天正建筑", slug: "tarch", count: 8 },
      { id: "sw-cad-plugin", name: "CAD插件", slug: "cad-plugin", count: 6 },
    ],
  },
  {
    id: "sw-other",
    name: "其他工具",
    slug: "other",
    count: 23,
    children: [
      { id: "sw-photoshop", name: "Photoshop", slug: "photoshop", count: 7 },
      { id: "sw-rhino-sw", name: "Rhino", slug: "rhino-sw", count: 6 },
      { id: "sw-c4d-sw", name: "C4D", slug: "c4d-sw", count: 5 },
      { id: "sw-utility", name: "辅助工具", slug: "utility", count: 5 },
    ],
  },
];

export const allSoftwareItems: ResourceItem[] = [
  // SketchUp
  {
    title: "SketchUp 2026 安装包",
    summary: "SU2026 最新版安装包，含学习补丁和安装教程。",
    category: "SketchUp / 安装包",
    action: "下载", date: "2026-05-15", views: "2.8K",
    image: "https://www.xuedda.com/uploads/images/20230524/a81b815356521566ec00dcb69a3622ea.jpg",
    href: "https://xuedda.com/index/download/index/category_id/222.html", meta: "Windows / 2.1 GB",
  },
  {
    title: "SU插件合集（薛大大版）",
    summary: "精选常用SU插件一键安装包，适合新装环境快速配置。",
    category: "SketchUp / 插件合集",
    action: "下载", date: "2026-03-02", views: "3.2K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=82",
    href: "https://xuedda.com/index/download/index/category_id/222.html", meta: "插件 / 150 MB",
  },
  {
    title: "SU快捷键模板（薛大大定制）",
    summary: "高效快捷键配置文件，适配建筑和室内设计工作流。",
    category: "SketchUp / 模板/快捷键",
    action: "下载", date: "2026-02-18", views: "1.5K",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "配置文件 / 2 MB",
  },
  // 渲染器
  {
    title: "Enscape 4.1 渲染器",
    summary: "Enscape 最新版，支持SU/Revit/Rhino实时渲染。",
    category: "渲染器 / Enscape",
    action: "下载", date: "2026-04-20", views: "3.5K",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 580 MB",
  },
  {
    title: "V-Ray 7 for SketchUp",
    summary: "V-Ray 7 SU版，支持GPU+CPU混合渲染。",
    category: "渲染器 / V-Ray",
    action: "下载", date: "2026-04-15", views: "2.1K",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 1.8 GB",
  },
  {
    title: "Lumion 2026 学习版",
    summary: "Lumion 最新版建筑可视化软件，含中文补丁。",
    category: "渲染器 / Lumion",
    action: "下载", date: "2026-04-10", views: "4.2K",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 22 GB",
  },
  {
    title: "D5 Render 2.9 中文版",
    summary: "D5实时渲染器，支持SU/3dsMax/Rhino/Revit联动。",
    category: "渲染器 / D5 Render",
    action: "下载", date: "2026-04-05", views: "5.1K",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 1.2 GB",
  },
  // CAD
  {
    title: "AutoCAD 2026 中文版",
    summary: "AutoCAD 最新版，含注册机和安装教程。",
    category: "CAD / 施工图 / AutoCAD",
    action: "下载", date: "2026-03-28", views: "2.6K",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 2.8 GB",
  },
  {
    title: "天正建筑 T20 V10",
    summary: "天正建筑最新版，支持AutoCAD 2024-2026平台。",
    category: "CAD / 施工图 / 天正建筑",
    action: "下载", date: "2026-03-15", views: "1.9K",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 890 MB",
  },
  // 其他工具
  {
    title: "Photoshop 2026 中文版",
    summary: "PS 2026 最新版，适合效果图后期处理。",
    category: "其他工具 / Photoshop",
    action: "下载", date: "2026-04-01", views: "4.8K",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 3.5 GB",
  },
  {
    title: "Rhino 8 中文版",
    summary: "Rhino 8 最新版，含Grasshopper参数化设计工具。",
    category: "其他工具 / Rhino",
    action: "下载", date: "2026-03-20", views: "1.8K",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "Windows / 620 MB",
  },
];

// ── 设计素材分类树 ──

export const materialCategories: ModelCategory[] = [
  { id: "mat-all", name: "全部素材", slug: "all", count: 586 },
  {
    id: "mat-pbr",
    name: "PBR贴图",
    slug: "pbr",
    count: 185,
    children: [
      { id: "mat-pbr-wall", name: "墙面贴图", slug: "pbr-wall", count: 52 },
      { id: "mat-pbr-floor", name: "地面贴图", slug: "pbr-floor", count: 45 },
      { id: "mat-pbr-wood", name: "木纹贴图", slug: "pbr-wood", count: 38 },
      { id: "mat-pbr-metal", name: "金属贴图", slug: "pbr-metal", count: 28 },
      { id: "mat-pbr-fabric", name: "布料贴图", slug: "pbr-fabric", count: 22 },
    ],
  },
  {
    id: "mat-hdr",
    name: "HDR环境贴图",
    slug: "hdr",
    count: 128,
    children: [
      { id: "mat-hdr-outdoor", name: "室外环境", slug: "hdr-outdoor", count: 56 },
      { id: "mat-hdr-indoor", name: "室内环境", slug: "hdr-indoor", count: 38 },
      { id: "mat-hdr-studio", name: "影棚灯光", slug: "hdr-studio", count: 22 },
      { id: "mat-hdr-sky", name: "天空背景", slug: "hdr-sky", count: 12 },
    ],
  },
  {
    id: "mat-d5-material",
    name: "D5材质库",
    slug: "d5-material",
    count: 156,
    children: [
      { id: "mat-d5-surface", name: "表面材质", slug: "d5-surface", count: 62 },
      { id: "mat-d5-background", name: "环境背景", slug: "d5-background", count: 35 },
      { id: "mat-d5-particle", name: "粒子素材", slug: "d5-particle", count: 28 },
      { id: "mat-d5-model", name: "模型素材", slug: "d5-model", count: 31 },
    ],
  },
  {
    id: "mat-ies",
    name: "IES灯光",
    slug: "ies",
    count: 72,
    children: [
      { id: "mat-ies-spot", name: "射灯光源", slug: "ies-spot", count: 25 },
      { id: "mat-ies-down", name: "筒灯光源", slug: "ies-down", count: 20 },
      { id: "mat-ies-linear", name: "线型光源", slug: "ies-linear", count: 15 },
      { id: "mat-ies-other", name: "其他光源", slug: "ies-other", count: 12 },
    ],
  },
  {
    id: "mat-post",
    name: "后期素材",
    slug: "post",
    count: 45,
    children: [
      { id: "mat-post-psd", name: "PSD后期文件", slug: "post-psd", count: 18 },
      { id: "mat-post-png", name: "PNG免抠素材", slug: "post-png", count: 15 },
      { id: "mat-post-brush", name: "笔刷/样式", slug: "post-brush", count: 12 },
    ],
  },
];

export const allMaterialItems: ResourceItem[] = [
  // PBR贴图
  {
    title: "10组高端墙面PBR贴图",
    summary: "4K高清墙面PBR贴图，含Diffuse/Normal/Roughness/Displacement通道。",
    category: "PBR贴图 / 墙面贴图",
    action: "下载", date: "2026-05-12", views: "2.3K",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "4K / 360 MB",
  },
  {
    title: "15款木地板PBR贴图合集",
    summary: "实木、复合地板PBR贴图，适配家居和商业空间渲染。",
    category: "PBR贴图 / 地面贴图",
    action: "下载", date: "2026-05-08", views: "1.8K",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "4K / 480 MB",
  },
  {
    title: "20组天然木纹PBR贴图",
    summary: "橡木、胡桃木、樱桃木等天然木纹贴图组合。",
    category: "PBR贴图 / 木纹贴图",
    action: "下载", date: "2026-05-05", views: "1.5K",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "4K / 620 MB",
  },
  // HDR
  {
    title: "HDR室外环境贴图 - 城市黄昏",
    summary: "城市黄昏HDR环境贴图，适合建筑外观渲染。",
    category: "HDR环境贴图 / 室外环境",
    action: "下载", date: "2026-05-10", views: "2.1K",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "8K HDR / 85 MB",
  },
  {
    title: "HDR室内影棚灯光套装",
    summary: "专业影棚灯光HDR，适合产品渲染和室内场景。",
    category: "HDR环境贴图 / 影棚灯光",
    action: "下载", date: "2026-05-03", views: "1.3K",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "4K HDR / 120 MB",
  },
  {
    title: "HDR天空背景合集 - 晴天系列",
    summary: "多种晴天天空HDR背景，含白云、蓝天渐变效果。",
    category: "HDR环境贴图 / 天空背景",
    action: "下载", date: "2026-04-28", views: "980",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "8K HDR / 68 MB",
  },
  // D5材质
  {
    title: "D5材质 - 现代大理石表面",
    summary: "D5高级大理石表面材质，含多种颜色和纹理变体。",
    category: "D5材质库 / 表面材质",
    action: "下载", date: "2026-05-01", views: "1.6K",
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "D5 / 95 MB",
  },
  {
    title: "D5素材 - 中式环绕背景",
    summary: "D5中式空间氛围背景素材，增强场景层次感。",
    category: "D5材质库 / 环境背景",
    action: "下载", date: "2026-04-25", views: "1.2K",
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "D5 / 45 MB",
  },
  // IES灯光
  {
    title: "50组IES射灯文件合集",
    summary: "专业IES射灯光域网文件，适配Enscape/V-Ray/D5。",
    category: "IES灯光 / 射灯光源",
    action: "下载", date: "2026-04-22", views: "2.8K",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "IES / 5 MB",
  },
  {
    title: "35组IES筒灯文件合集",
    summary: "常用筒灯光域网IES文件，覆盖多种光束角。",
    category: "IES灯光 / 筒灯光源",
    action: "下载", date: "2026-04-18", views: "1.9K",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "IES / 3 MB",
  },
  // 后期素材
  {
    title: "建筑效果图PSD后期模板",
    summary: "建筑效果图PSD后期源文件，含图层、调色和配景。",
    category: "后期素材 / PSD后期文件",
    action: "下载", date: "2026-04-15", views: "3.5K",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "PSD / 280 MB",
  },
  {
    title: "绿植配景PNG免抠素材",
    summary: "高清绿植、树木PNG免抠图，适合效果图后期合成。",
    category: "后期素材 / PNG免抠素材",
    action: "下载", date: "2026-04-10", views: "4.2K",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.xuedda.com/", meta: "PNG / 180 MB",
  },
];

// ── 设计服务 ──

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  cta: string;
};

export type JobItem = {
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  date: string;
  description: string;
};

export const serviceItems: ServiceItem[] = [
  {
    icon: "🎓",
    title: "设计咨询",
    description: "专业设计师一对一咨询服务，覆盖建筑、室内、景观三大领域。从方案构思到施工落地全程指导。",
    features: ["建筑方案咨询", "室内设计顾问", "景观规划建议", "材料选型指导", "施工图审核"],
    href: "/services/consulting",
    cta: "预约咨询",
  },
  {
    icon: "🎯",
    title: "项目合作",
    description: "承接各类建筑设计外包项目，提供从概念方案到施工图的全流程设计服务。",
    features: ["建筑方案设计", "室内深化设计", "效果图制作", "BIM建模", "施工图绘制"],
    href: "/services/project",
    cta: "了解详情",
  },
  {
    icon: "📐",
    title: "定制建模",
    description: "根据需求定制 SketchUp 模型、D5 场景，支持参数化建模和批量模型制作。",
    features: ["SU模型定制", "D5场景搭建", "参数化建模", "族库制作", "模型优化"],
    href: "/services/modeling",
    cta: "提交需求",
  },
  {
    icon: "🎬",
    title: "效果图渲染",
    description: "专业级建筑效果图和动画制作，支持 D5、V-Ray、Lumion、Enscape 多种渲染器。",
    features: ["静态效果图", "360全景图", "建筑动画", "VR漫游", "后期处理"],
    href: "/services/rendering",
    cta: "立即下单",
  },
  {
    icon: "📚",
    title: "企业培训",
    description: "为企业团队提供 SketchUp、D5 Render、Layout 等软件的系统培训课程。",
    features: ["SU基础培训", "D5渲染进阶", "Layout施工图", "BIM工作流", "定制课程"],
    href: "/services/training",
    cta: "咨询课程",
  },
];

export const jobListings: JobItem[] = [
  {
    title: "建筑设计师",
    department: "设计部",
    location: "远程办公",
    type: "全职",
    salary: "15K-25K",
    date: "2026-05-15",
    description: "负责建筑方案设计和深化，熟练使用SketchUp、AutoCAD，有3年以上工作经验。",
  },
  {
    title: "室内设计师",
    department: "设计部",
    location: "远程办公",
    type: "全职",
    salary: "12K-20K",
    date: "2026-05-12",
    description: "负责室内空间方案设计，精通SU、D5渲染，有商业空间设计经验优先。",
  },
  {
    title: "D5渲染师",
    department: "可视化部",
    location: "远程办公",
    type: "兼职/全职",
    salary: "10K-18K",
    date: "2026-05-10",
    description: "负责建筑效果图和动画制作，精通D5 Render，有建筑可视化作品集。",
  },
  {
    title: "SU建模师",
    department: "模型部",
    location: "远程办公",
    type: "兼职",
    salary: "8K-15K",
    date: "2026-05-08",
    description: "负责SketchUp模型制作，熟悉建筑、室内建模流程，效率高、细节把控好。",
  },
  {
    title: "平面设计师",
    department: "品牌部",
    location: "远程办公",
    type: "全职",
    salary: "10K-16K",
    date: "2026-05-05",
    description: "负责品牌视觉设计和宣传物料制作，精通PS、AI，有建筑行业经验优先。",
  },
];
