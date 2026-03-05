import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Landmark,
  Users,
  TrendingUp,
  Check,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { bankPariSplitsMock } from "../data/mockData";
import { joinSplit } from "../utils/api";
import SplitEventList from "../components/sports/SplitEventList";
import CountdownTimer from "../components/sports/CountdownTimer";
import ShareSplitDrawer from "../components/sports/ShareSplitDrawer";

export default function SplitDetailPage() {
  const { splitId } = useParams();
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const split = bankPariSplitsMock.find((s) => s.id === splitId);

  if (!split) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16 bg-dark-surface border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">Split sa a pa egziste.</p>
          <button
            onClick={() => navigate("/bank-pari")}
            className="mt-4 text-gold text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            Retounen nan Paryaj Klasik
          </button>
        </div>
      </div>
    );
  }

  const isCreator = split.creatorName === "@ClicBoss";
  const isParticipant =
    split.participants.some((p) => p.username === "@ClicBoss") || joined;
  const slotsLeft = split.maxPlayers - split.currentPlayers;
  const potentialPayout = Math.round(split.playerEntryFee * split.totalOdds);
  const canJoin =
    split.status === "open" && !isCreator && !isParticipant && slotsLeft > 0;

  // Creator P&L for completed splits
  const allEventsWon = split.events.every((e) => e.result === "win");
  const anyEventLost = split.events.some((e) => e.result === "lose");
  const creatorProfit = anyEventLost
    ? Math.round(split.currentPlayers * split.playerEntryFee * 0.9)
    : 0;
  const creatorLoss = allEventsWon ? split.currentPlayers * potentialPayout : 0;

  async function handleJoin() {
    setJoining(true);
    try {
      await joinSplit(split.id);
      updateBalance(
        user?.availableBalance - split.playerEntryFee,
        user?.escrowedBalance + split.playerEntryFee,
      );
      setJoined(true);
    } catch {
      // API error
    }
    setJoining(false);
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/bank-pari")}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={16} /> Retounen nan Paryaj Klasik
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Landmark size={24} className="text-gold" />
          Detay Split
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {isCreator
            ? "Ou se Bankè nan split sa a."
            : "Wè detay split sa a epi antre si ou vle."}
        </p>
      </div>

      {/* Role badge */}
      {isCreator && (
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 flex items-center gap-2">
          <Shield size={16} className="text-gold" />
          <span className="text-gold font-bold text-sm">Ou se Bankè</span>
        </div>
      )}

      {isParticipant && !isCreator && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-3 flex items-center gap-2">
          <Check size={16} className="text-success" />
          <span className="text-success font-bold text-sm">
            Ou nan split sa a!
          </span>
        </div>
      )}

      {/* Split overview card */}
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-5 space-y-4">
        {/* Creator + status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="text-gold text-sm font-bold">
                {split.creatorInitials}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                {split.creatorName}
              </p>
              <p className="text-gray-500 text-xs">Bankè</p>
            </div>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              split.status === "open"
                ? "bg-success/20 text-success"
                : split.status === "live"
                  ? "bg-warning/20 text-warning"
                  : split.status === "completed"
                    ? "bg-white/10 text-gray-400"
                    : "bg-white/10 text-gray-400"
            }`}
          >
            {split.status === "open"
              ? "Ouvri"
              : split.status === "live"
                ? "Live"
                : split.status === "completed"
                  ? "Fini"
                  : split.status}
          </span>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <p className="text-gray-500 text-xs">Kòt Total</p>
            <p className="text-gold font-bold text-lg">
              {split.totalOdds.toFixed(2)}x
            </p>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <p className="text-gray-500 text-xs">Antre</p>
            <p className="text-white font-bold text-lg">
              {(split.playerEntryFee / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <p className="text-gray-500 text-xs">Jwè</p>
            <p className="text-white font-bold text-lg">
              {split.currentPlayers}/{split.maxPlayers}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div
              className="bg-gold rounded-full h-2 transition-all"
              style={{
                width: `${Math.round((split.currentPlayers / split.maxPlayers) * 100)}%`,
              }}
            />
          </div>
          {split.status === "open" && slotsLeft > 0 && (
            <p className="text-gray-500 text-xs mt-1">{slotsLeft} plas rete</p>
          )}
        </div>
      </div>

      {/* Potential payout */}
      <div className="bg-gold/5 border border-gold/10 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-gold" />
          <h3 className="text-gold font-semibold text-sm">
            Gen Potansyèl pou Jwè
          </h3>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-gray-400 text-sm">
            {split.playerEntryFee.toLocaleString()} HTG
          </span>
          <span className="text-gray-600">→</span>
          <span className="text-gold font-bold text-xl">
            {potentialPayout.toLocaleString()} HTG
          </span>
        </div>
        <p className="text-gray-500 text-xs">
          Si tout {split.events.length} match kòrèk
        </p>
      </div>

      {/* Join deadline */}
      {split.status === "open" && split.joinDeadline && (
        <div className="bg-dark-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">
            Enskrisyon fèmen nan:
          </span>
          <CountdownTimer targetDate={split.joinDeadline} urgent />
        </div>
      )}

      {/* Events list */}
      <SplitEventList events={split.events} />

      {/* Participants */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-white">
            Jwè ({split.currentPlayers})
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {split.participants.slice(0, 12).map((p) => (
            <span
              key={p.username}
              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
            >
              {p.username}
            </span>
          ))}
          {split.participants.length > 12 && (
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-500">
              +{split.participants.length - 12} lòt
            </span>
          )}
        </div>
      </div>

      {/* Join button */}
      {canJoin && !joined && (
        <button
          onClick={handleJoin}
          disabled={joining || split.playerEntryFee > user?.availableBalance}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {joining
            ? "Ap antre..."
            : `Antre nan Split — ${split.playerEntryFee.toLocaleString()} HTG`}
        </button>
      )}

      {canJoin && split.playerEntryFee > user?.availableBalance && (
        <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-3 py-2 rounded-lg">
          <ShieldAlert size={14} /> Ou pa gen ase lajan. Balans:{" "}
          {user?.availableBalance.toLocaleString()} HTG
        </div>
      )}

      {/* Joined success */}
      {joined && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-success/20 rounded-full flex items-center justify-center">
            <Check size={24} className="text-success" />
          </div>
          <p className="text-success font-bold">Ou antre nan Split la!</p>
          <p className="text-gray-400 text-sm">
            Lajan an an eskwo. Ap tann rezilta match yo.
          </p>
        </div>
      )}

      {/* Share for creator */}
      {isCreator && split.status === "open" && (
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
        >
          Pataje Split la
        </button>
      )}

      {/* Creator P&L for completed */}
      {isCreator && split.status === "completed" && (
        <div
          className={`border rounded-xl p-4 text-center space-y-2 ${
            anyEventLost
              ? "bg-success/10 border-success/20"
              : "bg-danger/10 border-danger/20"
          }`}
        >
          {anyEventLost ? (
            <>
              <p className="text-success font-bold">Ou Genyen!</p>
              <p className="text-success text-lg font-bold">
                {creatorProfit.toLocaleString()} HTG pwofi
              </p>
              <p className="text-gray-400 text-xs">Apre 10% frè platfòm</p>
            </>
          ) : (
            <>
              <p className="text-danger font-bold">Jwè yo Genyen</p>
              <p className="text-danger text-lg font-bold">
                Ou peye {creatorLoss.toLocaleString()} HTG
              </p>
              <p className="text-gray-400 text-xs">
                bay {split.currentPlayers} jwè
              </p>
            </>
          )}
        </div>
      )}

      {showShare && (
        <ShareSplitDrawer
          shareLink={`https://clichubs.com/bank-pari/${split.id}`}
          split={split}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
