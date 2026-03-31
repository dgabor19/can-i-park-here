import { NextRequest, NextResponse } from 'next/server';
import { addPlayer } from '@/lib/players';
import { Player } from '@/types';

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parsePlayerFromText(text: string): Player | null {
  // Require at least a name — look for a capitalised word sequence at the start or after "add"
  const nameMatch = text.match(/(?:add\s+)?([A-Z][a-zÀ-ÿ]+(?:\s+[A-Z][a-zÀ-ÿ\.]+){1,3})/);
  if (!nameMatch) return null;
  const name = nameMatch[1].trim();

  // Birth year: 4-digit number between 1940 and current year
  const yearMatch = text.match(/\b(19[4-9]\d|20[0-2]\d)\b/);
  const born = yearMatch ? parseInt(yearMatch[1]) : 2000;

  // Club: after "plays for", "at", "from" (followed by a capitalised name)
  const clubMatch = text.match(/(?:plays? for|at|from|club[:\s]+)\s+([A-Z][A-Za-zÀ-ÿ\s]+?)(?=[,.]|$|\sand\s|\she\s|\bborn\b)/i);
  const club = clubMatch ? clubMatch[1].trim() : 'Unknown Club';

  // Nationality: after "is", "he's", "she's" (adjective/nationality)
  const natMatch = text.match(/(?:\bis\b|\bhe'?s\b|\bshe'?s\b)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\b/);
  // Filter out position words
  const positionWords = ['forward', 'midfielder', 'defender', 'goalkeeper', 'winger', 'striker', 'playmaker'];
  let nationality = 'Unknown';
  if (natMatch) {
    const candidate = natMatch[1].trim();
    if (!positionWords.includes(candidate.toLowerCase())) {
      nationality = candidate;
    }
  }

  // Position
  const positionMap: Record<string, string> = {
    forward: 'Forward', striker: 'Forward', winger: 'Forward',
    midfielder: 'Midfielder', playmaker: 'Midfielder',
    defender: 'Defender', 'centre-back': 'Defender', fullback: 'Defender',
    goalkeeper: 'Goalkeeper',
  };
  let position = 'Forward';
  for (const [keyword, pos] of Object.entries(positionMap)) {
    if (text.toLowerCase().includes(keyword)) {
      position = pos;
      break;
    }
  }

  // Fun fact: sentence containing "known for", "famous for", or "he/she scored/won"
  const factMatch = text.match(/(?:known for|famous for|he (?:scored|won|is)|she (?:scored|won|is))([^.!?]+[.!?]?)/i);
  const funFact = factMatch
    ? factMatch[0].trim()
    : `${name} is an amazing ${position.toLowerCase()}!`;

  return {
    id: slugify(name),
    name,
    nationality,
    club,
    position,
    born,
    funFact,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { text }: { text: string } = await req.json();

    if (!text || text.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Please tell me more about the player!' });
    }

    const player = parsePlayerFromText(text);

    if (!player) {
      return NextResponse.json({
        success: false,
        error: "I couldn't figure out the player's name. Try something like: 'Add Pedri, he's Spanish, plays for Barcelona, midfielder born in 2002'",
      });
    }

    addPlayer(player);

    return NextResponse.json({ success: true, player });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message });
  }
}
