import { Link } from "react-router-dom";
import { images as assetImages } from "@/assets/image";

interface MadrasahHeroProps {
  name: string;
  images?: string[];
}

export function MadrasahHero({ name, images }: MadrasahHeroProps) {
  const defaultHero = assetImages.madrashaCoverPic;

  const resolvedImages: string[] =
    images
      ?.map((img) => {
        if (!img) return undefined;
        const key = img as keyof typeof assetImages;
        const src = assetImages[key] ?? img;
        return typeof src === "string" ? src : undefined;
      })
      .filter(
        (src): src is string => typeof src === "string" && src.trim().length > 0,
      ) ?? [];

  const firstValid = resolvedImages[0] ?? defaultHero;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)]">
      <img
        src={firstValid}
        alt={name}
        className="h-[340px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>

        <p className="mt-2 text-sm md:text-base">ইসলামী শিক্ষার আলোকবর্তিকা</p>

        <div className="mt-4 flex gap-3">
          <Link
            to="/admission"
            className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold"
          >
            ভর্তি তথ্য
          </Link>

          <Link
            to="/donation"
            className="rounded-md border border-white px-4 py-2 text-sm"
          >
            দান করুন
          </Link>
        </div>
      </div>
    </section>
  );
}
