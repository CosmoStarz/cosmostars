import { projectileRadius } from "../../../../shared/constants";
import { BaseObject } from "../BaseObject/BaseObject";
import { projectileProps } from "./types";

export class Projectile extends BaseObject {
  private color: string;

  constructor(props: projectileProps) {
    super(props);
    this.color = props.color;
  }

  protected draw() {
    this.scene.drawRound(this.color, this.position, projectileRadius);
  }

  public update() {
    this.draw();
    this.position.y += this.velocity.dy;
  }
}
