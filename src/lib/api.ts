import { SportsDBPlayer } from "@/types";

const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

export async function searchPlayer(name: string): Promise<SportsDBPlayer | null> {
  try {
    const encoded = encodeURIComponent(name);
    const res = await fetch(`${BASE_URL}/searchplayers.php?p=${encoded}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.player || data.player.length === 0) return null;

    const footballPlayers: SportsDBPlayer[] = data.player.filter(
      (p: SportsDBPlayer) => p.strSport === "Soccer"
    );

    return footballPlayers[0] ?? data.player[0];
  } catch {
    return null;
  }
}

export async function searchPlayers(
  names: { id: string; searchName: string }[]
): Promise<Record<string, SportsDBPlayer | null>> {
  const results = await Promise.all(
    names.map(async ({ id, searchName }) => {
      const player = await searchPlayer(searchName);
      return { id, player };
    })
  );

  return Object.fromEntries(results.map(({ id, player }) => [id, player]));
}
