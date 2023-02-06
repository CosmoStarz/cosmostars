import {
  BaseGameColors,
  baseSpeed,
  GameKeyboard,
} from "../../../shared/constants";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { Player } from "../model/Player/Player";

class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.player = this.createPlayer;

    this.init(); // TODO: после реализации экрана начала игры - вызывать после нажатия кнопки
  }

  get mainScene() {
    return initCanvas(this.canvas);
  }

  get createPlayer() {
    return new Player({
      color: BaseGameColors.RED,
      scene: this.scene,
    });
  }

  private init() {
    this.initListeners();
    this.update();
  }

  private initListeners() {
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case GameKeyboard.LEFT:
          this.player.velocity.dx = -baseSpeed;
          break;
        case GameKeyboard.RIGHT:
          this.player.velocity.dx = baseSpeed;
          break;
        case GameKeyboard.SHOOT:
          this.player.shoot();
          break;
        default:
          break;
      }
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      if (keyCode === GameKeyboard.LEFT || keyCode === GameKeyboard.RIGHT) {
        this.player.velocity.dx = 0;
      }
    });

    window.addEventListener("resize", (e: Event) => {
      const current = e.target as Window;
      if (current) {
        this.canvas.width = current.innerWidth;
        this.canvas.height = current.innerHeight;
      }
    });
  }

  protected drawCanvas() {
    this.scene.fillCanvas(BaseGameColors.BLACK);
  }

  private update() {
    requestAnimationFrame(this.update.bind(this));
    this.drawCanvas();
    this.player.update();
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
