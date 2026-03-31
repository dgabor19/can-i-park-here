'use client';

import { useState } from 'react';
import { Player } from '@/types';

interface AddPlayerModalProps {
  onClose: () => void;
  onPlayerAdded: (player: Player) => void;
}

export default function AddPlayerModal({ onClose, onPlayerAdded }: AddPlayerModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [successPlayer, setSuccessPlayer] = useState<Player | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/add-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessPlayer(data.player);
        onPlayerAdded(data.player);
      } else {
        setError(data.error ?? 'Something went wrong 😅');
      }
    } catch {
      setError('Could not connect. Try again!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-xl font-extrabold">➕ Add a New Player!</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {successPlayer ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="text-6xl">🎉</div>
              <p className="text-lg font-extrabold text-green-600">
                {successPlayer.name} was added!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {successPlayer.nationality} {successPlayer.position} born in {successPlayer.born}
              </p>
              <button
                onClick={onClose}
                className="rounded-full bg-green-400 hover:bg-green-500 text-white font-bold px-8 py-3 text-base transition-colors"
              >
                Awesome! ⚽
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tell me about a player and I'll add them to the list!
              </p>
              <textarea
                className="rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-yellow-400 outline-none p-4 text-sm resize-none transition-colors"
                rows={4}
                placeholder="For example: 'Add Pedri, he's Spanish, plays for Barcelona, he's a midfielder born in 2002 and he's known for his amazing passing'"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-extrabold px-6 py-3 text-base transition-colors"
              >
                {loading ? 'Adding player... ⏳' : 'Add Player ⚽'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
