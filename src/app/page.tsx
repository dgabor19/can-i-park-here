import { curatedPlayers } from "@/data/players";
import { searchPlayers } from "@/lib/api";
import PlayerCard from "@/components/PlayerCard";

export const revalidate = 3600;

export default async function Home() {
  const playerLookups = curatedPlayers.map((p) => ({
    id: p.id,
    searchName: p.searchName,
  }));

  const sportsdbData = await searchPlayers(playerLookups);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              Football Stars & Kids
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Meet the families behind the legends
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Famous Players
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            {curatedPlayers.length} legends and their families
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {curatedPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              curated={player}
              sportsdb={sportsdbData[player.id] ?? null}
            />
          ))}
        </div>
      </div>

      <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <p>Player data from TheSportsDB. Kids data curated manually.</p>
      </footer>
    </main>
  );
}
