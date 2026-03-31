import { getPlayers } from '@/lib/players';
import HomeClient from '@/components/HomeClient';

export default function Page() {
  const players = getPlayers();
  return <HomeClient initialPlayers={players} />;
}
