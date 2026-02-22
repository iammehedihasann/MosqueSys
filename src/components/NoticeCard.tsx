import { Calendar, Eye } from "lucide-react";

interface NoticeCardProps {
  title: string;
  date: string;
  description: string;
  category?: "general" | "ramadan" | "emergency";
  onViewDetails?: () => void;
}

export function NoticeCard({
  title,
  date,
  description,
  category = "general",
  onViewDetails,
}: NoticeCardProps) {
  const categoryColors = {
    general: "bg-blue-100 text-blue-800",
    ramadan: "bg-green-100 text-green-800",
    emergency: "bg-red-100 text-red-800",
  };

  const categoryLabels = {
    general: "সাধারণ",
    ramadan: "রমজান",
    emergency: "জরুরি",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-5 hover:shadow-lg transition-shadow border-l-4 border-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base md:text-lg text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${categoryColors[category]}`}
        >
          {categoryLabels[category]}
        </span>
      </div>
      <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>
      <button
        onClick={onViewDetails}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm md:text-base"
      >
        <Eye className="h-4 w-4" />
        <span>বিস্তারিত দেখুন</span>
      </button>
    </div>
  );
}
