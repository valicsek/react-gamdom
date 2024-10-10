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
}

export const betStore = new BetStore();
