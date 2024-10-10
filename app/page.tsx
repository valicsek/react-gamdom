"use client";

import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { sportStore } from "@/stores/sport";
import { Sport } from "@/interfaces";
import { FaBaseballBall, FaBasketballBall, FaFootballBall, FaHockeyPuck, FaTableTennis, FaVolleyballBall } from "react-icons/fa";
import SportCard from "@/components/sport/card";
import SportFilter from "@/components/sport/filter";
import BetModal from "@/components/bet/Modal";
import LoadingIndicator from "@/components/LoadingIndicator";

const Home: React.FC = observer(() => {
  const [sportFilters, setSportFilters] = useState([
    {
      title: "Football",
      Icon: FaFootballBall,
      isActive: true,
    },
    {
      title: "Basketball",
      Icon: FaBasketballBall,
      isActive: false,
    },
    {
      title: "Ice Hockey",
      Icon: FaHockeyPuck,
      isActive: false,
    },
    {
      title: "Tennis",
      Icon: FaTableTennis,
      isActive: false,
    },
    {
      title: "Volleyball",
      Icon: FaVolleyballBall,
      isActive: false,
    },
    {
      title: "Baseball",
      Icon: FaBaseballBall,
      isActive: false,
    },
    {
      title: "Rugby",
      Icon: FaFootballBall,
      isActive: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeSport = useMemo(() => sportFilters.find((filter) => filter.isActive)?.title, [sportFilters]);
  const filteredGames = useMemo(() => sportStore.sports.filter((game) => game.sport === activeSport), [sportStore.sports, activeSport]);

  useEffect(() => {
    sportStore.getSports();
  }, []);

  const onSportFilterClick = (title: string) => {
    setSportFilters((prevFilters) => prevFilters.map((filter) => (filter.title === title ? { ...filter, isActive: true } : { ...filter, isActive: false })));
  };

  const onBetClick = (game: Sport) => {
    sportStore.setSelectedSport(game);
    setIsModalOpen(true);
  };

  const closeBetModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 bg-[var(--bg-main-body)] p-8 rounded">
      <title>Betting Dashboard - Sport Games</title>
      <h1 className="text-xl font-bold text-white">Betting Dashboard - Sport Games</h1>
      <div className="flex gap-1 overflow-x-auto">
        {sportFilters.map((sport) => (
          <SportFilter key={sport.title} title={sport.title} Icon={sport.Icon} isActive={sport.isActive} onClick={() => onSportFilterClick(sport.title)} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => <SportCard key={`${game.sport}-${index}`} {...game} onBetClick={() => onBetClick(game)} />)
        ) : (
          <>{sportStore.isLoading ? <LoadingIndicator /> : <p className="text-white">No games available for {activeSport}</p>}</>
        )}
      </div>
      <BetModal isOpen={isModalOpen} onClose={closeBetModal} />
    </div>
  );
});

export default Home;
