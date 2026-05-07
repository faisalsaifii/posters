"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink(props: Record<string, unknown>) {
  const { className, activeClassName, href, children, ...rest } = props;
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href as string}
      className={cn(
        className as string,
        isActive && (activeClassName as string)
      )}
      {...rest}
    >
      {children as React.ReactNode}
    </Link>
  );
}
