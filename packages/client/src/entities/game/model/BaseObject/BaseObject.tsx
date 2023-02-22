import {
  GameImages,
  initialCoords,
  initialObjectSize,
  initialVelocity,
} from "@/shared/constants";

import { GameObjectColor } from "../../controller/types";
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
    this.image.src = `/src/assets/images/game-model-${this.src}.png`;
    this.position = baseProps.position ?? this.getInitialPosition;
    this.velocity = baseProps.velocity ?? this.getInitialVelocity;
    this.size = baseProps.size ?? initialObjectSize;
  }

  private get getInitialVelocity(): basicVelocity {
    return {
      dx: initialVelocity.dx,
      dy: initialVelocity.dy,
    };
  }

  private get getInitialPosition(): elementCoords {
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
