"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/site/footer";
import type { FooterDoc } from "@/lib/sanity";

interface FooterRouteVisibilityProps {
  content: FooterDoc;
}

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function FooterRouteVisibility({ content }: FooterRouteVisibilityProps) {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname !== "/") return null;

  return <Footer content={content} />;
}
