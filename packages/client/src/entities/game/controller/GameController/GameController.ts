import { store } from "@/app/store";
import { Sound } from "@/entities/game/ui/Sound/Sound";
import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  GameImages,
  maxStarsCount,
  randomInterval,
  StarRadius,
  StarVelocity,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { BaseObject } from "../../model/BaseObject/BaseObject";
import { EnemyGrid } from "../../model/EnemyGrid/EnemyGrid";
import { Player } from "../../model/Player/Player";
import { Star } from "../../model/Star/Star";
import { incrementScoreByEnemy } from "../../model/store/gameSlice";
import { Canvas } from "../../ui/Canvas/Canvas";
import { GameControllerType } from "./types";

// класс игрового контроллера: включает в себя работу над игровыми объектами
export class GameController {
  private scene: Canvas;
  public player: Player;
  private frames: number;
  private enemyGrids: EnemyGrid[];
  private stars: Star[];
  private randomInterval: number;
  private sound: Sound;
  private end: () => void;

  constructor(props: GameControllerType) {
    this.scene = props.scene;
    this.sound = props.sound;
    this.end = props.end;
    this.player = this.initialPlayer;
    this.stars = [];
    this.enemyGrids = [];
    this.frames = 0;
    this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);

    this.generateStars();
  }

  private get initialPlayer() {
    return new Player({
      scene: this.scene,
      projectileSpeed: -baseSpeed,
      src: GameImages.PLAYER,
      projectileImage: GameImages.PLAYER_PROJECTILE,
    });
  }

  private createOneStar() {
    return new Star({
      scene: this.scene,
      position: {
        x: Math.random() * this.scene.width,
        y: Math.random() * this.scene.height,
      },
      velocity: {
        dx: StarVelocity.dx,
        dy: StarVelocity.dy,
      },
      radius: getRandomNumber(StarRadius.MIN, StarRadius.MAX),
      color: BaseGameColors.WHITE,
    });
  }

  private generateStars() {
    for (let i = 0; i < maxStarsCount; i++) {
      this.stars.push(this.createOneStar());
    }
  }

  private createOneEnemyGrid() {
    return new EnemyGrid({
      scene: this.scene,
    });
  }

  private generateEnemies() {
    if (this.frames % this.randomInterval === 0) {
      this.enemyGrids.push(this.createOneEnemyGrid());
      this.frames = 0;
      this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);
    }
    this.frames += 1;
  }

  private watchStarsGone() {
    this.stars.forEach(star => {
      if (star.position.y - star.radius >= this.scene.height) {
        star.position.x = Math.random() * this.scene.width;
        star.position.y = -star.radius;
      } else {
        star.update();
      }
    });
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
        this.end();
      }

      enemyGrid.enemies = enemyGrid.enemies.filter(enemy => {
        const hitEnemy = this.checkCollision(
          this.player.projectiles,
          enemy,
          () => {
            this.sound.playExplosion();
            store.dispatch(incrementScoreByEnemy("BASIC"));
          }
        );
        this.player.projectiles = hitEnemy.newProjectiles;

        const hitPlayer = this.checkCollision(
          enemy.projectiles,
          this.player,
          () => {
            this.end();
          }
        );
        enemy.projectiles = hitPlayer.newProjectiles;

        this.player.projectiles = this.player.projectiles.filter(
          playerProjectile => {
            const hitProjectiles = this.checkCollision(
              enemy.projectiles,
              playerProjectile,
              () => {
                this.sound.playExplosion();
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

  public update() {
    this.watchStarsGone();
    this.player.update();
    this.checkAllCollisions();
    this.watchEnemiesGone();
    this.generateEnemies();
  }

  public clearGameState() {
    this.player.clear();
    this.enemyGrids.forEach(grid => grid.clear());
    this.enemyGrids = [];
    this.frames = 0;
  }
}
