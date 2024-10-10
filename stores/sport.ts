import { makeAutoObservable } from "mobx";
import { SportGame } from "@/interfaces";
import { sportService } from "@/services/sport";

class SportStore {
  selectedSport: SportGame | null = null;
  sports: SportGame[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getSports = async () => {
    this.setIsLoading(true);
    this.sports = await sportService.fetchSports();
    this.setIsLoading(false);
  };

  setSelectedSport = (sport: SportGame) => {
    this.selectedSport = sport;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };
}

export const sportStore = new SportStore();
