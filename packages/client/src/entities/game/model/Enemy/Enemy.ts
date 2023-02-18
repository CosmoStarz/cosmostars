import {
  BaseGameColors,
  baseSpeed,
  initialCoords,
  initialVelocity,
} from "@/shared/constants";

import { GameObjectColor } from "../../controller/types";
import { elementCoords } from "../../ui/Canvas/types";
import { BaseObject } from "../BaseObject/BaseObject";
import { basicVelocity } from "../BaseObject/types";
import { Projectile } from "../Projectile/Projectile";
import { enemyProps } from "./types";

export class Enemy extends BaseObject {
  private color: GameObjectColor;
  public projectiles: Projectile[];
  public position: elementCoords;
  public velocity: basicVelocity;

  constructor(props: enemyProps) {
    super(props);
    this.color = props.color;
    this.position = props.position ?? initialCoords;
    this.velocity = props.velocity ?? initialVelocity;
    this.projectiles = [];
  }

  protected draw() {
    this.scene.drawRect(this.color, this.position, this.size);
  }

  public update() {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
    this.watchProjectilesGone();
  }

  public shoot() {
    const projectile = new Projectile({
      color: BaseGameColors.YELLOW,
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
