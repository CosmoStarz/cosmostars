import { elementCoords } from "./types";

// вспомогательный класс для работы с канвасом
export class Canvas {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;

    constructor(canvasEL: HTMLCanvasElement) {
        this.canvas = canvasEL;
        this.context = this.canvas.getContext("2d");

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    get width () {
        return window.innerWidth;
    }

    get height () {
        return window.innerHeight;
    }

    public drawRect (color: string, position: elementCoords) {
        this.context!.fillStyle = color;
        this.context?.fillRect(0, 0, position.x, position.y);
    }

    public drawRound (color: string, position: elementCoords, radius: number) {
        this.context?.beginPath();
        this.context?.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this.context!.fillStyle = color;
        this.context?.fill();
        this.context?.closePath();
    }

    public fillCanvas (color: string) {
        const position = {
            x: this.width,
            y: this.height,
        };

        this.drawRect(color, position);
    }

    public clearCanvas () {
        this.context?.clearRect(0, 0, this.width, this.height);
    }
    
};
