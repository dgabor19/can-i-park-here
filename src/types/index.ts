export interface Player {
  id: string;
  name: string;
  nationality: string;
  club: string;
  position: string;
  born: number;
  funFact: string;
  photoUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
