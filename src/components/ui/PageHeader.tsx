import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  color?: "primary" | "amber" | "green" | "purple" | "blue" | "default";
}

export function PageHeader({ title, description, icon: Icon, color = "primary" }: PageHeaderProps) {
  
  const colorMap = {
    primary: "from-primary to-purple-400 text-primary",
    amber: "from-amber-400 to-orange-500 text-amber-500",
    green: "from-emerald-400 to-cyan-500 text-emerald-500",
    purple: "from-purple-400 to-fuchsia-500 text-purple-500",
    blue: "from-blue-400 to-cyan-500 text-blue-500",
    default: "from-foreground to-muted-foreground text-foreground",
  };

  const gradientClass = colorMap[color];
  const iconColorClass = gradientClass.split(" ").pop(); // gets the text-xxx class

  return (
    <div className="mb-12 relative animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-background via-muted/20 to-background blur-2xl -z-10" />
      
      <div className="flex items-center gap-4 mb-4">
        {Icon && (
          <div className={`p-3 rounded-2xl bg-muted/30 border border-border/50 shadow-inner ${iconColorClass}`}>
            <Icon size={28} />
          </div>
        )}
        <h1 className={`text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`}>
          {title}
        </h1>
      </div>
      
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
      
      <div className="h-px w-full bg-gradient-to-r from-border/80 via-border/20 to-transparent mt-8" />
    </div>
  );
}
