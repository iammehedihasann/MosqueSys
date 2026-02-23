import { Phone, User } from "lucide-react";

type ProfileCardProps = {
  name: string;
  role: string;
  phone: string;
  image: string;
};

export default function ProfileCard({
  name,
  role,
  phone,
  image,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 md:p-6 hover:shadow-lg transition-shadow text-center">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="h-10 w-10 md:h-12 md:w-12 text-gray-400" />
        )}
      </div>
      <h3 className="text-base md:text-lg text-gray-900 mb-1">{name}</h3>
      <p className="text-sm md:text-base text-primary mb-3">{role}</p>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </a>
      )}
    </div>
  );
}
