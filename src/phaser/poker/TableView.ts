import Phaser from 'phaser'
import Table from '@/models/poker/Table'
import Player from '@/models/poker/Player'
import PlayerView from '@/phaser/poker/PlayerView'
import DeckView from '@/phaser/common/DeckView'
import Deck from '@/models/common/Deck'
import Card from '@/models/common/Card'
import PLAYERTYPES from '@/types/playerTypes'

export default class TableView extends Phaser.GameObjects.Container {
  private readonly _tableModel: Table

  private readonly _playerModels: Player[]

  private readonly _playerViews: PlayerView[]

  private readonly _deckModel: Deck

  private readonly _deckView: DeckView

  private readonly _background: Phaser.GameObjects.Image

  private _sceneWidth: number = this.scene.cameras.main.width

  private _sceneHeight: number = this.scene.cameras.main.height

  constructor(scene: Phaser.Scene, tableModel: Table) {
    super(scene)
    this._tableModel = tableModel
    this._playerModels = this._tableModel.players
    this._playerViews = []
    this._deckModel = this._tableModel.deck
    this._deckView = new DeckView(
      this.scene,
      this._sceneWidth / 2,
      this._sceneHeight / 2,
      new Deck(this._tableModel.gameType)
    )
    this._background = this.scene.add.image(
      this._sceneWidth / 2,
      this._sceneHeight / 2,
      'table'
    )

    this.add([this._background, this._deckView])

    const playersPos: { x: number; y: number }[] = [
      { x: 750, y: 100 },
      { x: 750, y: 350 },
      { x: 450, y: 550 }, // プレイヤー
      { x: 150, y: 350 },
      { x: 150, y: 100 },
      { x: 450, y: 100 }
    ]

    this._playerModels.forEach((player: Player, index: number) => {
      const playerView = new PlayerView(this.scene, player, playersPos[index])
      this._playerViews.push(playerView)
      this.add(playerView)
    })

    this._deckModel.shuffle()
    scene.add.existing(this)
  }

  public dealCardAnimation(): void {
    const delayPerCard: number = 150
    for (let i: number = 0; i < 2; i += 1) {
      this._playerModels.forEach((player: Player, index: number) => {
        const card: Card = this._tableModel.drawValidCardFromDeck()
        player.addHand(card)

        const deckPosition: { x: number; y: number } = {
          x: this._deckView.x,
          y: this._deckView.y - 2 * 8
        }
        const delay: number =
          i * delayPerCard * this._playerModels.length + index * delayPerCard

        this._playerViews[index].addCardToHand(deckPosition, card, i, delay)
      })
    }
  }

  public revealUserHand(): void {
    const user: PlayerView = this._playerViews.filter(
      (player: PlayerView) =>
        player.playerModel.playerType === PLAYERTYPES.PLAYER
    )[0]
    user.revealHand()
  }

  public assignDealerBtn(): void {
    this._tableModel.assignRandomDealerButton()

    // 全プレイヤーのディーラーボタンを削除する
    this._playerViews.forEach((player: PlayerView) => {
      player.removeDealerBtn()
    })

    const { dealerIndex } = this._tableModel
    const dealerPlayer: PlayerView = this._playerViews[dealerIndex]
    dealerPlayer.addDealerBtn()
  }

  public animateCollectBlinds(): void {
    this._tableModel.collectBlinds()

    const sbPlayer: PlayerView = this._playerViews[this._tableModel.sbIndex]
    const bbPlayer: PlayerView = this._playerViews[this._tableModel.bbIndex]

    sbPlayer.animatePlaceBet(this._tableModel.smallBlind)
    bbPlayer.animatePlaceBet(this._tableModel.bigBlind)
  }
}