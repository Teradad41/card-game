import * as Phaser from 'phaser'
import Card from '@/models/common/Card'
import CardView from '@/phaser/common/CardView'
import House from '@/models/blackjack/House'

export default class PlayerView extends Phaser.GameObjects.Container {
  private readonly _houseModel: House

  private readonly _handCardViews: Phaser.GameObjects.Container

  private readonly _playerNameText: Phaser.GameObjects.Text

  private readonly _statusText: Phaser.GameObjects.Text

  private readonly _scoreText: Phaser.GameObjects.Text

  constructor(
    scene: Phaser.Scene,
    houseModel: House,
    playerPos: { x: number; y: number }
  ) {
    super(scene, playerPos.x, playerPos.y)
    this._houseModel = houseModel

    this._playerNameText = this.scene.add.text(
      40,
      0,
      `${this._houseModel.name.toUpperCase()}`
    )
    this._statusText = this.scene.add.text(
      5,
      64 + 40,
      `STATES: ${this._houseModel.status}`
    )
    this._scoreText = this.scene.add.text(5, 64 + 60, `SCORE: ?`, {
      font: '24px',
      backgroundColor: 'blue'
    })
    this._handCardViews = this.scene.add.container()

    this.add([
      this._playerNameText,
      this._statusText,
      this._scoreText,
      this._handCardViews
    ])

    scene.add.existing(this)
  }

  get houseModel(): House {
    return this._houseModel
  }

  public animateAddHand(x: number, y: number, card: Card, i: number): void {
    const cardView: CardView = new CardView(this.scene, x, y, card)

    cardView.animateCardMove(this.x + (i + 1) * 25 + 20, this.y + 60)
    this._handCardViews.add(cardView)
    this.scene.add.existing(this._handCardViews)
  }

  public changeBlackjackColor(): void {
    this._playerNameText.setColor('#e6b422')
  }

  public updateAll(): void {
    this.updateStatus()
    this.updateScore()
  }

  public updateStatus(): void {
    this._statusText.setText(`STATES: ${this._houseModel.status}`)
  }

  public updateScore(): void {
    this._scoreText.setText(`SCORE: ${this._houseModel.getHandTotalScore()}`)
  }

  private removeAllCards(): void {
    this.remove(
      this.list.filter(
        (child: Phaser.GameObjects.GameObject) => child instanceof CardView
      ),
      true
    )
  }

  public revealFirstHand(): void {
    let i = 0
    this._handCardViews.each((child: CardView) => {
      if (i <= 0) child.open()
      i += 1
    })
  }

  public revealLastHand(): void {
    let i = 0
    this._handCardViews.each((child: CardView) => {
      i += 1
      if (i >= this._handCardViews.length) {
        child.open()
      }
    })
  }

  public revealHand(): void {
    this._handCardViews.each((child: CardView) => {
      child.open()
    })
  }
}
