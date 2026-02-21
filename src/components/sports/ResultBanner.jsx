import { CheckCircle, XCircle } from 'lucide-react'

export default function ResultBanner({ survived, message, subMessage }) {
  return (
    <div className={`rounded-2xl p-6 text-center space-y-2 border ${
      survived
        ? 'bg-success/10 border-success/20'
        : 'bg-danger/10 border-danger/20'
    }`}>
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
        survived ? 'bg-success/20' : 'bg-danger/20'
      }`}>
        {survived ? (
          <CheckCircle size={36} className="text-success" />
        ) : (
          <XCircle size={36} className="text-danger" />
        )}
      </div>
      <h2 className={`text-2xl font-bold ${survived ? 'text-success' : 'text-danger'}`}>
        {survived ? 'OU SIVIV!' : 'Pa gen chans fwa sa a'}
      </h2>
      <p className={`text-sm ${survived ? 'text-success/80' : 'text-danger/80'}`}>
        {message}
      </p>
      {subMessage && (
        <p className="text-gray-400 text-xs">{subMessage}</p>
      )}
    </div>
  )
}
