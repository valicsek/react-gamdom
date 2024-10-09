import { makeAutoObservable } from "mobx";
import { Bet } from "@/interfaces/sport";

class BetStore {
  bets: Bet[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addBet = (bet: Bet) => {
    this.bets.push(bet);
  };

  removeBet = (bet: Bet) => {
    this.bets = this.bets.filter((b) => b.id !== bet.id);
  };

  updateBet = (bet: Bet) => {
    this.bets = this.bets.map((b) => (b.id === bet.id ? bet : b));
  };
}

export const betStore = new BetStore();
