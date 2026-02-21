const API_BASE = '/api'

export async function registerUser(data) {
  // POST /api/auth/register/
  return { userId: 'mock-id', sessionToken: 'mock-token' }
}

export async function verifyOTP(userId, otp) {
  // POST /api/auth/verify-otp/
  return { accessToken: 'mock-access', refreshToken: 'mock-refresh' }
}

export async function loginUser(credentials) {
  // POST /api/auth/login/
  return { accessToken: 'mock-access', refreshToken: 'mock-refresh' }
}

export async function requestPasswordReset(phone) {
  // POST /api/auth/password-reset/
  return { success: true }
}

export async function confirmPasswordReset(otp, newPassword) {
  // POST /api/auth/password-reset/confirm/
  return { success: true }
}

export async function fetchPublicGames() {
  // GET /api/games/?status=open (public, read-only)
  return []
}

// Section 2: Player Zone API stubs

export async function fetchUserProfile() {
  // GET /api/users/me/
  return {}
}

export async function deposit(amount, phone) {
  // POST /api/wallet/deposit/
  return { sessionId: 'moncash-session-123', success: true }
}

export async function withdraw(amount, phone) {
  // POST /api/wallet/withdraw/
  return { status: 'PENDING', success: true }
}

export async function fetchTransactions(filters) {
  // GET /api/wallet/transactions/
  return []
}

export async function enterGame(gameId) {
  // POST /api/games/:id/enter
  return { success: true }
}

export async function fetchLeaderboard(period, gameType) {
  // GET /api/leaderboard/?period=week&game_type=all
  return []
}

export async function updateProfile(data) {
  // PATCH /api/users/me/
  return { success: true }
}

export async function setDepositLimit(type, amount) {
  // POST /api/users/me/limits/
  return { success: true }
}

export async function selfExclude(duration) {
  // POST /api/users/me/self-exclude/
  return { success: true }
}

// Section 3: Sports Game Flows API stubs

export async function enterTournament(tournamentId) {
  // POST /api/tournaments/:id/enter
  return { success: true, entryId: 'entry-mock-001' }
}

export async function submitPrediction(tournamentId, roundId, pick) {
  // POST /api/tournaments/:id/rounds/:roundId/predict
  return { success: true, prediction: pick }
}

export async function createSplit(data) {
  // POST /api/bank-pari/create
  return { splitId: 'bp-mock-new', shareLink: 'https://clichubs.com/bank-pari/bp-mock-new', success: true }
}

export async function joinSplit(splitId) {
  // POST /api/bank-pari/:id/join
  return { success: true, participantId: 'part-mock-001' }
}

export async function getSplits(filters) {
  // GET /api/bank-pari/
  return []
}

export async function getSplitDetail(splitId) {
  // GET /api/bank-pari/:id
  return {}
}

export async function submitWeeklyPick(poolId, team) {
  // POST /api/sivivan/pools/:id/pick
  return { success: true, pick: team }
}

export async function enterPool(poolId) {
  // POST /api/sivivan/pools/:id/enter
  return { success: true, entryId: 'entry-mock-001' }
}

export async function getPoolDetails(poolId) {
  // GET /api/sivivan/pools/:id/
  return {}
}

export async function getDenyeSivivanPools(filters) {
  // GET /api/sivivan/pools/?league=...&tier=...
  return []
}

// Section 4: Simulated Games API stubs

export async function placeVirtualBet(matchId, outcome, amount) {
  // POST /api/virtual/football/:id/bet
  return { success: true, betId: 'vbet-mock-001' }
}

export async function enterHorseRace(raceId) {
  // POST /api/virtual/horses/:id/enter
  return { success: true, entryId: 'hr-entry-001' }
}

export async function pickHorse(raceId, roundId, horseNumber) {
  // POST /api/virtual/horses/:id/pick
  return { success: true, pick: horseNumber }
}

export async function findCardMatch(mode, stake) {
  // POST /api/virtual/cards/match
  return { success: true, gameId: 'cg-mock-001', opponent: '@MaxG' }
}

export async function readyCardGame(gameId) {
  // POST /api/virtual/cards/:id/ready
  return { success: true }
}

export async function requestRematch(gameId) {
  // POST /api/virtual/cards/:id/rematch
  return { success: true, newGameId: 'cg-mock-002' }
}

export async function findDuelMatch(mode, stake) {
  // POST /api/virtual/duels/match
  return { success: true, duelId: 'duel-mock-001', opponent: '@PronosQueen' }
}

export async function submitDuelAnswer(duelId, questionId, answer) {
  // POST /api/virtual/duels/:id/answer
  return { success: true, correct: true }
}
