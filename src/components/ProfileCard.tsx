import { Phone, User, Mail, Facebook, ArrowUpRight } from "lucide-react";
import { images } from "../assets/image";

type ProfileCardProps = {
  name: string;
  role: string;
  phone: string;
  image: string;
  email?: string;
  facebook?: string;
};

export default function ProfileCard({
  name,
  role,
  phone,
  image,
  email,
  facebook,
}: ProfileCardProps) {
  const imageKey = image as keyof typeof images;
  const imageSrc = image && images[imageKey] ? images[imageKey] : image;

  return (
    <div className="group w-64 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* 1. Header Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="h-12 w-12 text-gray-300" />
          </div>
        )}

        {/* !!! NEW HIGHLIGHTED ROLE !!! */}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-400 text-gray-950 text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">
            {role}
          </span>
        </div>
      </div>

      {/* 2. Info Section */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight truncate">
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Contact Details</p>
        </div>

        {/* 3. Interactive Buttons */}
        <div className="space-y-2">
          {/* Main Action: Phone */}
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-between w-full px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
            <ArrowUpRight className="w-3 h-3 opacity-50" />
          </a>

          {/* Secondary Actions Row */}
          <div className="flex gap-2">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex-1 flex items-center justify-center p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-900 hover:text-white transition-all border border-gray-100"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
