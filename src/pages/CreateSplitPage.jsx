import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Landmark,
  Check,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createSplit } from "../utils/api";
import MultiEventSelector from "../components/sports/MultiEventSelector";
import OddsInput from "../components/sports/OddsInput";
import EscrowCalculator from "../components/sports/EscrowCalculator";
import ShareSplitDrawer from "../components/sports/ShareSplitDrawer";

export default function CreateSplitPage() {
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [odds, setOdds] = useState({});
  const [picks, setPicks] = useState({});
  const [entryFee, setEntryFee] = useState("");
  const [escrow, setEscrow] = useState("");
  const [step, setStep] = useState("form"); // 'form' | 'success'
  const [shareLink, setShareLink] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [createdSplit, setCreatedSplit] = useState(null);

  const entryFeeNum = parseInt(entryFee) || 0;
  const escrowNum = parseInt(escrow) || 0;

  const totalOdds = selectedEvents.reduce((acc, event) => {
    const o = parseFloat(odds[event.id]) || 1;
    return acc * o;
  }, 1);

  const allOddsValid =
    selectedEvents.length >= 2 &&
    selectedEvents.every((e) => {
      const o = parseFloat(odds[e.id]);
      return o && o >= 1.1;
    });

  const allPicksValid =
    selectedEvents.length >= 2 && selectedEvents.every((e) => picks[e.id]);

  const netPayoutPerPlayer =
    entryFeeNum > 0 ? Math.round(entryFeeNum * totalOdds) - entryFeeNum : 0;
  const maxPlayers =
    netPayoutPerPlayer > 0 ? Math.floor(escrowNum / netPayoutPerPlayer) : 0;

  const isValid =
    selectedEvents.length >= 2 &&
    allOddsValid &&
    allPicksValid &&
    entryFeeNum >= 500 &&
    escrowNum >= 10000 &&
    escrowNum <= user?.availableBalance &&
    maxPlayers >= 1;

  function handleOddsChange(matchId, value) {
    setOdds((prev) => ({ ...prev, [matchId]: value }));
  }

  function handlePickChange(matchId, pick) {
    setPicks((prev) => ({ ...prev, [matchId]: pick }));
  }

  const quickEntryAmounts = [500, 1000, 2500, 5000];

  async function handleCreate() {
    try {
      const events = selectedEvents.map((match) => ({
        matchId: match.id,
        pick: picks[match.id],
        odds: parseFloat(odds[match.id]),
      }));
      const result = await createSplit({
        events,
        playerEntryFee: entryFeeNum,
        escrowAmount: escrowNum,
      });
      updateBalance(
        user?.availableBalance - escrowNum,
        user?.escrowedBalance + escrowNum,
      );
      setShareLink(result.shareLink);
      setCreatedSplit({
        events: selectedEvents.map((m) => ({
          id: m.id,
          match: m,
          pick: picks[m.id],
          odds: parseFloat(odds[m.id]),
          result: null,
        })),
        totalOdds,
        playerEntryFee: entryFeeNum,
      });
      setStep("success");
    } catch {
      // API error
    }
  }

  if (step === "success") {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <Check size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold text-white">Split Kreye!</h1>
          <p className="text-gray-400 text-sm">
            Split{" "}
            <span className="text-gold font-bold">{totalOdds.toFixed(2)}x</span>{" "}
            sou{" "}
            <span className="text-white font-medium">
              {selectedEvents.length} match
            </span>{" "}
            kreye avèk siksè.
          </p>
          <p className="text-gray-500 text-xs">
            Eskwo: {escrowNum.toLocaleString()} HTG · {maxPlayers} plas disponib
          </p>

          <div className="flex flex-col gap-3 max-w-sm mx-auto pt-4">
            <button
              onClick={() => setShowShare(true)}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gold hover:bg-gold-light text-dark cursor-pointer transition-all"
            >
              Pataje Split la
            </button>
            <button
              onClick={() => navigate("/bank-pari")}
              className="w-full py-3 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-all"
            >
              Retounen nan Paryaj Klasik
            </button>
          </div>
        </div>

        {showShare && createdSplit && (
          <ShareSplitDrawer
            shareLink={shareLink}
            split={createdSplit}
            onClose={() => setShowShare(false)}
          />
        )}
      </div>
    );
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
          Kreye yon Split
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Chwazi match yo, mete kòt ou, epi atire jwè yo.
        </p>
      </div>

      {/* Step 1: Event selection */}
      <MultiEventSelector
        selectedEvents={selectedEvents}
        onEventsChange={setSelectedEvents}
      />

      {/* Step 2: Pick for each event */}
      {selectedEvents.length >= 2 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">
            2. Chwa ou pou chak match
          </h3>
          <div className="space-y-2">
            {selectedEvents.map((match) => (
              <div
                key={match.id}
                className="bg-dark-surface border border-white/10 rounded-xl p-3"
              >
                <p className="text-white text-sm font-medium mb-2">
                  {match.home} vs {match.away}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "home", label: match.home },
                    { key: "draw", label: "Match Nul" },
                    { key: "away", label: match.away },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handlePickChange(match.id, option.key)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer truncate ${
                        picks[match.id] === option.key
                          ? "bg-gold/20 text-gold border-gold shadow-lg shadow-gold/10"
                          : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Odds */}
      {allPicksValid && (
        <OddsInput
          events={selectedEvents}
          odds={odds}
          onOddsChange={handleOddsChange}
          picks={picks}
        />
      )}

      {/* Step 4: Entry fee */}
      {allPicksValid && allOddsValid && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">4. Pri pou Jwè</h3>
          <p className="text-xs text-gray-500">
            Konbyen chak jwè dwe peye pou antre nan split ou a.
          </p>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Montan (HTG) · Min: 500 HTG
            </label>
            <div className="relative">
              <DollarSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                placeholder="1000"
                min={500}
                className="w-full pl-9 pr-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {quickEntryAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setEntryFee(String(amt))}
                className={`flex-1 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
                  entryFeeNum === amt
                    ? "bg-gold/10 text-gold border-gold/20"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                }`}
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>

          {entryFeeNum > 0 && entryFeeNum < 500 && (
            <div className="flex items-center gap-2 text-warning text-xs">
              <AlertCircle size={12} /> Montan minimòm se 500 HTG
            </div>
          )}

          {entryFeeNum >= 500 && (
            <div className="bg-dark-surface border border-white/10 rounded-xl p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Jwè peye</span>
                <span className="text-white">
                  {entryFeeNum.toLocaleString()} HTG
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Jwè ka genyen</span>
                <span className="text-gold font-bold">
                  {Math.round(entryFeeNum * totalOdds).toLocaleString()} HTG
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Escrow */}
      {allPicksValid && allOddsValid && entryFeeNum >= 500 && (
        <EscrowCalculator
          totalOdds={totalOdds}
          entryFee={entryFee}
          escrow={escrow}
          onEscrowChange={setEscrow}
        />
      )}

      {/* Review & Create */}
      {allPicksValid &&
        allOddsValid &&
        entryFeeNum >= 500 &&
        escrowNum >= 10000 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              6. Revize & Pibliye
            </h3>
            <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Match</span>
                <span className="text-white">
                  {selectedEvents.length} match
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Kòt Total</span>
                <span className="text-gold font-bold">
                  {totalOdds.toFixed(2)}x
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pri pou jwè</span>
                <span className="text-white">
                  {entryFeeNum.toLocaleString()} HTG
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Eskwo ou</span>
                <span className="text-white">
                  {escrowNum.toLocaleString()} HTG
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Plas disponib</span>
                <span className="text-white">{maxPlayers} jwè</span>
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={!isValid}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isValid
                  ? "bg-gold hover:bg-gold-light text-dark cursor-pointer"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Landmark size={16} />
              Kreye Split — Depoze {escrowNum.toLocaleString()} HTG
            </button>
          </div>
        )}
    </div>
  );
}
