import { ShootingObject } from "../ShootingObject/ShootingObject";
import { shootingObjectProps } from "../ShootingObject/types";

export class Player extends ShootingObject {
  constructor(props: shootingObjectProps) {
    super(props);
    this.position = this.initPosition;
  }

  protected get initPosition() {
    const sceneRatio = 1.5;

    return {
      x: this.scene.width / 2,
      y: this.scene.height - this.size.width * sceneRatio,
    };
  }

  public update() {
    super.update();
    this.watchWallsProtection();
  }

  private watchWallsProtection() {
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x > this.scene.width - this.size.width) {
      this.position.x = this.scene.width - this.size.width;
    }
  }
}
