export interface Kid {
  name: string;
  birthYear?: number;
  note?: string;
}

export interface CuratedPlayer {
  id: string;
  name: string;
  searchName: string;
  nationality: string;
  kids: Kid[];
}

export interface SportsDBPlayer {
  idPlayer: string;
  strPlayer: string;
  strTeam: string;
  strNationality: string;
  strPosition: string;
  strThumb: string;
  strCutout: string;
  strDescriptionEN: string;
  strBirthLocation: string;
  dateBorn: string;
  strNumber: string;
  strHeight: string;
  strWeight: string;
  strSport: string;
  strFanart1?: string;
  strBanner?: string;
}

export interface PlayerWithKids {
  curated: CuratedPlayer;
  sportsdb: SportsDBPlayer | null;
}
