import { baseSpeed, GameKeyboard } from "@/shared/constants";

import { Player } from "../../model/Player/Player";
import { Sound } from "../Sound/Sound";
import { GameListenersType } from "./types";

// вспомогательный класс для обработки игровых слушателей
export class GameListeners {
  private canvas: HTMLCanvasElement;
  private sound: Sound;
  private player: Player;
  private pause: () => void;
  private handleKeyDown: ({ keyCode }: KeyboardEvent) => void;
  private handleKeyUp: ({ keyCode }: KeyboardEvent) => void;
  private handleResize: (e: Event) => void;

  constructor(props: GameListenersType) {
    this.canvas = props.canvas;
    this.sound = props.sound;
    this.player = props.player;
    this.pause = props.pause;

    this.handleKeyDown = this.onKeyDown.bind(this);
    this.handleKeyUp = this.onKeyUp.bind(this);
    this.handleResize = this.onResize.bind(this);
  }

  private onKeyDown({ keyCode }: KeyboardEvent) {
    switch (keyCode) {
      case GameKeyboard.LEFT:
        this.player.velocity.dx = -baseSpeed;
        break;
      case GameKeyboard.RIGHT:
        this.player.velocity.dx = baseSpeed;
        break;
      case GameKeyboard.SHOOT:
        this.sound.playShot();
        this.player.shoot();
        break;
      case GameKeyboard.PAUSE:
        this.pause();
        break;
      default:
        break;
    }
  }

  private onKeyUp({ keyCode }: KeyboardEvent) {
    if (keyCode === GameKeyboard.LEFT || keyCode === GameKeyboard.RIGHT) {
      this.player.velocity.dx = 0;
    }
  }

  private onResize(e: Event) {
    const current = e.target as Window;
    if (current) {
      this.canvas.width = current.innerWidth;
      this.canvas.height = current.innerHeight;
    }
  }

  public initListeners() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("resize", this.handleResize);
  }

  public removeListeners() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("resize", this.handleResize);
  }
}
