import { projectileHeight, projectileWidth } from "@/shared/constants";

import { BaseObject } from "../BaseObject/BaseObject";
import { shootingObjectProps } from "./types";

export class ShootingObject extends BaseObject {
  public projectiles: BaseObject[];
  public projectileSpeed: number;

  constructor(props: shootingObjectProps) {
    super(props);
    this.projectiles = [];
    this.projectileSpeed = props.projectileSpeed;
  }

  public update() {
    super.update();
    this.watchProjectilesGone();
  }

  public shoot() {
    const projectile = new BaseObject({
      scene: this.scene,
      position: {
        x: this.position.x + this.size.width / 2 - projectileWidth / 2,
        y: this.position.y,
      },
      velocity: {
        dx: 0,
        dy: this.projectileSpeed,
      },
      size: {
        width: projectileWidth,
        height: projectileHeight,
      },
    });
    this.projectiles.push(projectile);
  }

  private watchProjectilesGone() {
    this.projectiles.forEach((proj, index) => {
      if (proj.position.y >= this.scene.height) {
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
