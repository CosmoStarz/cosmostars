import { BaseGameColors, baseSpeed } from "../../../../shared/constants";
import { GameObjectColor } from "../../controller/types";
import { BaseObject } from "../BaseObject/BaseObject";
import { Projectile } from "../Projectile/Projectile";
import { enemyProps } from "./types";

export class Enemy extends BaseObject {
  private color: GameObjectColor;
  public projectiles: Projectile[];

  constructor(props: enemyProps) {
    super(props);
    this.scene = props.scene;
    this.color = props.color;
    this.position = props.position;
    this.projectiles = [];
  }

  protected draw() {
    this.watchWallsProtection();
    this.scene.drawRect(this.color, this.position, this.size);
  }

  public update() {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }

  public shoot() {
    const projectile = new Projectile({
      color: BaseGameColors.RED,
      scene: this.scene,
      position: {
        x: this.position.x + this.size.width / 2,
        y: this.position.y,
      },
      velocity: {
        dx: 0,
        dy: baseSpeed,
      },
    });
    this.projectiles.push(projectile);
  }

  private watchWallsProtection() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.color = BaseGameColors.RED;
    }

    if (this.position.x > this.scene.width - this.size.width) {
      this.position.x = this.scene.width - this.size.width;
      this.color = BaseGameColors.BLUE;
    }
  }

  private watchProjectilesGone() {
    this.projectiles.forEach((proj, index) => {
      if (proj.position.y + proj.size.width <= 0) {
        setTimeout(() => {
          this.projectiles = this.projectiles.filter(
            (item, idx) => idx !== index
          );
        }, 0);
      } else {
        proj.update();
      }
    });
  }
}
