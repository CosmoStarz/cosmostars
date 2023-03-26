import { SpinTypes } from "../../ui/Sprite/SpriteConfig";
import { BaseObject } from "../BaseObject/BaseObject";
import { basicVelocity } from "../BaseObject/types";
import { AsteroidAngles, AsteroidProps } from "./types";

export class Asteroid extends BaseObject {
  private angle: AsteroidAngles;
  private rotateAngle: number;
  private rotationSpeed: number;
  private spin: SpinTypes;

  constructor(props: AsteroidProps) {
    super(props);
    this.angle = props.angle;
    this.spin = props.spin;
    this.rotationSpeed = props.rotationSpeed ?? 1;
    this.velocity = this.vectorVelocity;
    this.rotateAngle = 0;
  }

  private get radius(): number {
    return this.size.width / 2;
  }

  private get radians(): number {
    return (this.angle * Math.PI) / 180;
  }

  private get vectorVelocity(): basicVelocity {
    return {
      dx: Math.cos(this.radians) * this.velocity.dx,
      dy: Math.sin(this.radians) * this.velocity.dy,
    };
  }

  protected draw() {
    const rotationPosition = {
      x: -this.radius,
      y: -this.radius,
    };
    this.sprite?.drawRotate(rotationPosition, this.rotateAngle, this.spin);
  }

  public update() {
    this.draw();
    this.rotateAngle += this.rotationSpeed;
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }
}
