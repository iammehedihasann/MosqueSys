import { useState } from "react";
import { Search } from "lucide-react";
import { NoticeCard } from "../components/NoticeCard";
import noticesData from "../data/notices.json";

const notices = noticesData.notices.map((n) => ({
  ...n,
  category: n.category as "ramadan" | "general" | "emergency",
}));
export function NoticePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || notice.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl text-primary mb-4">
            নোটিশ বোর্ড
          </h1>
          <p className="text-base md:text-lg text-gray-600">Notice Board</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="নোটিশ খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="all">সব নোটিশ</option>
              <option value="general">সাধারণ</option>
              <option value="ramadan">রমজান</option>
              <option value="emergency">জরুরি</option>
            </select>
          </div>
        </div>

        {/* Notices List */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.map((notice, index) => (
              <NoticeCard key={index} {...notice} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">কোন নোটিশ পাওয়া যায়নি</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg text-blue-900 mb-2">নোটিশ সম্পর্কে</h3>
          <p className="text-gray-700 text-sm md:text-base">
            মসজিদের সকল গুরুত্বপূর্ণ তথ্য ও ঘোষণা এখানে প্রকাশ করা হয়। নিয়মিত
            ভিজিট করে আপডেট জানুন। যেকোনো জরুরি বিষয়ে সরাসরি মসজিদ কমিটির সাথে
            যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
