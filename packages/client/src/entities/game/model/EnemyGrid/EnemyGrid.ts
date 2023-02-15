import {
  BaseGameColors,
  basicGridSpeed,
  initialCoords,
  initialObjectSize,
  maxColumns,
  maxRows,
  minColumns,
  minRows,
} from "../../../../shared/constants";
import { BaseObject } from "../BaseObject/BaseObject";
import { baseObjectProps } from "../BaseObject/types";
import { Enemy } from "../Enemy/Enemy";

export class EnemyGrid extends BaseObject {
  private columns: number;
  private rows: number;
  public enemies: Enemy[];

  constructor(props: baseObjectProps) {
    super(props);
    this.enemies = [];
    this.columns = Math.floor(Math.random() * maxColumns + minColumns);
    this.rows = Math.floor(Math.random() * maxRows + minRows);
    this.size = {
      width: this.columns * initialObjectSize.width,
      height: this.rows * initialObjectSize.height,
    };
    this.position = initialCoords;
    this.velocity = {
      dx: basicGridSpeed,
      dy: 0,
    };
    this.draw();
  }

  draw() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.enemies.push(
          new Enemy({
            color: BaseGameColors.YELLOW,
            scene: this.scene,
            position: {
              x: x * initialObjectSize.width,
              y: y * initialObjectSize.width,
            },
            velocity: this.velocity,
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
      this.velocity.dy = initialObjectSize.height;
    }
  }
}
