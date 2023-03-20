import { store } from "@/app/store";
import { Sound } from "@/entities/game/ui/Sound/Sound";
import { BaseGameColors, GameStatuses } from "@/shared/constants";

import { setGameStatus } from "../../model/store/gameSlice";
import { Canvas, initCanvas } from "../../ui/Canvas/Canvas";
import { GameListeners } from "../../ui/GameListeners/GameListeners";
import { GameController } from "../GameController/GameController";

// класс игрового цикла: включает в себя работу над состояниями игры
export class GameLoop {
  private canvas: HTMLCanvasElement;
  private scene: Canvas;
  private gameController: GameController;
  private gameActive: boolean;
  public sound: Sound;
  private gameListeners: GameListeners;

  constructor(canvasElement: HTMLCanvasElement, sound: Sound) {
    this.canvas = canvasElement;
    this.scene = this.mainScene;
    this.gameActive = false;
    this.sound = sound;
    this.gameController = this.initialGameController;
    this.gameListeners = this.initialGameMechanics;

    this.drawCanvas();
    this.sound.init();
    this.checkGameReload();
  }

  private get mainScene() {
    return initCanvas(this.canvas);
  }

  private get initialGameController() {
    return new GameController({
      scene: this.scene,
      sound: this.sound,
      end: () => this.loose(),
    });
  }

  private get initialGameMechanics() {
    return new GameListeners({
      canvas: this.canvas,
      sound: this.sound,
      player: this.gameController.player,
      pause: () => this.paused(),
    });
  }

  private get isActiveGameReload() {
    const activeStatuses = [GameStatuses.ACTIVE, GameStatuses.PAUSED];
    const status = store.getState().game.status;

    return activeStatuses.includes(status);
  }

  private checkGameReload() {
    if (this.isActiveGameReload) {
      store.dispatch(setGameStatus(GameStatuses.UPDATING));
    }
  }

  private stopped() {
    this.sound.stopSound();
    this.gameActive = false;
    this.gameListeners?.removeListeners();
  }

  public resume() {
    this.sound.startSound();
    store.dispatch(setGameStatus(GameStatuses.ACTIVE));
    this.gameActive = true;
    this.gameListeners.initListeners();
    this.update();
  }

  public start() {
    this.clearGameState();
    this.resume();
  }

  public loose() {
    this.stopped();
    this.sound.playGameover();
    store.dispatch(setGameStatus(GameStatuses.LOOSE));
  }

  public paused() {
    this.stopped();
    store.dispatch(setGameStatus(GameStatuses.PAUSED));
  }

  private drawCanvas() {
    this.scene.fillCanvas(BaseGameColors.BLACK);
  }

  private update() {
    if (this.gameActive) {
      requestAnimationFrame(this.update.bind(this));
      this.drawCanvas();
      this.gameController.update();
    }
  }

  public clearGameState() {
    this.gameController.clearGameState();
    this.gameListeners?.removeListeners();
  }
}
