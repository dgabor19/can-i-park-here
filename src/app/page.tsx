import { getPlayers } from '@/lib/players';
import { fetchPlayerPhoto } from '@/lib/sportsdb';
import HomeClient from '@/components/HomeClient';

export default async function Page() {
  const players = getPlayers();

  const playersWithPhotos = await Promise.all(
    players.map(async (player) => {
      if (player.photoUrl) return player;
      const photoUrl = await fetchPlayerPhoto(player.name);
      return photoUrl ? { ...player, photoUrl } : player;
    })
  );

  return <HomeClient initialPlayers={playersWithPhotos} />;
}
