import {
  GameImages,
  initialCoords,
  initialObjectSize,
  initialVelocity,
} from "@/shared/constants";

import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";
import { baseObjectProps, basicSize, basicVelocity } from "./types";

// родительский класс для сущностей-объектов в игре
export class BaseObject {
  protected scene: Canvas;
  public velocity: basicVelocity;
  public position: elementCoords;
  public size: basicSize;
  public src: string;
  private image: HTMLImageElement;

  constructor(baseProps: baseObjectProps) {
    this.scene = baseProps.scene;
    this.src = baseProps.src ? baseProps.src : GameImages.PROJECTILE;
    this.image = new Image();
    this.image.src = this.src;
    this.velocity = baseProps.velocity ?? this.initialVelocity;
    this.position = baseProps.position ?? this.initialPosition;
    this.size = baseProps.size ?? initialObjectSize;
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

  protected draw(): void {
    this.scene.pasteImage(this.image, this.position, this.size);
  }

  public update(): void {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }
}
