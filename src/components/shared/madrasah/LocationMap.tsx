interface LocationMapProps {
  mapUrl?: string;
}

export function LocationMap({ mapUrl }: LocationMapProps) {
  if (!mapUrl) return null;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold">অবস্থান</h2>

      <iframe
        src={mapUrl}
        className="h-64 w-full rounded-md border"
        loading="lazy"
      />
    </section>
  );
}
