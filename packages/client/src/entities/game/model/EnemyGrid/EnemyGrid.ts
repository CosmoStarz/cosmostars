import {
  baseSpeed,
  basicGridSpeed,
  EnemyGridSizes,
  InitialSizes,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { BaseObject } from "../BaseObject/BaseObject";
import { baseObjectProps } from "../BaseObject/types";
import { ShootingObject } from "../ShootingObject/ShootingObject";

export class EnemyGrid extends BaseObject {
  private columns: number;
  private rows: number;
  public enemies: ShootingObject[];

  constructor(props: baseObjectProps) {
    super(props);
    this.enemies = [];
    this.columns = getRandomNumber(
      EnemyGridSizes.MIN_COLUMNS,
      EnemyGridSizes.MAX_COLUMNS
    );
    this.rows = getRandomNumber(
      EnemyGridSizes.MIN_ROWS,
      EnemyGridSizes.MAX_ROWS
    );
    this.size = this.gridSize;
    this.position = this.gridPosition;
    this.velocity = this.gridVelocity;
    this.draw();
  }

  private get gridSize() {
    return {
      width: this.columns * InitialSizes[SpriteConstants.ENEMY_1].width,
      height: this.rows * InitialSizes[SpriteConstants.ENEMY_1].height,
    };
  }

  private get gridVelocity() {
    return {
      dx: basicGridSpeed,
      dy: 0,
    };
  }

  private get gridPosition() {
    return {
      x: 0,
      y: 0,
    };
  }

  protected draw() {
    for (let x = 0; x < this.columns; x++) {
      const type = getRandomNumber(
        SpriteConstants.ENEMY_1,
        SpriteConstants.UFO_2
      );
      const projectileType =
        type < SpriteConstants.UFO_1
          ? SpriteConstants.ENEMY_PROJECTILE
          : SpriteConstants.UFO_PROJECTILE;

      for (let y = 0; y < this.rows; y++) {
        this.enemies.push(
          new ShootingObject({
            scene: this.scene,
            position: {
              x: x * InitialSizes[SpriteConstants.ENEMY_1].width,
              y: y * InitialSizes[SpriteConstants.ENEMY_1].height,
            },
            size: InitialSizes[SpriteConstants.ENEMY_1],
            velocity: this.velocity,
            projectileSpeed: baseSpeed,
            type,
            projectileType,
          })
        );
      }
    }
  }

  public update() {
    this.enemies.forEach(item => {
      item.update();
    });
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
    this.watchWallsProtection();
  }

  private watchWallsProtection() {
    this.velocity.dy = 0;

    if (
      this.position.x + this.size.width >= this.scene.width ||
      this.position.x <= 0
    ) {
      this.velocity.dx = -this.velocity.dx;
      this.velocity.dy = InitialSizes[SpriteConstants.ENEMY_1].height;
    }
  }

  public clear() {
    this.enemies.forEach(enemy => enemy.clear());
  }
}
