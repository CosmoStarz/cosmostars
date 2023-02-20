import {
  BaseGameColors,
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
  public color: GameObjectColor;

  constructor(baseProps: baseObjectProps) {
    this.scene = baseProps.scene;
    this.velocity = baseProps.velocity ?? this.getInitialVelocity;
    this.position = baseProps.position ?? this.getInitialPosition;
    this.size = baseProps.size ?? initialObjectSize;
    this.color = baseProps.color ?? BaseGameColors.RED;
  }

  private get getInitialVelocity(): basicVelocity {
    return {
      dx: initialVelocity.dx,
      dy: initialVelocity.dy,
    }
  }

  private get getInitialPosition(): elementCoords {
    return {
      x: initialCoords.x,
      y: initialCoords.y,
    }
  }

  protected draw(): void {
    // TODO: вместо прямоугольника рисовать на канвасе картинку (COS-53)
    this.scene.drawRect(this.color, this.position, this.size);
  }

  public update(): void {
    this.draw();
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }
}
