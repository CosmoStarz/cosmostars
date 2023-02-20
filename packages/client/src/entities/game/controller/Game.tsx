import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  GameKeyboard,
  randomInterval,
} from "@/shared/constants";

import { EnemyGrid } from "../model/EnemyGrid/EnemyGrid";
import { BaseObject } from "../model/BaseObject/BaseObject";
import { Player } from "../model/Player/Player";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";
import { getRandomNumber } from "./utils";
import { Projectile } from "../model/Projectile/Projectile";

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
    this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);
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

  private createOneEnemyGrid() {
    return new EnemyGrid({
      scene: this.scene,
    });
  }

  private createEnemies() {
    if (this.frames % this.randomInterval === 0) {
      this.enemyGrids.push(this.createOneEnemyGrid());
      this.frames = 0;
      this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);
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
          const randomIndex = getRandomNumber(0, enemyGrid.enemies.length);
          if (enemyGrid.enemies[randomIndex]) {
            enemyGrid.enemies[randomIndex].shoot();
          }
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

  private checkCollision(projectiles: BaseObject[], collidingObject: BaseObject, collidingMethod: () => void) {
    projectiles = projectiles.filter((projectile) => {
      if (this.isIntersect(collidingObject, projectile)) {
        collidingMethod();
        return false;
      }
      return true;
    });
  }

  private checkAllCollisions() {
    this.enemyGrids.forEach(enemyGrid => {
      if (this.isIntersect(this.player, enemyGrid)) {
        this.loose();
      }

      enemyGrid.enemies = enemyGrid.enemies.filter((enemy) => {
        let isEnemyAlive = true;
        this.checkCollision(this.player.projectiles, enemy, () => { isEnemyAlive = false });
        this.checkCollision(enemy.projectiles, this.player, () => { this.loose() });

        this.player.projectiles = this.player.projectiles.filter((playerProjectile) => {
          let isFly = true;
          this.checkCollision(enemy.projectiles, playerProjectile, () => { isFly = false });
          return isFly;
        });

        return isEnemyAlive;
      })
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
      this.checkAllCollisions();
      this.watchEnemiesGone();
      this.createEnemies();
    }
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
