import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";
import { PrayerTimes } from "./pages/PrayerTimes";
import { NoticePage } from "./pages/Notices";
import { Donation } from "./pages/Donation";
import { Committee } from "./pages/Committee";
import { Services } from "./pages/Services";
// import { Gallery } from "./pages/Gallery"
import { ContactPage } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { GalleryPage } from "./pages/Gallery";
import { Community } from "./pages/Community";
import { Emergency } from "./pages/Emergency";
import { CommunityPlaceDetails } from "./pages/CommunityPlaceDetails";
import { EmergencyDetails } from "./pages/EmergencyDetails";
import { Events } from "./pages/Events";
import { EventDetails } from "./pages/EventDetails";
import { ServiceDetails } from "./pages/ServiceDetails";
import { Charity } from "./pages/Charity";
import { CharityDetails } from "./pages/CharityDetails";

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
      { path: "services/:id", element: <ServiceDetails /> },
      { path: "community", element: <Community /> },
      { path: "community/places/:id", element: <CommunityPlaceDetails /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "emergency", element: <Emergency /> },
      { path: "emergency/:id", element: <EmergencyDetails /> },
      { path: "charity", element: <Charity /> },
      { path: "charity/:id", element: <CharityDetails /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
