import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { PrayerTimes } from "./pages/PrayerTimes";
import { NoticePage } from "./pages/Notices";
import { Donation } from "./pages/Donation";
import { Committee } from "./pages/Committee";
import { Services } from "./pages/Services";
// import { Gallery } from './pages/Gallery'
import { ContactPage } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { GalleryPage } from "./pages/Gallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "prayer-times", element: <PrayerTimes /> },
      { path: "notices", element: <NoticePage /> },
      { path: "donation", element: <Donation /> },
      { path: "committee", element: <Committee /> },
      { path: "services", element: <Services /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
