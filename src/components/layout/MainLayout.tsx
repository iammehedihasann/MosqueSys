import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { InfoMarquee } from "./InfoMarquee";
import { Footer } from "./Footer";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
      <InfoMarquee />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

