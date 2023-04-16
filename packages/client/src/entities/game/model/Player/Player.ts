import { store } from "@/app/store";

import { PlayerSkins, PlayerSkinsTypes, PlayerState } from "../../ui/Sprite/SpriteConfig";
import { ShootingObject } from "../ShootingObject/ShootingObject";
import { shootingObjectProps } from "../ShootingObject/types";

export class Player extends ShootingObject {
  public bonusState = PlayerState.DEFAULT;

  constructor(props: shootingObjectProps) {
    super(props);
    this.position = this.startPosition;
  }

  private get startPosition() {
    const sceneRatio = 1.5;

    return {
      x: this.scene.width / 2,
      y: this.scene.height - this.size.width * sceneRatio,
    };
  }

  public get lives() {
    return store.getState().game.lives;
  }

  private updateSkin() {
    if (this.sprite) {
      this.sprite.image.src = Object.values(PlayerSkinsTypes).includes(
        this.lives
      )
        ? PlayerSkins[this.bonusState][this.lives as PlayerSkinsTypes]
        : PlayerSkins[this.bonusState][PlayerSkinsTypes.BASE];
    }
  }

  private watchWallsProtection() {
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x > this.scene.width - this.size.width) {
      this.position.x = this.scene.width - this.size.width;
    }
  }

  public updateBonusState(newBonusState: PlayerState) {
    this.bonusState = newBonusState;
    const powerTimeout = setTimeout(() => {
      this.bonusState = PlayerState.DEFAULT;
    }, 5000);
    clearTimeout(powerTimeout);
  }

  public update() {
    super.update();
    this.updateSkin();
    this.watchWallsProtection();
  }

  public clear() {
    super.clear();
    this.bonusState = PlayerState.DEFAULT;
    this.position = this.startPosition;
    this.velocity.dx = 0;
  }
}
