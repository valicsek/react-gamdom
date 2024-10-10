import { Bet } from "@/interfaces";

class BetService {
  private bets: Bet[] = [];

  async fetchBets(): Promise<Bet[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bets);
      }, 250);
    });
  }

  async createBet(bet: Bet): Promise<Bet> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.bets.push(bet);
        resolve(bet);
      }, 250);
    });
  }

  async deleteBet(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.bets = this.bets.filter((bet) => bet.id !== id);
        resolve();
      }, 250);
    });
  }
}

export const betService = new BetService();
