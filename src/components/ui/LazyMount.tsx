"use client";

import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyMountProps {
  children: React.ReactNode;
  minHeight?: string | number;
  unmountOnLeave?: boolean;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export function LazyMount({
  children,
  minHeight = "400px",
  unmountOnLeave = false,
  rootMargin = "200px", // pre-load before it comes exactly into view
  fallback,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: !unmountOnLeave,
    rootMargin,
  });

  const isVisible = !!entry?.isIntersecting;
  const [hasRendered, setHasRendered] = useState(false);

  if (isVisible && !hasRendered) {
    setHasRendered(true);
  } else if (!isVisible && unmountOnLeave && hasRendered) {
    setHasRendered(false);
  }

  return (
    <div ref={ref} style={{ minHeight }} className="w-full h-full transition-opacity duration-500 relative">
      {hasRendered ? (
        children
      ) : (
        fallback || <Skeleton className="w-full h-full absolute inset-0 rounded-2xl" />
      )}
    </div>
  );
}
