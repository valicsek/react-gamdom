export interface Team {
  id: number;
  name: string;
}

export interface SportGame {
  id: number;
  sport: string;
  date: string;
  time: string;
  teams: [Team, Team];
  odds: {
    team1: number;
    team2: number;
    draw: number;
  };
}

export interface Bet {
  id: number;
  userId?: number;
  sportGameId: number;
  teamId: number;
  amount: number;
  createdAt: Date;
}
