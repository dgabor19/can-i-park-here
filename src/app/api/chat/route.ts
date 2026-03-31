import { NextRequest } from 'next/server';
import { ChatMessage, Player } from '@/types';

function getMockResponse(userMessage: string, players: Player[]): string {
  const msg = userMessage.toLowerCase();

  // Helper to find a player by name mention
  const findPlayer = () =>
    players.find((p) => msg.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()) ||
      msg.includes(p.name.toLowerCase()));

  // Best player / GOAT
  if (msg.includes('best') || msg.includes('greatest') || msg.includes('goat')) {
    return "That's a tough one! ⚽ Many fans say Lionel Messi and Cristiano Ronaldo are the two greatest of all time. Messi won the World Cup in 2022 🏆 and Ronaldo has scored over 800 career goals! Who do YOU think is the best? 😄";
  }

  // How many goals
  if (msg.includes('goal') && (msg.includes('how many') || msg.includes('scored') || msg.includes('score'))) {
    const player = findPlayer();
    if (player?.id === 'ronaldo') return "Cristiano Ronaldo has scored over 800 career goals! ⚽⚽⚽ That's more than most teams score in their entire history!";
    if (player?.id === 'messi') return "Lionel Messi has scored over 800 career goals too! 🌟 He's also won 4 Champions League titles and the 2022 World Cup!";
    if (player?.id === 'haaland') return "Erling Haaland scored 36 Premier League goals in just his first season at Manchester City! 🔥 That's a record!";
    return "Football players score lots of goals! ⚽ Ronaldo and Messi have both scored over 800 in their careers — that's incredible! 🌟";
  }

  // Age / how old
  if (msg.includes('how old') || msg.includes('age') || msg.includes('born')) {
    const player = findPlayer();
    if (player) {
      const age = new Date().getFullYear() - player.born;
      return `${player.name} was born in ${player.born}, so they are ${age} years old! 🎂 ${player.funFact}`;
    }
    return "Different players are different ages! ⚽ Haaland is one of the youngest stars — he was born in 2000! Mbappé was born in 1998 and is already a World Cup winner! 🏆";
  }

  // Where does X play / club
  if (msg.includes('play') || msg.includes('club') || msg.includes('team')) {
    const player = findPlayer();
    if (player) {
      return `${player.name} plays for ${player.club}! ⚽ Did you know: ${player.funFact} 🌟`;
    }
    return "There are so many great clubs! ⚽ Haaland plays for Manchester City, Mbappé plays for Real Madrid, and Messi plays for Inter Miami! Which club is YOUR favourite? 😄";
  }

  // Nationality / country
  if (msg.includes('country') || msg.includes('nationality') || msg.includes('from') || msg.includes('where')) {
    const player = findPlayer();
    if (player) {
      return `${player.name} is ${player.nationality}! 🌍 ${player.funFact}`;
    }
    return "Our players come from all over the world! 🌍 We have players from Portugal, Argentina, France, Brazil, Norway, and England! Football is truly a global sport! ⚽";
  }

  // Fun fact about a specific player
  const namedPlayer = findPlayer();
  if (namedPlayer) {
    return `Here's something cool about ${namedPlayer.name}! 🌟 ${namedPlayer.funFact} They play as a ${namedPlayer.position} for ${namedPlayer.club} and are ${namedPlayer.nationality}! ⚽`;
  }

  // World Cup
  if (msg.includes('world cup')) {
    return "The FIFA World Cup is the biggest football tournament in the world! 🏆 It happens every 4 years. Messi won it with Argentina in 2022, Mbappé won it with France in 2018, and Zidane won it with France back in 1998! ⭐";
  }

  // Who is the fastest
  if (msg.includes('fast') || msg.includes('speed') || msg.includes('quick')) {
    return "Kylian Mbappé is one of the fastest players in the world — he can run nearly 40 km/h! 💨 Neymar is also super quick and is famous for his amazing dribbling! ⚽";
  }

  // Tricks / skills
  if (msg.includes('trick') || msg.includes('skill') || msg.includes('dribble')) {
    return "Ronaldinho was known for the most amazing tricks ever! 🤩 He could do rainbow flicks and no-look passes that left defenders totally confused! Neymar is also brilliant at dribbling! ⚽✨";
  }

  // Free kicks
  if (msg.includes('free kick')) {
    return "David Beckham was legendary for his free kicks — he could bend the ball like magic! 🪄 Roberto Carlos scored one of the most famous free kicks ever in 1997 where the ball curved around the whole wall! ⚽😮";
  }

  // How many players in the list
  if (msg.includes('how many') && (msg.includes('player') || msg.includes('know'))) {
    return `I know about ${players.length} football stars right now! ⚽ You can ask me about any of them, or add new players using the ➕ button! 🌟`;
  }

  // Hello / hi
  if (msg.match(/^(hi|hello|hey|hiya|sup)/)) {
    return "Hey there, football fan! ⚽ I'm so excited to chat with you! Ask me anything about our football stars — like who's the best, how old they are, or where they play! 🌟";
  }

  // Default fallback
  return `Great question! ⚽ I know about ${players.length} amazing football players! Try asking me about Messi, Ronaldo, Haaland, Mbappé, or any of our stars! You can ask things like "How old is Messi?" or "Where does Haaland play?" 😄🌟`;
}

// Simulates streaming by sending the response word by word
async function* streamWords(text: string) {
  const words = text.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise((r) => setTimeout(r, 40));
  }
}

export async function POST(req: NextRequest) {
  const { messages, players }: { messages: ChatMessage[]; players: Player[] } = await req.json();

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  const responseText = getMockResponse(lastUserMessage?.content ?? '', players);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of streamWords(responseText)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(readable);
}
