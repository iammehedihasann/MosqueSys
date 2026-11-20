import { Church } from "lucide-react";
import { Link } from "react-router-dom";
export function NavbarBrand() {
  return <Link to="/" className="site-brand" aria-label="বাইতুল মামুর জামে মসজিদ — হোম">
    <span className="site-brand-mark"><Church aria-hidden="true" /></span>
    <span><strong>বাইতুল মামুর জামে মসজিদ</strong><small><span />সাগরদী, মাধবদী</small></span>
  </Link>;
}
