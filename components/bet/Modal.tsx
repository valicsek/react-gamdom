import { useEffect, useState } from "react";
import { betStore } from "@/stores/bet";
import { Team } from "@/interfaces";
import { sportStore } from "@/stores/sport";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetModal: React.FC<BetModalProps> = ({ isOpen, onClose }) => {
  const [selectedBetTeam, setSelectedBetTeam] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (sportStore.selectedSport) setTeams(sportStore.selectedSport.teams);
  }, [sportStore.selectedSport]);

  useEffect(() => {
    if (teams.length) {
      setTeamOptions(teams.map((team) => ({ label: team.name, value: team.id })));
      setSelectedBetTeam(teams[0].id);
    }
  }, [teams]);

  const onPlaceBet = () => {
    if (!betAmount || !selectedBetTeam || !sportStore.selectedSport) return;

    betStore.addBet({
      sportGameId: sportStore.selectedSport.id,
      teamId: selectedBetTeam,
      id: Date.now(),
      amount: betAmount,
      createdAt: new Date(),
    });

    setBetAmount(null);
    onClose();
  };

  const handleBetAmountChange = (value: string | number) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setBetAmount(numValue);
    }
  };

  const handleTeamSelect = (value: string | number) => {
    setSelectedBetTeam(Number(value));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Betting Modal">
      <Input type="select" options={teamOptions} placeholder="Select team" value={selectedBetTeam} onChange={handleTeamSelect} />
      <Input type="number" placeholder="Bet amount" prefix="$" value={betAmount} onChange={handleBetAmountChange} />
      <div slot="footer" className="flex flex-row gap-4">
        <Button className="w-full" variant="primary" onClick={onPlaceBet} disabled={!betAmount || !selectedBetTeam}>
          Place Bet
        </Button>
        <Button className="w-full" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default BetModal;
