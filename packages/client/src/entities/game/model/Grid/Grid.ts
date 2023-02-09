import { BaseGameColors } from "../../../../shared/constants";
import { BaseObject } from "../BaseObject/BaseObject";
import { baseObjectProps } from "../BaseObject/types";
import { Enemy } from "../Enemy/Enemy";

export class Grid extends BaseObject {
  private columns: number;
  private rows: number;
  private width: number;
  private enemies: Enemy[];

  constructor(props: baseObjectProps) {
    super(props);
    this.position = this.initPosition;
    this.velocity = props.velocity;
    this.enemies = [];
    this.columns = Math.floor(Math.random() * 10 + 5);
    this.rows = Math.floor(Math.random() * 5 + 2);
    this.width = this.columns * 30;

    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.enemies.push(
          new Enemy({
            scene: props.scene,
            color: BaseGameColors.YELLOW,
            position: {
              x: x * 30,
              y: y * 30,
            },
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

  protected draw() {
    this.enemies.forEach(enemy => enemy.update({ velocity: this.velocity }));
  }

  public update() {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
    // this.velocity.dy = 0;

    if (this.position.x + this.width >= this.scene.width) {
      this.velocity.dx = -5;
      // this.velocity.dy = +30;
    }

    if (this.position.x <= 0) {
      this.velocity.dx = 5;
      // this.velocity.dy = -30;
    }
  }
}
