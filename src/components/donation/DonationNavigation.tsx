import { HandHeart, Layers, Receipt, History } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/utils/scroll";
export function DonationNavigation() {
  return <nav className="donation-navigation" aria-label="দান ও হিসাব">
    <a className="selected" href="#give" onClick={(e) => { e.preventDefault(); scrollToSection("give"); }}><HandHeart />দান করুন</a>
    <a href="#categories" onClick={(e) => { e.preventDefault(); scrollToSection("categories"); }}><Layers />দানের কার্যক্রম</a>
    <Link to="/expenses"><Receipt />খরচের বিবরণ</Link>
    <Link to="/monthly-report"><History />দানের হিসাব</Link>
  </nav>;
}
