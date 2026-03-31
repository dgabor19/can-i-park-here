export async function fetchPlayerPhoto(name: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const player = data?.player?.[0];
    return player?.strThumb || player?.strCutout || player?.strRender || null;
  } catch {
    return null;
  }
}
