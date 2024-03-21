export type Game = {
  id: number;
  home: number;
  homeName?: string;
  away: number;
  awayName?: string;
  homeScore: number;
  awayScore: number;
  date: string;
};

export type Team = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type GameCellProps = {
  data: {
    id: number;
    home: string | number;
    away: string | number;
    homeScore: number;
    awayScore: number;
    date: string;
  };
  expandable?: boolean;
};

export type ViewProps = {
  gameData?: {
    id: number;
    home: string | number;
    away: string | number;
    homeScore: number;
    awayScore: number;
    date: string;
  };
  teamData?: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  type: 'game' | 'team';
  expandable: boolean;
};