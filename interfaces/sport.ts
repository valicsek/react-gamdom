export interface Team {
  id: number;
  name: string;
}

export interface Sport {
  id: number;
  sport: string;
  date: string;
  time: string;
  teams: Team[];
  odds: {
    team1: number;
    team2: number;
    draw: number;
  };
}

export interface Bet {
  id: number;
  teamId: number;
  amount: number;
  createdAt: Date;
}
