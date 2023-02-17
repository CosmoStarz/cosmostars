import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  GameKeyboard,
  randomInterval,
} from "../../../shared/constants";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { BaseObject } from "../model/BaseObject/BaseObject";
import { EnemyGrid } from "../model/EnemyGrid/EnemyGrid";
import { Player } from "../model/Player/Player";
import { getRandomNumber } from "./utils";

export class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;
  private frames: number;
  private enemyGrids: EnemyGrid[];
  private randomInterval: number;
  private gameActive: boolean;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.player = this.createPlayer;
    this.enemyGrids = [];
    this.frames = 0;
    this.randomInterval = getRandomNumber(randomInterval, randomInterval);
    this.gameActive = false;

    this.drawCanvas();
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

  get createOneEnemyGrid() {
    return new EnemyGrid({
      scene: this.scene,
    });
  }

  private createEnemies() {
    if (this.frames % this.randomInterval === 0) {
      this.enemyGrids.push(this.createOneEnemyGrid);
      this.frames = 0;
      this.randomInterval = getRandomNumber(randomInterval, randomInterval);
    }
    this.frames += 1;
  }

  private watchEnemiesGone() {
    this.enemyGrids.forEach((enemyGrid, index) => {
      if (
        enemyGrid.position.y >= this.scene.height ||
        enemyGrid.enemies.length === 0
      ) {
        setTimeout(() => {
          this.enemyGrids = this.enemyGrids.filter(
            (item, idx) => idx !== index
          );
        }, 0);
      } else {
        this.calculateNewWidth(enemyGrid);
        enemyGrid.update();
        if (
          this.frames % framesPerShoot === 0 &&
          enemyGrid.enemies.length > 0
        ) {
          const randomIndex = getRandomNumber(enemyGrid.enemies.length, 0);
          enemyGrid.enemies[randomIndex].shoot();
        }
      }
    });
  }

  private isIntersect(object: BaseObject, projectile: BaseObject) {
    return (
      object.position.x < projectile.position.x + projectile.size.width &&
      object.position.x + object.size.width > projectile.position.x &&
      object.position.y < projectile.position.y + projectile.size.height &&
      object.position.y + object.size.height > projectile.position.y
    );
  }

  private calculateNewWidth(grid: EnemyGrid) {
    const firstEnemy = grid.enemies[0];
    const lastEnemy = grid.enemies[grid.enemies.length - 1];

    grid.size.width =
      lastEnemy.position.x + lastEnemy.size.width - firstEnemy.position.x;
    grid.position.x = firstEnemy.position.x;
  }

  private checkCollisions() {
    this.enemyGrids.forEach(enemyGrid => {
      if (this.isIntersect(this.player, enemyGrid)) {
        this.loose();
      }

      enemyGrid.enemies = enemyGrid.enemies.filter(enemy => {
        let isEnemyAlive = true;
        this.player.projectiles = this.player.projectiles.filter(
          playerProjectile => {
            let isFly = true;
            enemy.projectiles = enemy.projectiles.filter(enemyProjectile => {
              // Выстрелы столкнулись
              if (this.isIntersect(playerProjectile, enemyProjectile)) {
                isFly = false;
                return false;
              }
              return true;
            });

            // Выстрел попал во врага
            if (this.isIntersect(enemy, playerProjectile)) {
              isEnemyAlive = false;
              return false;
            }
            return isFly;
          }
        );

        enemy.projectiles = enemy.projectiles.filter(enemyProjectile => {
          // Выстрел попал в игрока
          if (this.isIntersect(this.player, enemyProjectile)) {
            this.loose();
            return false;
          }
          return true;
        });

        return isEnemyAlive;
      });
    });
  }

  public start() {
    this.gameActive = true;
    this.initListeners();
    this.update();
  }

  // TODO: внедрить состояния игры и прикрутить показ нужных окошек при каждом (COS-47)
  private stopped() {
    this.gameActive = false;
  }

  private loose() {
    console.log("LOOSER");
    this.stopped();
  }

  private initListeners() {
    if (this.gameActive) {
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
          case GameKeyboard.PAUSE:
            this.stopped();
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
  }

  private drawCanvas() {
    this.scene.fillCanvas(BaseGameColors.BLACK);
  }

  private update() {
    if (this.gameActive) {
      requestAnimationFrame(this.update.bind(this));
      this.drawCanvas();
      this.player.update();
      this.checkCollisions();
      this.watchEnemiesGone();
      this.createEnemies();
    }
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
