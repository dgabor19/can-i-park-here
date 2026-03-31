import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Player } from '@/types';

const filePath = path.join(process.cwd(), 'src/data/players.json');

export function getPlayers(): Player[] {
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Player[];
}

export function addPlayer(player: Player): void {
  const players = getPlayers();
  players.push(player);
  writeFileSync(filePath, JSON.stringify(players, null, 2), 'utf-8');
}
