import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, HandHeart, Menu } from "lucide-react";
import { NavbarBrand } from "./NavbarBrand";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import "./navbar.css";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const location = useLocation();
  return <header className="site-navbar">
    <div className="site-navbar-inner">
      <NavbarBrand />
      <nav aria-label="প্রধান নেভিগেশন" className="site-desktop-nav"><DesktopNavigation key={location.pathname} /></nav>
      <div className="site-navbar-actions"><Link className="site-donate-button" to="/donation" aria-label="দান করুন"><HandHeart size={18} /><span>দান করুন</span><ArrowUpRight size={16} /></Link><button type="button" className="site-menu-button mobile-menu-trigger" onClick={() => setIsOpen(true)} aria-label="মেনু খুলুন" aria-expanded={isOpen} aria-controls="mobile-navigation"><Menu /></button></div>
    </div>
    <MobileNavigation key={location.pathname} open={isOpen} onClose={close} />
  </header>;
}
