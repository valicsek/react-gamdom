import { makeAutoObservable } from "mobx";
import { Bet } from "@/interfaces";
import { betService } from "@/services/bet";

class BetStore {
  bets: Bet[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getBets = async () => {
    this.bets = await betService.fetchBets();
  };

  addBet = async (bet: Bet) => {
    const newBet = await betService.createBet(bet);
    this.bets.push(newBet);
  };

  removeBet = async (bet: Bet) => {
    await betService.deleteBet(bet.id);
    this.bets = this.bets.filter((b) => b.id !== bet.id);
  };

  getBetsCountForGame(gameId: number, teamId: number) {
    return this.bets.filter((bet) => bet.sportGameId === gameId && bet.teamId === teamId).length;
  }
}

export const betStore = new BetStore();
