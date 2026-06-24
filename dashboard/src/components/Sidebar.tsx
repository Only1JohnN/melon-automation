"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Activity,
  Bug,
  BarChart3,
} from "lucide-react";

const links = [
  {
    name: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: FolderKanban,
  },
  {
    name: "Executions",
    href: "/executions",
    icon: Activity,
  },
  {
    name: "Failures",
    href: "/failures",
    icon: Bug,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen border-r border-slate-800 bg-[#020B22] flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🍉</span>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Melon
            </h1>

            <p className="text-sm text-slate-400">
              QA Bot
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-[#D6FF32] text-black font-semibold"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon size={20} />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-xs text-slate-500 tracking-wider">
            Made with ❤️ by{" "}
            <a
              href="https://www.google.com/search?q=Only1JohnN&sca_esv=17f1fe3018333faf&sxsrf=APpeQnu3oMxbTKO1EVSWZDIYCmc4hxbCww%3A1782324002545&ei=Ihs8ap_oIMmbhbIP6omg-Qk&ved=0ahUKEwifga-ouqCVAxXJTUEAHeoEKJ8Q4dUDCBI&uact=5&oq=Only1JohnN&gs_lp=Egxnd3Mtd2l6LXNlcnAiCk9ubHkxSm9obk4yBRAAGO8FMgUQABjvBTIFEAAY7wVI0R1QygZYvBtwAXgAkAEAmAHeAqABvhaqAQUyLTkuMrgBA8gBAPgBAZgCCaACyBDCAggQABiABBiwA8ICCRAAGAcYHhiwA8ICBxAAGB4YsAPCAgoQIxiABBiKBRgnwgIEECMYJ8ICERAuGIAEGIoFGJECGLEDGIMBwgILEAAYgAQYigUYkQLCAgoQLhiABBiKBRhDwgIOEC4YgAQYsQMYxwEY0QPCAgsQABiABBixAxiDAcICBRAAGIAEwgIIEAAYgAQYsQPCAgUQLhiABMICCBAuGIAEGLEDwgIZEC4YgAQYigUYQxiXBRjcBBjeBBjgBNgBAcICBxAAGIAEGAqYAwCIBgGQBgq6BgYIARABGBSSBwcxLjAuNy4xoAegUbIHBTItNy4xuAe-EMIHBzAuMy4yLjTIBzqACAE&sclient=gws-wiz-serp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6FF32] hover:underline"
            >
              Only1JohnN
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}