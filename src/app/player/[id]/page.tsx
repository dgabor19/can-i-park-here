import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCuratedPlayerById, curatedPlayers } from "@/data/players";
import { searchPlayer } from "@/lib/api";
import KidCard from "@/components/KidCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  return curatedPlayers.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;
  const curated = getCuratedPlayerById(id);

  if (!curated) {
    notFound();
  }

  const sportsdb = await searchPlayer(curated.searchName);

  const imageUrl =
    sportsdb?.strFanart1 ||
    sportsdb?.strThumb ||
    sportsdb?.strCutout ||
    null;
  const thumbUrl = sportsdb?.strThumb || sportsdb?.strCutout || null;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-400 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All players
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium truncate">
            {curated.name}
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Hero section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
          {imageUrl && (
            <div className="relative w-full h-48 sm:h-64 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden">
              <Image
                src={imageUrl}
                alt={curated.name}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-5 flex gap-4 items-start">
            {thumbUrl && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-400 shrink-0 -mt-10 bg-white shadow-md">
                <Image
                  src={thumbUrl}
                  alt={curated.name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                {curated.name}
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {curated.nationality}
                {sportsdb?.strTeam ? ` · ${sportsdb.strTeam}` : ""}
                {sportsdb?.strPosition ? ` · ${sportsdb.strPosition}` : ""}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="px-5 pb-5 grid grid-cols-3 gap-3">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                Kids
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {curated.kids.length}
              </p>
            </div>
            {sportsdb?.dateBorn && (
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Born
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {new Date(sportsdb.dateBorn).getFullYear()}
                </p>
              </div>
            )}
            {sportsdb?.strNumber && (
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Number
                </p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  #{sportsdb.strNumber}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {sportsdb?.strDescriptionEN && (
            <div className="px-5 pb-5">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-4">
                {sportsdb.strDescriptionEN}
              </p>
            </div>
          )}
        </div>

        {/* Kids section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Children
            </h2>
            {curated.kids.length > 0 && (
              <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                {curated.kids.length}
              </span>
            )}
          </div>

          {curated.kids.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center">
              <span className="text-4xl block mb-3">⚽</span>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                No children on record yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {curated.kids.map((kid, index) => (
                <KidCard key={kid.name} kid={kid} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
