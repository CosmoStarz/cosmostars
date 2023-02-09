import {
  BaseGameColors,
  baseSpeed,
  GameKeyboard,
} from "../../../shared/constants";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { Player } from "../model/Player/Player";
import { Grid } from "../model/Grid/Grid";
import { Enemy } from "../model/Enemy/Enemy";

class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;
  private frames: number;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.player = this.createPlayer;
    this.grids = [];
    this.frames = 0;
    this.randomInterval = Math.floor(Math.random() * 500 + 500);

    this.init(); // TODO: после реализации экрана начала игры - вызывать после нажатия кнопки
    this.createEnemies();
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

  createEnemies() {
    this.grids.push(
      new Grid({ scene: this.scene, velocity: { dx: 5, dy: 0 } })
    );
    // if (this.frames % this.randomInterval === 0) {
    //   this.grids.push(new Grid({ scene: this.scene }));
    //   this.frames = 0;
    //   this.randomInterval = Math.floor(Math.random() * 500 + 500);
    // }
    // this.frames++;
  }

  updateEnemies() {
    this.grids.forEach(grid => grid.update());
    // this.grids.forEach(grid => {
    //   grid.update();
    // });
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
    this.updateEnemies();
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
