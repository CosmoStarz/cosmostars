import {
  BaseGameColors,
  baseSpeed,
  GameKeyboard,
} from "../../../shared/constants";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { Player } from "../model/Player/Player";
import { EnemyGrid } from "../model/EnemyGrid/EnemyGrid";

class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;
  private frames: number;
  private enemies: EnemyGrid[];
  private randomInterval: number;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.player = this.createPlayer;
    this.enemies = [];
    this.frames = 0;
    this.randomInterval = Math.floor(Math.random() * 500 + 500);

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

  get createOneEnemy() {
    return new EnemyGrid({
      scene: this.scene,
    });
  }

  createEnemies() {
    if (this.frames % this.randomInterval === 0) {
      this.enemies.push(this.createOneEnemy);
      this.frames = 0;
      this.randomInterval = Math.floor(Math.random() * 500 + 500);
    }
    this.frames += 1;
  }

  watchEnemiesGone() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.position.y >= this.scene.height) {
        setTimeout(() => {
          this.enemies = this.enemies.filter((item, idx) => idx !== index);
        }, 0);
      } else {
        enemy.update();
        if (this.frames % 100 === 0 && enemy.enemies.length > 0) {
          enemy.enemies[
            Math.floor(Math.random() * enemy.enemies.length)
          ].shoot();
        }
      }
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
    this.watchEnemiesGone();
    this.createEnemies();
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
