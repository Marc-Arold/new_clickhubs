import { Trophy, XCircle, CheckCircle, X } from 'lucide-react'

export default function DuelResults({ duel, questions }) {
  const won = duel.winner === 'you'

  return (
    <div className="space-y-4">
      {/* Result banner */}
      <div className={`rounded-2xl p-6 text-center space-y-3 ${
        won ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'
      }`}>
        <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${
          won ? 'bg-success/20' : 'bg-danger/20'
        }`}>
          {won ? <Trophy size={28} className="text-success" /> : <XCircle size={28} className="text-danger" />}
        </div>
        <p className={`text-xl font-bold ${won ? 'text-success' : 'text-danger'}`}>
          {won ? 'OU GENYEN!' : 'Pa gen chans fwa sa a'}
        </p>
        <div className="flex justify-center gap-8">
          <div>
            <p className="text-gold font-bold text-2xl">{duel.yourScore}</p>
            <p className="text-gray-400 text-xs">Ou</p>
          </div>
          <div>
            <p className="text-white font-bold text-2xl">{duel.opponentScore}</p>
            <p className="text-gray-400 text-xs">{duel.opponent}</p>
          </div>
        </div>
        {won && (
          <p className="text-gold text-lg font-bold">+{duel.potAfterFee.toLocaleString()} HTG</p>
        )}
      </div>

      {/* Answer review */}
      <div className="bg-dark-surface border border-white/10 rounded-xl p-4 space-y-3">
        <h4 className="text-white font-medium text-sm">Revizyon Repons</h4>
        {duel.answers.map((a, i) => {
          const q = questions.find(q => q.id === a.questionId)
          const yourCorrect = a.yourAnswer === a.correct
          const oppCorrect = a.opponentAnswer === a.correct
          return (
            <div key={a.questionId} className="bg-dark-accent rounded-lg p-3 space-y-2">
              <p className="text-gray-300 text-xs font-medium">{i + 1}. {q?.question}</p>
              <div className="flex gap-4 text-xs">
                <div className="flex-1">
                  <div className={`flex items-center gap-1 ${yourCorrect ? 'text-success' : 'text-danger'}`}>
                    {yourCorrect ? <CheckCircle size={12} /> : <X size={12} />}
                    <span className="font-medium">Ou: {a.yourAnswer}</span>
                  </div>
                  <span className="text-gray-500 ml-4">{a.yourTime.toFixed(1)}s</span>
                </div>
                <div className="flex-1">
                  <div className={`flex items-center gap-1 ${oppCorrect ? 'text-success' : 'text-danger'}`}>
                    {oppCorrect ? <CheckCircle size={12} /> : <X size={12} />}
                    <span className="font-medium">{duel.opponent}: {a.opponentAnswer}</span>
                  </div>
                  <span className="text-gray-500 ml-4">{a.opponentTime.toFixed(1)}s</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs">Repons kòrèk: <span className="text-white">{a.correct}</span></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
