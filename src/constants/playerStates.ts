export const PLAYER_STATES = {
  BROKEN: 'Broken',
  WAIT: 'Wait',
  STAND: 'Stand',
  DOUBLE_DOWN: 'Double',
  SURRENDER: 'Surrender',
  BUST: 'Bust',
  BLACKJACK: 'Blackjack',
  // その他の状態も必要に応じて追加
}

// 完了したアクションの状態を配列で定義
export const COMPLETED_ACTIONS = [
  PLAYER_STATES.STAND,
  PLAYER_STATES.BUST,
  PLAYER_STATES.DOUBLE_DOWN,
  PLAYER_STATES.SURRENDER,
  PLAYER_STATES.BLACKJACK
]