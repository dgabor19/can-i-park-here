'use client';

import { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard';
import ChatBox from '@/components/ChatBox';
import AddPlayerModal from '@/components/AddPlayerModal';
import { Player } from '@/types';

interface HomeClientProps {
  initialPlayers: Player[];
}

export default function HomeClient({ initialPlayers }: HomeClientProps) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'true' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', String(next));
  }

  function handlePlayerAdded(player: Player) {
    setPlayers((prev) => [...prev, player]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-gradient-to-r from-green-400 to-green-500 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-3">
          <span className="text-4xl">⚽</span>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white leading-tight">
              Football Stars!
            </h1>
            <p className="text-green-100 text-sm">
              Learn about the greatest football players ever!
            </p>
          </div>
          <button
            onClick={toggleDark}
            className="rounded-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 text-sm font-bold transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10">
        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-3xl font-extrabold text-green-800 dark:text-green-300">
              ⚽ Football Stars!
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-extrabold px-6 py-3 text-base shadow transition-colors"
            >
              ➕ Add a Player
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {players.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>
        </section>

        <section>
          <ChatBox players={players} />
        </section>
      </div>

      <footer className="mt-10 py-6 text-center text-sm text-green-700 dark:text-green-400 font-medium">
        ⚽ Made with love for young football fans! ⚽
      </footer>

      {showModal && (
        <AddPlayerModal
          onClose={() => setShowModal(false)}
          onPlayerAdded={handlePlayerAdded}
        />
      )}
    </main>
  );
}
