import { SportGame } from "@/interfaces";
import { SPORT_MOCK } from "@/utils/sport.mock";

class SportService {
  async fetchSports(): Promise<SportGame[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SPORT_MOCK);
      }, 1000);
    });
  }
}

export const sportService = new SportService();
