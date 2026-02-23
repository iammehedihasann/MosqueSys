import ProfileCard from "../components/ProfileCard";
import committeeData from "../data/committee.json";

type CommitteeMember = {
  name: string;
  role: string;
  phone: string;
  image: string;
};

export function Committee() {
  const { members, imamStaff } = committeeData as {
    members: CommitteeMember[];
    imamStaff: CommitteeMember[];
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            মসজিদ কমিটি
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Management Committee
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Imam & Staff Section */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 text-center">
            ইমাম ও কর্মকর্তা
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {imamStaff.map((person) => (
              <ProfileCard key={person.phone} {...person} />
            ))}
          </div>
        </section>

        {/* Committee Members */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 text-center">
            কমিটি সদস্যবৃন্দ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <ProfileCard key={member.phone} {...member} />
            ))}
          </div>
        </section>

        {/* Committee Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Responsibilities */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-primary mb-6 border-b pb-2">
              কমিটির দায়িত্ব
            </h3>

            <ul className="space-y-4 text-gray-700">
              {[
                "মসজিদের দৈনন্দিন পরিচালনা ও রক্ষণাবেক্ষণ",
                "আর্থিক ব্যবস্থাপনা ও স্বচ্ছতা নিশ্চিতকরণ",
                "ধর্মীয় ও সামাজিক কার্যক্রম আয়োজন",
                "সমস্যা সমাধান ও সিদ্ধান্ত গ্রহণ",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent text-lg mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meeting Schedule */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-primary mb-6 border-b pb-2">
              সভার সময়সূচী
            </h3>

            <div className="space-y-6 text-gray-700">
              <div>
                <p className="font-semibold">মাসিক সভা</p>
                <p className="text-sm text-gray-600">
                  প্রতি মাসের প্রথম শুক্রবার
                </p>
                <p className="text-sm text-gray-600">সময়: মাগরিবের পর</p>
              </div>

              <div>
                <p className="font-semibold">জরুরি সভা</p>
                <p className="text-sm text-gray-600">প্রয়োজন অনুযায়ী</p>
                <p className="text-sm text-gray-600">
                  আগাম নোটিশ প্রদান করা হয়
                </p>
              </div>

              <div>
                <p className="font-semibold">বার্ষিক সাধারণ সভা</p>
                <p className="text-sm text-gray-600">
                  প্রতি বছর জানুয়ারি মাসে
                </p>
                <p className="text-sm text-gray-600">
                  সকল মুসল্লির উপস্থিতি কাম্য
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="bg-primary text-white rounded-2xl shadow-xl p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            যোগাযোগ করুন
          </h3>

          <p className="mb-6 text-sm md:text-base text-gray-100">
            মসজিদ সংক্রান্ত যেকোনো বিষয়ে কমিটির সাথে যোগাযোগ করতে পারেন। আমরা
            সবসময় আপনার সেবায় নিয়োজিত।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-accent font-medium">সভাপতি</p>
              <p className="mt-1">আলহাজ্ব মোঃ আব্দুল করিম</p>
              <p>০১৭১২-১০০০০০</p>
            </div>

            <div>
              <p className="text-accent font-medium">সাধারণ সম্পাদক</p>
              <p className="mt-1">হাজী আব্দুর রহমান</p>
              <p>০১৭১২-১০০০০২</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
