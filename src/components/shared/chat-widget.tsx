"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send, X } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showWechat, setShowWechat] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          open ? "rotate-90 bg-slate-800" : "bg-gradient-to-br from-cyan-500 to-blue-600"
        }`}
        aria-label="在线客服"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && <span className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500 ring-2 ring-white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-4 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20"><MessageCircle className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-black">薛大大在线客服</p>
              <p className="text-xs font-medium text-white/70">工作日 9:00 - 18:00</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="ml-auto grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10" aria-label="关闭">
              <X className="h-4 w-4" />
            </button>
          </div>

          {showWechat ? (
            <div className="p-5 text-center">
              <div className="relative rounded-xl border border-slate-200 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/customer-wechat-qr.png" alt="客服企业微信二维码" className="mx-auto h-auto w-full" />
                <button type="button" onClick={() => setShowWechat(false)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-600 shadow" aria-label="关闭二维码">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm font-black text-slate-700">扫码添加客服企业微信</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 p-5">
              <button type="button" onClick={() => setShowWechat(true)} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-600"><MessageCircle className="h-5 w-5" /></span>
                <span className="text-xs font-bold text-slate-700">客服微信</span>
                <span className="text-[10px] font-semibold text-slate-400">点击查看二维码</span>
              </button>
              <a href="mailto:Belongstokk@protonmail.com" className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-600"><Mail className="h-5 w-5" /></span>
                <span className="text-xs font-bold text-slate-700">发送邮件</span>
                <span className="break-all text-[10px] font-semibold text-slate-400">Belongstokk@protonmail.com</span>
              </a>
            </div>
          )}

          <div className="border-t border-slate-100 px-5 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
              <input placeholder="输入你的问题..." className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400" />
              <button type="button" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan-500 text-white hover:bg-cyan-600" aria-label="发送">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />客服在线</span>
              <a href="mailto:Belongstokk@protonmail.com" className="inline-flex items-center gap-1 text-cyan-600 hover:underline"><Mail className="h-3 w-3" />联系邮箱</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
