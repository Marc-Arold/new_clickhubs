const formColors = {
  W: 'bg-success text-white',
  D: 'bg-warning text-dark',
  L: 'bg-danger text-white',
}

export default function VirtualTeamCard({ team, side }) {
  return (
    <div className={`flex-1 text-center space-y-3 ${side === 'home' ? 'pr-3' : 'pl-3'}`}>
      <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
        <span className="text-gold font-bold text-lg">{team.name.charAt(0)}{team.name.split(' ').pop().charAt(0)}</span>
      </div>
      <h3 className="text-white font-bold text-sm">{team.name}</h3>
      <div className="flex justify-center gap-1">
        {team.form.map((f, i) => (
          <span key={i} className={`w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center ${formColors[f]}`}>
            {f}
          </span>
        ))}
      </div>
      <p className="text-gray-500 text-xs">Fòs: {team.strength}/100</p>
    </div>
  )
}
