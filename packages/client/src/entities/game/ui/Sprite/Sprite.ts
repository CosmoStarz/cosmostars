import { basicSize } from "../../model/BaseObject/types";
import { Canvas } from "../Canvas/Canvas";
import { elementCoords } from "../Canvas/types";
import { SpinTypes, SpriteConfig, SpriteSpeedLimit } from "./SpriteConfig";
import { SpriteConfigType, SpriteType } from "./types";

// класс для отрисовки анимированной картинки
export class Sprite {
  private canvas: Canvas;
  private image: HTMLImageElement;
  private objectSize: basicSize;
  private objectPosition: elementCoords;
  private spriteSize: basicSize;
  private isAnimated: boolean;
  private frameConfig: SpriteConfigType;
  public numberOfFrames: number;
  public currentFrameIndex = 0;
  private speedFrame: number = SpriteSpeedLimit;
  private updateCount = 0;
  private ratio: number;

  constructor(props: SpriteType) {
    this.canvas = props.canvas;
    this.objectSize = props.objectSize;
    this.objectPosition = props.objectPosition;
    this.frameConfig = SpriteConfig[props.spriteType];
    this.image = new Image();
    this.image.src = this.frameConfig.src;
    this.numberOfFrames = this.frameConfig.frames ?? 1;
    this.ratio = this.frameConfig.ratio ?? 1;
    this.spriteSize = {
      width: this.objectSize.width * this.ratio,
      height: this.objectSize.height * this.ratio,
    };
    this.isAnimated = this.numberOfFrames > 1;
  }

  draw(position: elementCoords) {
    const imagePosition = {
      x: this.currentFrameIndex * this.spriteSize.width,
      y: 0,
    };

    const partSize = this.isAnimated ? this.spriteSize : this.objectSize;

    this.canvas.pasteImage(
      this.image,
      imagePosition,
      this.spriteSize,
      position,
      partSize
    );

    if (this.isAnimated) {
      this.update();
    }
  }

  drawRotate(position: elementCoords, angle: number, spin: SpinTypes) {
    this.canvas.context.save();
    this.canvas.context.translate(
      this.objectPosition.x - position.x,
      this.objectPosition.y - position.y
    );
    this.canvas.context.rotate((angle * spin * Math.PI) / 360);
    this.draw(position);
    this.canvas.context.restore();
  }

  update() {
    this.updateCount++;
    if (this.updateCount > this.speedFrame) {
      this.updateCount = 0;
      if (this.currentFrameIndex < this.numberOfFrames - 1) {
        this.currentFrameIndex++;
      } else {
        this.currentFrameIndex = 0;
      }
    }
  }
}
