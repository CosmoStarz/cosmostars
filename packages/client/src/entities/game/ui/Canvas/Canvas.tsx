import { initialCoords } from "../../../../shared/constants";
import { GameObjectColor } from "../../controller/types";
import { basicSize } from "../../model/BaseObject/types";
import { elementCoords } from "./types";

// вспомогательный класс для работы с канвасом
export class Canvas {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext("2d")!;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  public drawRect(
    color: GameObjectColor,
    position: elementCoords,
    size: basicSize
  ) {
    this.context!.fillStyle = color;
    this.context?.fillRect(position.x, position.y, size.width, size.height);
  }

  public drawRound(
    color: GameObjectColor,
    position: elementCoords,
    radius: number
  ) {
    this.context.beginPath();
    this.context.arc(position.x, position.y, radius, 0, Math.PI * 2);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  public pasteImage(
    img: HTMLImageElement,
    position: elementCoords,
    size: basicSize
  ) {
    this.context.drawImage(
      img,
      position.x,
      position.y,
      size.width,
      size.height
    );
  }

  public fillCanvas(color: GameObjectColor) {
    const size = {
      width: this.width,
      height: this.height,
    };

    this.drawRect(color, initialCoords, size);
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}

export const initCanvas = (canvas: HTMLCanvasElement) => new Canvas(canvas);
