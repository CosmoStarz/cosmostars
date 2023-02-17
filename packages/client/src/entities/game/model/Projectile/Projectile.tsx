import { projectileRadius } from "../../../../shared/constants";
import { GameObjectColor } from "../../controller/types";
import { BaseObject } from "../BaseObject/BaseObject";
import { projectileProps } from "./types";

export class Projectile extends BaseObject {
  private color: GameObjectColor;

  constructor(props: projectileProps) {
    super(props);
    this.color = props.color;
    this.size = this.getSize;
  }

  get getSize() {
    return {
      width: projectileRadius * 2,
      height: projectileRadius * 2,
    };
  }

  protected draw() {
    this.scene.drawRound(this.color, this.position, projectileRadius);
  }

  public update() {
    this.draw();
    this.position.y += this.velocity.dy;
  }
}
