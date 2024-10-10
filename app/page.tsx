"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { sportStore } from "@/stores/sport";
import { SportGame } from "@/interfaces";
import { FaBaseballBall, FaBasketballBall, FaFootballBall, FaHockeyPuck, FaTableTennis, FaVolleyballBall } from "react-icons/fa";
import SportGameCard from "@/components/sport/GameCard";
import SportGameFilter from "@/components/sport/GameFilter";
import BetModal from "@/components/bet/Modal";
import LoadingIndicator from "@/components/LoadingIndicator";

const sportGameFilters = [
  { title: "Football", Icon: FaFootballBall },
  { title: "Basketball", Icon: FaBasketballBall },
  { title: "Ice Hockey", Icon: FaHockeyPuck },
  { title: "Tennis", Icon: FaTableTennis },
  { title: "Volleyball", Icon: FaVolleyballBall },
  { title: "Baseball", Icon: FaBaseballBall },
  { title: "Rugby", Icon: FaFootballBall },
];

const Home: React.FC = observer(() => {
  const [activeSport, setActiveSport] = useState(sportGameFilters[0].title);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredGames = useMemo(() => sportStore.sports.filter((game) => game.sport === activeSport), [sportStore.sports, activeSport]);

  useEffect(() => {
    sportStore.getSports();
  }, []);

  const onSportFilterClick = useCallback((title: string) => {
    setActiveSport(title);
  }, []);

  const onBetClick = useCallback((game: SportGame) => {
    sportStore.setSelectedSport(game);
    setIsModalOpen(true);
  }, []);

  const closeBetModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-[var(--bg-main-body)] p-8 rounded">
      <title>Betting Dashboard - Sport Games</title>
      <h1 className="text-xl font-bold text-white">Betting Dashboard - Sport Games</h1>
      <div className="flex gap-1 overflow-x-auto">
        {sportGameFilters.map((filter) => (
          <SportGameFilter key={filter.title} title={filter.title} Icon={filter.Icon} isActive={filter.title === activeSport} onClick={() => onSportFilterClick(filter.title)} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {sportStore.isLoading ? (
          <LoadingIndicator />
        ) : filteredGames.length > 0 ? (
          filteredGames.map((game) => <SportGameCard key={game.id} {...game} onBetClick={() => onBetClick(game)} />)
        ) : (
          <p className="text-white">No games available for {activeSport}</p>
        )}
      </div>
      <BetModal isOpen={isModalOpen} onClose={closeBetModal} />
    </div>
  );
});

export default Home;
