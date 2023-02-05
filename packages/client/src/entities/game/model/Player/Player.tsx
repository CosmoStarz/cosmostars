import { baseSpeed } from "../../../../shared/constants";
import { BaseObject } from "../BaseObject/BaseObject";
import { Projectile } from "../Projectile/Projectile";
import { playerProps } from "./types";

export class Player extends BaseObject {
  // TODO: реализовать передачу картинки (скорее всего отдельным классом)
  private color: string;
  public projectiles: Projectile[];

  constructor(props: playerProps) {
    super(props);
    this.color = props.color;
    this.position = this.initPosition;
    this.projectiles = [];
  }

  protected get initPosition() {
    return {
      x: this.scene.width / 2,
      y: this.scene.height - this.size.width * 1.5,
    };
  }

  protected draw() {
    this.watchWallsProtection();
    this.scene.drawRect(this.color, this.position, this.size);
  }

  public update() {
    this.draw();
    this.position.x += this.velocity.dx;
    this.watchProjectilesGone();
  }

  public shoot() {
    const projectile = new Projectile({
      color: "yellow",
      scene: this.scene,
      position: {
        x: this.position.x + this.size.width / 2,
        y: this.position.y,
      },
      velocity: {
        dx: 0,
        dy: -baseSpeed,
      },
    });
    this.projectiles.push(projectile);
  }

  private watchWallsProtection() {
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x > this.scene.width - this.size.width) {
      this.position.x = this.scene.width - this.size.width;
    }
  }

  private watchProjectilesGone() {
    this.projectiles.forEach((proj, index) => {
      if (proj.position.y + proj.size.width <= 0) {
        setTimeout(() => {
          this.projectiles.splice(index, 1);
        }, 0);
      } else {
        proj.update();
      }
    });
  }
}
