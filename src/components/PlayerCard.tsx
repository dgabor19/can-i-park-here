import Image from "next/image";
import Link from "next/link";
import { CuratedPlayer, SportsDBPlayer } from "@/types";

interface PlayerCardProps {
  curated: CuratedPlayer;
  sportsdb: SportsDBPlayer | null;
}

const FLAG_EMOJIS: Record<string, string> = {
  Portugal: "🇵🇹",
  Argentina: "🇦🇷",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  France: "🇫🇷",
  Brazil: "🇧🇷",
};

export default function PlayerCard({ curated, sportsdb }: PlayerCardProps) {
  const imageUrl = sportsdb?.strThumb || sportsdb?.strCutout || null;
  const club = sportsdb?.strTeam ?? "Retired";
  const flag = FLAG_EMOJIS[curated.nationality] ?? "";
  const kidCount = curated.kids.length;

  return (
    <Link
      href={`/player/${curated.id}`}
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-500 transition-all duration-200"
    >
      <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-green-50 to-green-100 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={curated.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">⚽</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {kidCount === 0
            ? "No kids"
            : `${kidCount} kid${kidCount !== 1 ? "s" : ""}`}
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-50 leading-tight truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {curated.name}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 truncate">
          {flag} {curated.nationality}
        </p>
        {club && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
            {club}
          </p>
        )}
      </div>
    </Link>
  );
}
