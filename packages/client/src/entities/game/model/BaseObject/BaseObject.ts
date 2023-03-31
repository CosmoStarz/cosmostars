import {
  initialCoords,
  initialObjectSize,
  initialVelocity,
} from "@/shared/constants";

import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";
import { Sprite } from "../../ui/Sprite/Sprite";
import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { baseObjectProps, basicSize, basicVelocity } from "./types";

// родительский класс для сущностей-объектов в игре
export class BaseObject {
  protected scene: Canvas;
  public velocity: basicVelocity;
  public position: elementCoords;
  public size: basicSize;
  private type: SpriteConstants | undefined;
  public sprite: Sprite | undefined;

  constructor(baseProps: baseObjectProps) {
    this.scene = baseProps.scene;
    this.type = baseProps.type;
    this.velocity = baseProps.velocity ?? this.initialVelocity;
    this.position = baseProps.position ?? this.initialPosition;
    this.size = baseProps.size ?? initialObjectSize;

    this.sprite = this.type ? this.generateSprite(this.type) : undefined;
  }

  private get initialVelocity(): basicVelocity {
    return {
      dx: initialVelocity.dx,
      dy: initialVelocity.dy,
    };
  }

  private get initialPosition(): elementCoords {
    return {
      x: initialCoords.x,
      y: initialCoords.y,
    };
  }

  public get currentSprite(): number | undefined {
    return this.sprite?.currentFrameIndex;
  }

  public get maxIndexSprite(): number | undefined {
    if (!this.sprite) return;

    return this.sprite.numberOfFrames - 1;
  }

  private generateSprite(type: SpriteConstants): Sprite {
    return new Sprite({
      canvas: this.scene,
      objectSize: this.size,
      spriteType: type,
      objectPosition: this.position,
    });
  }

  protected draw(): void {
    if (this.sprite) {
      this.sprite.draw({ x: this.position.x, y: this.position.y });
    }
  }

  public update(): void {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }
}
