import Link from "next/link";
import { ArrowLeft, MessageCircle, QrCode } from "lucide-react";

export default function OfficialAccountPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-[min(960px,calc(100vw-28px))] py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-cyan-600">
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid gap-0 md:grid-cols-[1fr_320px]">
            <div className="p-8 sm:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 ring-1 ring-cyan-100">
                <MessageCircle className="h-3.5 w-3.5" />
                公众号链接
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                薛大大公众号
              </h1>
              <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-500">
                这里用于承接公众号内容。后续可以放公众号二维码、历史文章链接、更新通知和社群入口。
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["课程更新", "模型上新", "设计素材"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-black text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid place-items-center bg-gradient-to-br from-cyan-50 to-amber-50 p-8">
              <div className="grid h-52 w-52 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white text-center shadow-sm">
                <div>
                  <QrCode className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-3 text-sm font-black text-slate-700">公众号二维码占位</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">待补正式图片</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
