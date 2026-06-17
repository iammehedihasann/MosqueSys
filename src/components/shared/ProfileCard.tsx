import { Phone, User, Mail, Facebook } from "lucide-react";
import { images } from "@/assets/image";

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
    <div className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
  {/* Decorative Top Border */}
  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-300" />

  {/* Profile Image */}
  <div className="flex flex-col items-center text-center">
    <div className="relative">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-38 w-38 rounded-full border-4 border-emerald-50 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-emerald-50 bg-slate-100">
          <User className="h-10 w-10 text-slate-400" />
        </div>
      )}
      

     
      <div className="absolute -top-2 -right-6 translate-x-1/">
        <span className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-2 text-[14px] font-semibold text-white shadow-md">
          {role}
        </span>
      </div>
    </div>

    {/* Name */}
    <div className="mt-6">
      <h3 className="text-xl font-bold text-slate-900">
        {name}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        মসজিদের সম্মানিত স্টাফ
      </p>
    </div>
  </div>

  {/* Divider */}
  <div className="my-5 border-t border-slate-100" />

  {/* Contact */}
  <div className="space-y-3">
    <a
      href={`tel:${phone}`}
      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-lg font-medium text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white"
    >
      <Phone className="h-4 w-4" />
      {phone}
    </a>

    {(email || facebook) && (
      <div className="flex gap-3">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex-1 flex items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-slate-600 transition hover:bg-slate-900 hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-slate-600 transition hover:bg-blue-600 hover:text-white"
          >
            <Facebook className="h-4 w-4" />
          </a>
        )}
      </div>
    )}
  </div>
</div>
  );
}


