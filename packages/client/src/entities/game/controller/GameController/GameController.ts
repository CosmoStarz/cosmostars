import { store } from "@/app/store";
import { Sound } from "@/entities/game/ui/Sound/Sound";
import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  maxStarsCount,
  randomInterval,
  StarRadius,
  StarVelocity,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { Asteroid } from "../../model/Asteroid/Asteroid";
import {
  asteroidFrequency,
  generateAsteroidConfig,
} from "../../model/Asteroid/AsteroidConfig";
import { BaseObject } from "../../model/BaseObject/BaseObject";
import { EnemyGrid } from "../../model/EnemyGrid/EnemyGrid";
import { Player } from "../../model/Player/Player";
import { Star } from "../../model/Star/Star";
import { incrementScoreByEnemy } from "../../model/store/gameSlice";
import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";
import {
  initialExplosionSize,
  SpriteConstants,
} from "../../ui/Sprite/SpriteConfig";
import { GameControllerType } from "./types";

// класс игрового контроллера: включает в себя работу над игровыми объектами
export class GameController {
  private scene: Canvas;
  public player: Player;
  private frames = 0;
  private enemyGrids: EnemyGrid[] = [];
  private stars: Star[] = [];
  private explosions: BaseObject[] = [];
  private asteroids: Asteroid[] = [];
  private randomInterval: number;
  private sound: Sound;
  private end: () => void;

  constructor(props: GameControllerType) {
    this.scene = props.scene;
    this.sound = props.sound;
    this.end = props.end;
    this.player = this.initialPlayer;
    this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);

    this.generateStars();
  }

  private get initialPlayer() {
    return new Player({
      scene: this.scene,
      projectileSpeed: -baseSpeed,
      type: SpriteConstants.PLAYER,
      projectileType: SpriteConstants.PLAYER_PROJECTILE,
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

  private createAsteroid() {
    const config = generateAsteroidConfig(this.scene);
    return new Asteroid(config);
  }

  private generateEnemies() {
    if (this.frames % asteroidFrequency === 0 && this.frames !== 0) {
      this.asteroids.push(this.createAsteroid());
    }
    if (this.frames % this.randomInterval === 0 || !this.enemyGrids.length) {
      this.enemyGrids.push(this.createOneEnemyGrid());
      this.frames = 0;
      this.randomInterval = getRandomNumber(randomInterval, randomInterval * 2);
    }
    this.frames += 1;
  }

  private watchAsteroidsGone() {
    this.asteroids.forEach((asteroid, index) => {
      if (asteroid.position.y >= this.scene.height) {
        this.asteroids = this.asteroids.filter((item, idx) => idx !== index);
      } else {
        asteroid.update();
      }
    });
  }

  private createExplosion(position: elementCoords) {
    return new BaseObject({
      scene: this.scene,
      position: position,
      type: SpriteConstants.EXPLOSION,
      size: initialExplosionSize,
    });
  }

  private watchExplosionsDone() {
    this.explosions.forEach((explosion, index) => {
      if (explosion.currentSprite === explosion.maxIndexSprite) {
        this.explosions = this.explosions.filter((item, idx) => idx !== index);
      } else {
        explosion.update();
      }
    });
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
        this.explosions.push(this.createExplosion(collidingObject.position));
        collidingMethod();
        isAlive = false;
        return false;
      }
      return true;
    });

    return { isAlive, newProjectiles };
  }

  private checkAllCollisions() {
    this.checkCollision(this.asteroids, this.player, () => {
      this.end();
    });

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

        const hitEnemyByAsteroid = this.checkCollision(
          this.asteroids,
          enemy,
          () => {
            this.sound.playExplosion();
          }
        );

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

        return hitEnemy.isAlive && hitEnemyByAsteroid.isAlive;
      });
    });
  }

  public update() {
    this.watchStarsGone();
    this.watchExplosionsDone();
    this.player.update();
    this.checkAllCollisions();
    this.watchEnemiesGone();
    this.watchAsteroidsGone();
    this.generateEnemies();
  }

  public clearGameState() {
    this.player.clear();
    this.enemyGrids.forEach(grid => grid.clear());
    this.enemyGrids = [];
    this.explosions = [];
    this.asteroids = [];
    this.frames = 0;
  }
}
