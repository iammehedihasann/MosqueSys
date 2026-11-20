import { BookOpen, Church, Users } from "lucide-react";
import { images } from "@/assets/image";
const values = [
  {
    Icon: Church,
    title: "মসজিদ উন্নয়ন",
    text: "নির্মাণ, সংস্কার ও রক্ষণাবেক্ষণ",
  },
  {
    Icon: BookOpen,
    title: "ইসলামি শিক্ষা",
    text: "কুরআন, মক্তব ও দ্বীনি শিক্ষা",
  },
  { Icon: Users, title: "সামাজিক সেবা", text: "গরিব, অসহায় ও মানবিক সহায়তা" },
];
export function DonationHero({ onGive }: { onGive: () => void }) {
  return (
    <header className="donation-hero">
      <img
        src={images.mosqueCover}
        alt="আমাদের মসজিদ"
        className="donation-hero-photo"
        width={1024}
        height={768}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="donation-hero-content">
        <h1>
          <button type="button" onClick={onGive}>
            দান করুন
          </button>
        </h1>
        <p className="donation-hero-intro">
          মসজিদের উন্নয়ন, পরিচালনা ও সেবামূলক কার্যক্রমে
          <br />
          আপনার সহযোগিতা দিন।
        </p>
        <figure>
          <blockquote>
            “যে ব্যক্তি আল্লাহর পথে ব্যয় করে, তাকে সাতশত গুণ পর্যন্ত বৃদ্ধি করা
            হয়”
          </blockquote>
          <figcaption>— সূরা বাকারা (২:২৬১)</figcaption>
        </figure>
        <div className="donation-values">
          {values.map(({ Icon, title, text }) => (
            <div key={title}>
              <span>
                <Icon size={25} />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
