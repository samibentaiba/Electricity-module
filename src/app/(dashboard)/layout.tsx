import { ReactNode } from "react";
import { AppSidebar } from "@/components/ui/AppSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden h-[calc(100vh)] bg-slate-950">
      <AppSidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-scroll bg-slate-900/50 backdrop-blur-3xl p-4 sm:p-6 md:p-8 lg:p-12 border-t md:border-t-0 md:border-l border-slate-800/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] scrollbar-none">
        <div className="max-w-6xl mx-auto w-full pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}
