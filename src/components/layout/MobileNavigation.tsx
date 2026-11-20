import { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, HandHeart, X } from "lucide-react";
import { navigationGroups, primaryLinks } from "./navigationData";
import { NavbarBrand } from "./NavbarBrand";
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) onClose(); };
    media.addEventListener("change", resize);
    return () => { document.body.style.overflow = previous; media.removeEventListener("change", resize); };
  }, [open, onClose]);
  return <dialog ref={dialog} className="mobile-navigation" id="mobile-navigation" aria-labelledby="mobile-nav-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="mobile-nav-surface">
      <div className="mobile-nav-header"><NavbarBrand /><button type="button" className="site-menu-button" aria-label="মেনু বন্ধ করুন" onClick={onClose}><X /></button></div>
      <nav aria-label="মোবাইল নেভিগেশন"><p id="mobile-nav-title" className="mobile-nav-caption">আমাদের মসজিদ, আমাদের কমিউনিটি</p>
        <div className="mobile-primary-links">{primaryLinks.map(({ path, label, Icon }) => <NavLink end={path === "/"} key={path} to={path} onClick={onClose}><Icon size={20} />{label}<ArrowUpRight size={16} /></NavLink>)}</div>
        {navigationGroups.map(group => <details key={group.key} open className="mobile-nav-group"><summary>{group.label}<ChevronDown size={18} /></summary><div>{group.items.map(({ path, label, Icon }) => <NavLink key={path} to={path} onClick={onClose}><Icon size={18} />{label}</NavLink>)}</div></details>)}
        <Link className="site-donate-button mobile-donate" to="/donation" onClick={onClose}><HandHeart size={20} />আপনার সহযোগিতা দিন<ArrowUpRight size={18} /></Link>
      </nav>
    </div>
  </dialog>;
}
