import { InitialSizes } from "@/shared/constants";

import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { BaseObject } from "../BaseObject/BaseObject";
import { basicSize } from "../BaseObject/types";
import { shootingObjectProps } from "./types";

export class ShootingObject extends BaseObject {
  public projectiles: BaseObject[];
  public projectileSpeed: number;
  private projectileType: SpriteConstants;
  private projectileSize: basicSize;

  constructor(props: shootingObjectProps) {
    super(props);
    this.projectiles = [];
    this.projectileSpeed = props.projectileSpeed;
    this.projectileType = props.projectileType;
    this.projectileSize = InitialSizes[this.projectileType];
  }

  public update() {
    super.update();
    this.watchProjectilesGone();
  }

  public shoot() {
    const projectile = new BaseObject({
      scene: this.scene,
      position: {
        x:
          this.position.x + this.size.width / 2 - this.projectileSize.width / 2,
        y: this.position.y,
      },
      velocity: {
        dx: 0,
        dy: this.projectileSpeed,
      },
      size: this.projectileSize,
      type: this.projectileType,
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

  public clear() {
    this.projectiles = [];
  }
}
