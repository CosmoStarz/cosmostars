import { store } from "@/app/store";
import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  GameImages,
  GameKeyboard,
  GameStatuses,
  randomInterval,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { BaseObject } from "../model/BaseObject/BaseObject";
import { EnemyGrid } from "../model/EnemyGrid/EnemyGrid";
import { Player } from "../model/Player/Player";
import { incrementScoreByEnemy, setGameStatus } from "../model/store/gameSlice";
import { Canvas, initCanvas } from "../ui/Canvas/Canvas";

export class Game {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private player: Player;
  private frames: number;
  private enemyGrids: EnemyGrid[];
  private randomInterval: number;
  private gameActive: boolean;
  private handleKeyDown: ({ keyCode }: KeyboardEvent) => void;
  private handleKeyUp: ({ keyCode }: KeyboardEvent) => void;
  private handleResize: (e: Event) => void;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.player = this.initialPlayer;
    this.enemyGrids = [];
    this.frames = 0;
    this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);
    this.gameActive = store.getState().game.status === GameStatuses.ACTIVE;

    this.handleKeyDown = this.onKeyDown.bind(this);
    this.handleKeyUp = this.onKeyUp.bind(this);
    this.handleResize = this.onResize.bind(this);

    this.drawCanvas();
  }

  private get mainScene() {
    return initCanvas(this.canvas);
  }

  private get initialPlayer() {
    return new Player({
      scene: this.scene,
      projectileSpeed: -baseSpeed,
      src: GameImages.PLAYER,
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

  private checkCollision(
    projectiles: BaseObject[],
    collidingObject: BaseObject,
    collidingMethod: () => void
  ) {
    let isAlive = true;
    const newProjectiles = projectiles.filter(projectile => {
      if (this.isIntersect(collidingObject, projectile)) {
        collidingMethod();
        isAlive = false;
        return false;
      }
      return true;
    });

    return { isAlive, newProjectiles };
  }

  private checkAllCollisions() {
    this.enemyGrids.forEach(enemyGrid => {
      if (this.isIntersect(this.player, enemyGrid)) {
        this.loose();
      }

      enemyGrid.enemies = enemyGrid.enemies.filter(enemy => {
        const hitEnemy = this.checkCollision(
          this.player.projectiles,
          enemy,
          () => {
            // TODO: добавить взрыв (COS-53)
            store.dispatch(incrementScoreByEnemy("BASIC"));

            console.log("BOOM");
          }
        );
        this.player.projectiles = hitEnemy.newProjectiles;

        const hitPlayer = this.checkCollision(
          enemy.projectiles,
          this.player,
          () => {
            this.loose();
          }
        );
        enemy.projectiles = hitPlayer.newProjectiles;

        this.player.projectiles = this.player.projectiles.filter(
          playerProjectile => {
            const hitProjectiles = this.checkCollision(
              enemy.projectiles,
              playerProjectile,
              () => {
                // TODO: добавить взрыв (COS-53)

                console.log("BOOM");
              }
            );
            enemy.projectiles = hitProjectiles.newProjectiles;

            return hitProjectiles.isAlive;
          }
        );

        return hitEnemy.isAlive;
      });
    });
  }

  public resume() {
    store.dispatch(setGameStatus(GameStatuses.ACTIVE));
    this.gameActive = true;
    this.update();
  }

  public start() {
    this.clearGameState();
    this.initListeners();
    this.resume();
  }

  private loose() {
    store.dispatch(setGameStatus(GameStatuses.LOOSE));
    this.gameActive = false;
  }

  private paused() {
    store.dispatch(setGameStatus(GameStatuses.PAUSED));
    this.gameActive = false;
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
        this.player.shoot();
        break;
      case GameKeyboard.PAUSE:
        this.paused();
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

  private initListeners() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("resize", this.handleResize);
  }

  public removeListeners() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("resize", this.handleResize);
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

  private clearGameState() {
    this.removeListeners();
    this.player.clear();
    this.enemyGrids.forEach(grid => grid.clear());
    this.enemyGrids = [];
    this.frames = 0;
  }
}

export const initGame = (canvas: HTMLCanvasElement) => new Game(canvas);
