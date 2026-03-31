'use client';

import { useState } from 'react';
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

  function handlePlayerAdded(player: Player) {
    setPlayers((prev) => [...prev, player]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-blue-50">
      <header className="bg-gradient-to-r from-green-400 to-green-500 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-3">
          <span className="text-4xl">⚽</span>
          <div>
            <h1 className="text-2xl font-extrabold text-white leading-tight">
              Football Stars!
            </h1>
            <p className="text-green-100 text-sm">
              Learn about the greatest football players ever!
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10">
        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-3xl font-extrabold text-green-800">
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

      <footer className="mt-10 py-6 text-center text-sm text-green-700 font-medium">
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
