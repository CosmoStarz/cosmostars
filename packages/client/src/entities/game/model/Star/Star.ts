import { BaseGameColors } from "@/shared/constants";

import { BaseObject } from "../BaseObject/BaseObject";
import { StarProps } from "./types";

export class Star extends BaseObject {
  public radius: number;
  private color: BaseGameColors;

  constructor(props: StarProps) {
    super(props);
    this.radius = props.radius;
    this.color = props.color ?? BaseGameColors.WHITE;
  }

  protected draw() {
    this.scene.drawRound(this.color, this.position, this.radius);
  }

  public update() {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }
}
