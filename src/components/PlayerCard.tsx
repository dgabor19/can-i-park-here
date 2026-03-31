import { Player } from '@/types';

interface PlayerCardProps {
  player: Player;
  index: number;
}

const FLAG_EMOJIS: Record<string, string> = {
  Portuguese: '🇵🇹',
  Argentine: '🇦🇷',
  English: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  French: '🇫🇷',
  Brazilian: '🇧🇷',
  Norwegian: '🇳🇴',
  Spanish: '🇪🇸',
  German: '🇩🇪',
  Italian: '🇮🇹',
  Dutch: '🇳🇱',
};

const CARD_GRADIENTS = [
  'from-green-400 to-green-600',
  'from-blue-400 to-blue-600',
  'from-yellow-400 to-orange-500',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-rose-500',
  'from-teal-400 to-cyan-500',
];

const POSITION_COLORS: Record<string, string> = {
  Forward: 'bg-red-500',
  Midfielder: 'bg-blue-500',
  Defender: 'bg-green-600',
  Goalkeeper: 'bg-yellow-500',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function PlayerCard({ player, index }: PlayerCardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const flag = FLAG_EMOJIS[player.nationality] ?? '🌍';
  const positionColor = POSITION_COLORS[player.position] ?? 'bg-gray-500';
  const initials = getInitials(player.name);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
      <div className={`bg-gradient-to-br ${gradient} p-6 flex flex-col items-center`}>
        <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-white text-2xl font-extrabold shadow-inner mb-3">
          {initials}
        </div>
        <h2 className="text-white text-xl font-extrabold text-center leading-tight drop-shadow">
          {player.name}
        </h2>
        <p className="text-white/90 text-sm mt-1">{flag} {player.nationality}</p>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`${positionColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {player.position}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            ⚽ {player.club}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            Born {player.born}
          </span>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-400 rounded-xl p-3">
          <p className="text-yellow-900 text-sm font-medium leading-snug">
            ⭐ {player.funFact}
          </p>
        </div>
      </div>
    </div>
  );
}
