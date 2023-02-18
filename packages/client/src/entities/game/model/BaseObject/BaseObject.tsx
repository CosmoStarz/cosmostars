import {
  initialCoords,
  initialObjectSize,
  initialVelocity,
} from "@/shared/constants";
import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";
import { baseObjectProps, basicSize, basicVelocity } from "./types";

// абстрактный класс для сущностей-объектов в игре
export abstract class BaseObject {
  protected scene: Canvas;
  public velocity: basicVelocity;
  public position: elementCoords;
  public size: basicSize;

  constructor(baseProps: baseObjectProps) {
    this.scene = baseProps.scene;
    this.velocity = baseProps.velocity ?? initialVelocity;
    this.position = baseProps.position ?? initialCoords;
    this.size = baseProps.size ?? initialObjectSize;
  }

  protected draw(): void {
    throw new Error("Draw was not impemented!");
  }

  public update(): void {
    throw new Error("Update was not impemented!");
  }
}
