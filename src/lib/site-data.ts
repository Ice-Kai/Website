export type NavItem = {
  label: string;
  href: string;
};

export type TopicItem = {
  label: string;
  href: string;
  tone: string;
};

export type ResourceAction = "下载" | "观看" | "详图";

export type ResourceItem = {
  title: string;
  summary: string;
  category: string;
  action: ResourceAction;
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

export type ModelCategory = {
  id: string;
  name: string;
  slug: string;
  count: number;
  children?: ModelCategory[];
};

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

export const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "公众号", href: "/official-account" },
  { label: "模型", href: "/models" },
  { label: "灯光和贴图", href: "/lighting" },
  { label: "软件和参数", href: "/software" },
  { label: "视频教程", href: "/videos" },
  { label: "其他相关", href: "/others" },
  { label: "AI生图", href: "/ai-image" },
];

export const heroSlides = [
  {
    title: "从入门到拟真，实战项目教学",
    subtitle: "D5 RENDER 全套教程",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=82",
    href: "/courses",
  },
  {
    title: "精选SU模型，项目直接可用",
    subtitle: "建筑 / 工装 / 家装 / 园林",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=82",
    href: "/models?type=su",
  },
  {
    title: "MAX模型专区，独立分类下载",
    subtitle: "3DS MAX MODEL LIBRARY",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82",
    href: "/models?type=max&category=max-model",
  },
  {
    title: "今日上新素材，贴图灯光持续补齐",
    subtitle: "PBR / HDR / IES / D5 MATERIAL",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=82",
    href: "/materials",
  },
];

export const heroFeatures = [
  { label: "系统化课程", icon: "📚" },
  { label: "案例实战", icon: "🎯" },
  { label: "素材配套", icon: "📦" },
  { label: "持续更新", icon: "♻" },
];

export const hotRecommendations: HotRecommendation[] = [
  { label: "D5 全套渲染教程", href: "/courses", badge: "HOT" },
  { label: "SU 模型精选", href: "/models", badge: "NEW" },
  { label: "MAX 模型栏目", href: "/models?type=max&category=max-model", badge: "NEW" },
  { label: "Layout 施工图教程", href: "/courses?tab=layout" },
  { label: "AI 生图 0.15 元/次", href: "/ai-image" },
];

export const rollingNotices = [
  { label: "D5教程", text: "室内灯光全流程今日更新", href: "/courses" },
  { label: "今日上新素材", text: "PBR贴图、HDR环境陆续补齐", href: "/materials" },
  { label: "MAX模型", text: "新增 3ds Max 模型独立分类", href: "/models?type=max&category=max-model" },
  { label: "AI生图", text: "效果图灵感生成 0.15 元/次", href: "/ai-image" },
];

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

export const suModelItems: ResourceItem[] = [
  {
    title: "SU-25 现代别墅建筑设计",
    summary: "两层现代风格别墅，含庭院景观和室内基础布局，适合建筑方案表现。",
    category: "建筑SU模型 / 住宅建筑",
    action: "下载",
    date: "2026-05-18",
    views: "156",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=82",
    href: "/models",
    meta: "SKP / 85 MB",
  },
  {
    title: "SU-24 商业综合体外观",
    summary: "大型商业综合体建筑外观模型，包含幕墙细节和周边场地。",
    category: "建筑SU模型 / 商业建筑",
    action: "下载",
    date: "2026-05-17",
    views: "203",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=82",
    href: "/models",
    meta: "SKP / 120 MB",
  },
  {
    title: "SU-23 文化展览馆设计",
    summary: "现代文化展览馆建筑方案，包含室内展厅布局和外观造型。",
    category: "建筑SU模型 / 文化建筑",
    action: "详图",
    date: "2026-05-16",
    views: "178",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
    href: "/models",
    meta: "SKP / 95 MB",
  },
  {
    title: "SU-22 现代办公空间设计",
    summary: "开放式办公空间，含工位区、会议室和休闲区完整布局。",
    category: "工装SU模型 / 办公空间",
    action: "下载",
    date: "2026-05-15",
    views: "132",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",
    href: "/models",
    meta: "SKP / 76 MB",
  },
  {
    title: "SU-21 庭院景观廊架",
    summary: "庭院景观廊架与植物小品组合，适合园林节点表达。",
    category: "园林SU模型 / 庭院景观",
    action: "下载",
    date: "2026-05-14",
    views: "89",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=82",
    href: "/models",
    meta: "SKP / 42 MB",
  },
];

export const d5CourseItems: ResourceItem[] = [
  {
    title: "D5室内渲染全流程实战",
    summary: "从模型导入到最终出图，完整讲解室内场景渲染工作流。",
    category: "D5教程 / 室内",
    action: "观看",
    date: "2026-04-20",
    views: "2.1K",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82",
    href: "/courses",
    meta: "12课时",
  },
  {
    title: "D5建筑外观表现技法",
    summary: "建筑日景、夜景、阴天多场景渲染流程，强化材质和灯光控制。",
    category: "D5教程 / 建筑",
    action: "观看",
    date: "2026-04-18",
    views: "1.8K",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=900&q=82",
    href: "/courses",
    meta: "10课时",
  },
  {
    title: "D5景观与园林渲染",
    summary: "植物配置、水景、地形与氛围表达的景观渲染专题。",
    category: "D5教程 / 景观",
    action: "观看",
    date: "2026-04-15",
    views: "1.5K",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=82",
    href: "/courses",
    meta: "8课时",
  },
  {
    title: "D5动画与漫游制作",
    summary: "镜头动画、路径漫游和剪辑输出全流程教学。",
    category: "D5教程 / 动画",
    action: "观看",
    date: "2026-04-10",
    views: "1.2K",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=900&q=82",
    href: "/courses",
    meta: "6课时",
  },
];

const materialItems: ResourceItem[] = [
  {
    title: "10组高端墙面PBR贴图",
    summary: "4K高清墙面PBR贴图，包含 Diffuse、Normal、Roughness 等通道。",
    category: "PBR贴图 / 墙面贴图",
    action: "下载",
    date: "2026-05-12",
    views: "2.3K",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "4K / 360 MB",
  },
  {
    title: "HDR室外环境贴图 - 城市黄昏",
    summary: "城市黄昏HDR环境贴图，适合建筑外观和景观场景渲染。",
    category: "HDR环境贴图 / 室外环境",
    action: "下载",
    date: "2026-05-10",
    views: "2.1K",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "8K HDR / 85 MB",
  },
  {
    title: "D5材质 - 现代大理石表面",
    summary: "D5高级大理石材质，含多种颜色和纹理变体。",
    category: "D5材质库 / 表面材质",
    action: "下载",
    date: "2026-05-01",
    views: "1.6K",
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "D5 / 95 MB",
  },
  {
    title: "50组IES射灯文件合集",
    summary: "专业IES射灯光域网文件，适配 Enscape、V-Ray、D5。",
    category: "IES灯光 / 射灯光源",
    action: "下载",
    date: "2026-04-22",
    views: "2.8K",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "IES / 5 MB",
  },
];

const softwareItems: ResourceItem[] = [
  {
    title: "SketchUp 2026 安装包",
    summary: "SU2026 最新安装包，含安装说明和常用环境配置建议。",
    category: "SketchUp / 安装包",
    action: "下载",
    date: "2026-05-15",
    views: "2.8K",
    image: "https://www.xuedda.com/uploads/images/20230524/a81b815356521566ec00dcb69a3622ea.jpg",
    href: "/software",
    meta: "Windows / 2.1 GB",
  },
  {
    title: "SU插件合集（薛大大版）",
    summary: "精选常用SU插件一键安装包，适合新装环境快速配置。",
    category: "SketchUp / 插件合集",
    action: "下载",
    date: "2026-03-02",
    views: "3.2K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=82",
    href: "/software",
    meta: "插件 / 150 MB",
  },
  {
    title: "Enscape 4.1 渲染器",
    summary: "Enscape 实时渲染器，支持 SU、Revit、Rhino 等平台。",
    category: "渲染器 / Enscape",
    action: "下载",
    date: "2026-04-20",
    views: "3.5K",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=82",
    href: "/software",
    meta: "Windows / 580 MB",
  },
  {
    title: "D5 Render 2.9 中文版",
    summary: "D5实时渲染器，支持 SU、3ds Max、Rhino、Revit 联动。",
    category: "渲染器 / D5 Render",
    action: "下载",
    date: "2026-04-05",
    views: "5.1K",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=900&q=82",
    href: "/software",
    meta: "Windows / 1.2 GB",
  },
];

export const sections: SectionData[] = [
  {
    id: "su-models",
    eyebrow: "SU MODEL",
    title: "SU模型精选",
    description: "建筑、工装、家装、园林与D5模型统一展示，保留下载与详图双动作。",
    href: "/models",
    items: suModelItems,
  },
  {
    id: "d5-courses",
    eyebrow: "D5 COURSE",
    title: "D5渲染教程",
    description: "D5 全套渲染教程，从界面设置到项目表现系统学习。",
    href: "/courses",
    items: d5CourseItems,
  },
  {
    id: "materials",
    eyebrow: "MATERIAL",
    title: "设计素材库",
    description: "PBR、HDR、D5材质、IES灯光和后期贴图集中呈现。",
    href: "/materials",
    items: materialItems,
  },
  {
    id: "software",
    eyebrow: "SOFTWARE",
    title: "软件插件",
    description: "软件安装包、渲染器、插件、快捷键模板和效率工具的新版入口。",
    href: "/software",
    items: softwareItems,
  },
];

export const spotlightResources = sections.flatMap((section) => section.items);

export const allMaterialItems: ResourceItem[] = [
  ...materialItems,
  {
    title: "15款木地板PBR贴图合集",
    summary: "实木、复合地板PBR贴图，适配家居和商业空间渲染。",
    category: "PBR贴图 / 地面贴图",
    action: "下载",
    date: "2026-05-08",
    views: "1.8K",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "4K / 480 MB",
  },
  {
    title: "建筑效果图PSD后期模板",
    summary: "建筑效果图PSD后期源文件，包含图层、调色和配景。",
    category: "后期素材 / PSD后期文件",
    action: "下载",
    date: "2026-04-15",
    views: "3.5K",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=82",
    href: "/materials",
    meta: "PSD / 280 MB",
  },
];

export const allSoftwareItems: ResourceItem[] = [
  ...softwareItems,
  {
    title: "V-Ray 7 for SketchUp",
    summary: "V-Ray 7 SU版，支持GPU与CPU混合渲染。",
    category: "渲染器 / V-Ray",
    action: "下载",
    date: "2026-04-15",
    views: "2.1K",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=900&q=82",
    href: "/software",
    meta: "Windows / 1.8 GB",
  },
  {
    title: "AutoCAD 2026 中文版",
    summary: "AutoCAD 最新版，含安装教程和常用插件说明。",
    category: "CAD / AutoCAD",
    action: "下载",
    date: "2026-03-28",
    views: "2.6K",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=82",
    href: "/software",
    meta: "Windows / 2.8 GB",
  },
];

export const modelCategories: ModelCategory[] = [
  { id: "all", name: "全部模型", slug: "all", count: 3280 },
  {
    id: "architecture",
    name: "建筑SU模型",
    slug: "architecture",
    count: 860,
    children: [
      { id: "arch-residential", name: "住宅建筑", slug: "arch-residential", count: 230 },
      { id: "arch-commercial", name: "商业建筑", slug: "arch-commercial", count: 185 },
      { id: "arch-cultural", name: "文化建筑", slug: "arch-cultural", count: 142 },
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
      { id: "comm-retail", name: "商业店铺", slug: "comm-retail", count: 148 },
    ],
  },
  {
    id: "residential",
    name: "家装SU模型",
    slug: "residential",
    count: 650,
    children: [
      { id: "resi-living", name: "客餐厅", slug: "resi-living", count: 185 },
      { id: "resi-bedroom", name: "卧室空间", slug: "resi-bedroom", count: 156 },
      { id: "resi-study", name: "书房空间", slug: "resi-study", count: 88 },
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
    ],
  },
  {
    id: "d5-model",
    name: "D5模型",
    slug: "d5-model",
    count: 470,
    children: [
      { id: "d5-furniture", name: "D5家具", slug: "d5-furniture", count: 186 },
      { id: "d5-decoration", name: "D5摆件", slug: "d5-decoration", count: 112 },
    ],
  },
  {
    id: "max-model",
    name: "全部MAX模型",
    slug: "max-model",
    count: 520,
  },
  {
    id: "max-interior",
    name: "室内MAX模型",
    slug: "max-interior",
    count: 210,
    children: [
      { id: "max-living", name: "客餐厅MAX", slug: "max-living", count: 72 },
      { id: "max-bedroom", name: "卧室MAX", slug: "max-bedroom", count: 58 },
      { id: "max-commercial-interior", name: "工装空间MAX", slug: "max-commercial-interior", count: 80 },
    ],
  },
  {
    id: "max-architecture",
    name: "建筑MAX模型",
    slug: "max-architecture",
    count: 168,
    children: [
      { id: "max-residential-building", name: "住宅建筑MAX", slug: "max-residential-building", count: 64 },
      { id: "max-commercial-building", name: "商业建筑MAX", slug: "max-commercial-building", count: 56 },
      { id: "max-public-building", name: "公共建筑MAX", slug: "max-public-building", count: 48 },
    ],
  },
  {
    id: "max-landscape",
    name: "景观MAX模型",
    slug: "max-landscape",
    count: 142,
    children: [
      { id: "max-garden", name: "庭院景观MAX", slug: "max-garden", count: 52 },
      { id: "max-park", name: "公园广场MAX", slug: "max-park", count: 47 },
      { id: "max-plants", name: "植物小品MAX", slug: "max-plants", count: 43 },
    ],
  },
  {
    id: "max-furniture",
    name: "家具摆件MAX",
    slug: "max-furniture",
    count: 156,
    children: [
      { id: "max-sofa-chair", name: "沙发椅子MAX", slug: "max-sofa-chair", count: 62 },
      { id: "max-table-cabinet", name: "桌柜组合MAX", slug: "max-table-cabinet", count: 51 },
      { id: "max-decoration", name: "装饰摆件MAX", slug: "max-decoration", count: 43 },
    ],
  },
];

export const materialCategories: ModelCategory[] = [
  { id: "mat-all", name: "全部素材", slug: "all", count: 586 },
  { id: "mat-pbr", name: "PBR贴图", slug: "pbr", count: 185 },
  { id: "mat-hdr", name: "HDR环境贴图", slug: "hdr", count: 128 },
  { id: "mat-d5", name: "D5材质库", slug: "d5-material", count: 156 },
  { id: "mat-ies", name: "IES灯光", slug: "ies", count: 72 },
  { id: "mat-post", name: "后期素材", slug: "post", count: 45 },
];

export const softwareCategories: ModelCategory[] = [
  { id: "sw-all", name: "全部软件", slug: "all", count: 128 },
  { id: "sw-sketchup", name: "SketchUp", slug: "sketchup", count: 35 },
  { id: "sw-render", name: "渲染器", slug: "render", count: 42 },
  { id: "sw-cad", name: "CAD / 施工图", slug: "cad", count: 28 },
  { id: "sw-other", name: "其他工具", slug: "other", count: 23 },
];

export const adminQueues: AdminQueueItem[] = [
  { label: "待发布内容", value: "18", hint: "模型、教程、软件更新统一走内容审核" },
  { label: "待补下载链接", value: "9", hint: "记录网盘、密码、文件大小和权限" },
  { label: "AI生图订单", value: "126", hint: "记录生成次数、支付状态和图片任务" },
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

export const serviceItems: ServiceItem[] = [
  {
    icon: "🎯",
    title: "设计咨询",
    description: "建筑、室内、景观方案咨询，从构思到落地提供专业建议。",
    features: ["方案咨询", "材料建议", "图纸审阅", "表达优化"],
    href: "/services/consulting",
    cta: "预约咨询",
  },
  {
    icon: "📐",
    title: "定制建模",
    description: "根据项目需求定制 SketchUp 模型和 D5 场景。",
    features: ["SU模型定制", "D5场景搭建", "族库制作", "模型优化"],
    href: "/services/modeling",
    cta: "提交需求",
  },
  {
    icon: "🎬",
    title: "效果图渲染",
    description: "提供建筑效果图、室内表现、动画漫游和后期处理。",
    features: ["静态效果图", "360全景", "建筑动画", "后期处理"],
    href: "/services/rendering",
    cta: "立即下单",
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
    description: "负责建筑方案设计和深化，熟练使用 SketchUp、AutoCAD，有项目经验优先。",
  },
  {
    title: "D5渲染师",
    department: "可视化部",
    location: "远程办公",
    type: "全职/兼职",
    salary: "10K-18K",
    date: "2026-05-10",
    description: "负责建筑效果图和动画制作，熟悉 D5 Render，有完整作品集。",
  },
];
