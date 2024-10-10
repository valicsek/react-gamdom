import { makeAutoObservable } from "mobx";
import { Sport } from "@/interfaces";
import { sportService } from "@/services/sport";

class SportStore {
  selectedSport: Sport | null = null;
  sports: Sport[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getSports = async () => {
    this.setIsLoading(true);
    this.sports = await sportService.fetchSports();
    this.setIsLoading(false);
  };

  setSelectedSport = (sport: Sport) => {
    this.selectedSport = sport;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };
}

export const sportStore = new SportStore();
