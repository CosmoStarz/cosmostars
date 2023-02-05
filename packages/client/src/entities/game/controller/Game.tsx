import { baseSpeed, GameKeyboard } from "../../../shared/constants";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { Player } from "../model/Player/Player";

class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = canvasEl;
    this.scene = this.mainScene;
    this.player = this.createPlayer;

    this.init(); // TODO: после реализации экрана начала игры - вызывать после нажатия кнопки
  }

  get mainScene() {
    return initCanvas(this.canvas);
  }

  get createPlayer() {
    return new Player({
      color: "red",
      scene: this.scene,
    });
  }

  private init() {
    this.initListeners();
    this.update();
  }

  private initListeners() {
    window.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode === GameKeyboard.LEFT) {
        this.player.velocity.dx = -baseSpeed;
      }
      if (keyCode === GameKeyboard.RIGHT) {
        this.player.velocity.dx = baseSpeed;
      }
      if (keyCode === GameKeyboard.SHOOT) {
        this.player.shoot();
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

  private update() {
    requestAnimationFrame(this.update.bind(this));
    this.scene.fillCanvas("black");
    this.player.update();
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
