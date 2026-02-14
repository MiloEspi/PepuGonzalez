"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface SmoothScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function SmoothScrollLink({ href, className, children, onClick, ...props }: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (typeof window === "undefined") return;

    const targetUrl = new URL(href, window.location.href);
    if (!targetUrl.hash) return;

    const hashId = targetUrl.hash.replace("#", "");
    if (!hashId) return;

    const currentPath = normalizePath(window.location.pathname);
    const targetPath = normalizePath(targetUrl.pathname);

    if (currentPath !== targetPath) return;

    const targetNode = document.getElementById(hashId);
    if (!targetNode) return;

    event.preventDefault();
    targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${targetPath}#${hashId}`);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
