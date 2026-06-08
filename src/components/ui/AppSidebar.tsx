"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles, Menu, X } from "lucide-react";
import { navigationConfig } from "@/config/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Auto-open sections based on current path
    const autoOpen: Record<string, boolean> = {};
    navigationConfig.forEach((section) => {
      if (section.collapsible) {
        if (section.items.some((item) => pathname?.startsWith(item.href))) {
          autoOpen[section.title] = true;
        }
      }
    });
    setOpenSections((prev) => ({ ...prev, ...autoOpen }));
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) =>
    mounted && pathname?.replace(/\/$/, "") === href;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 z-20 sticky top-0 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white w-4 h-4" />
          </div>
          <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-200 to-slate-400">
            ElectronicsTable
          </h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 w-72 bg-slate-950/95 backdrop-blur-xl flex flex-col h-full border-r border-slate-800/80 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.8)] z-50 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex md:shrink-0
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full hidden md:flex"}
      `}
      >
        <div className="p-6 flex items-center justify-between gap-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-200 to-slate-400">
              ElectronicsTable
            </h1>
          </div>
          <button
            className="md:hidden p-1 text-slate-400 hover:text-slate-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navigationConfig.map((section, idx) => {
            const SectionIcon = section.icon;
            const isCollapsible = section.collapsible;
            const isOpen = !isCollapsible || openSections[section.title];
            const isHighlighted = section.highlight;

            return (
              <div
                key={idx}
                className="flex flex-col animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {isCollapsible ? (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${
                      isHighlighted
                        ? "text-amber-500 hover:bg-amber-500/10"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <SectionIcon size={14} />
                      {section.title}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <h3
                    className={`flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-widest mb-1 ${
                      isHighlighted ? "text-amber-500" : "text-slate-400"
                    }`}
                  >
                    <SectionIcon size={14} />
                    {section.title}
                  </h3>
                )}

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
                >
                  <nav className="flex flex-col space-y-0.5 ml-4 pl-3 border-l-2 border-slate-800/50">
                    {section.items.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`group relative flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                            active
                              ? isHighlighted
                                ? "bg-amber-500/15 text-amber-500 shadow-[inset_2px_0_0_0_var(--color-amber-500)]"
                                : "bg-indigo-500/15 text-indigo-400 shadow-[inset_2px_0_0_0_var(--color-indigo-500)]"
                              : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
                          }`}
                        >
                          {link.label}
                          {active && (
                            <div
                              className={`absolute right-2 w-1.5 h-1.5 rounded-full animate-pulse ${isHighlighted ? "bg-amber-500" : "bg-indigo-500"}`}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
