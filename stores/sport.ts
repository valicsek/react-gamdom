import { makeAutoObservable } from "mobx";
import { Sport } from "@/interfaces";
import { SPORT_MOCK } from "@/utils/sport.mock";

class SportStore {
  selectedSport: Sport | null = null;
  sports: Sport[] = SPORT_MOCK;

  constructor() {
    makeAutoObservable(this);
  }

  addSport = (sport: Sport) => {
    this.sports.push(sport);
  };

  removeSport = (sport: Sport) => {
    this.sports = this.sports.filter((s) => s.sport !== sport.sport);
  };

  updateSport = (sport: Sport) => {
    this.sports = this.sports.map((s) => (s.sport === sport.sport ? sport : s));
  };

  setSelectedSport = (sport: Sport) => {
    this.selectedSport = sport;
  };
}

export const sportStore = new SportStore();
