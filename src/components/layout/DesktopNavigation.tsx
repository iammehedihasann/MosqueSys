import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { navigationGroups, primaryLinks } from "./navigationData";
export function DesktopNavigation() {
  const [open, setOpen] = useState<string | null>(null);
  const location = useLocation();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(null);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return <div ref={container} className="desktop-navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }} onKeyDown={(event) => { if (event.key === "Escape") { setOpen(null); trigger.current?.focus(); } }}>
    {primaryLinks.map(({ path, label }) => <NavLink end={path === "/"} key={path} to={path} className="site-nav-link">{label}</NavLink>)}
    {navigationGroups.map(group => {
      const active = group.items.some(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
      return <div className="site-nav-group" key={group.key}>
        <button type="button" className={`site-nav-link ${active ? "active" : ""}`} aria-expanded={open === group.key} aria-controls={`desktop-${group.key}`} onClick={(event) => { trigger.current = event.currentTarget; setOpen(open === group.key ? null : group.key); }}>{group.label}<ChevronDown className={open === group.key ? "is-open" : ""} size={15} /></button>
        {open === group.key && <div id={`desktop-${group.key}`} className="site-nav-dropdown"><p>{group.description}</p>{group.items.map(({ path, label, Icon }) => <NavLink key={path} to={path} onClick={() => setOpen(null)}><span><Icon size={18} aria-hidden="true" /></span>{label}<ArrowUpRight size={14} /></NavLink>)}</div>}
      </div>;
    })}
  </div>;
}
