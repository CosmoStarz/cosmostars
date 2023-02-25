import {
  baseSpeed,
  basicGridSpeed,
  EnemyGridSizes,
  GameImages,
  initialObjectSize,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

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
    this.size = this.getSize;
    this.position = this.initPosition;
    this.velocity = this.getVelocity;
    this.draw();
  }

  private get getSize() {
    return {
      width: this.columns * initialObjectSize.width,
      height: this.rows * initialObjectSize.height,
    };
  }

  private get getVelocity() {
    return {
      dx: basicGridSpeed,
      dy: 0,
    };
  }

  protected draw() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.enemies.push(
          new ShootingObject({
            scene: this.scene,
            position: {
              x: x * initialObjectSize.width,
              y: y * initialObjectSize.width,
            },
            velocity: this.velocity,
            projectileSpeed: baseSpeed,
            src: GameImages.ENEMY,
          })
        );
      }
    }
  }

  protected get initPosition() {
    return {
      x: 0,
      y: 0,
    };
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
      this.velocity.dy = initialObjectSize.height;
    }
  }
}
