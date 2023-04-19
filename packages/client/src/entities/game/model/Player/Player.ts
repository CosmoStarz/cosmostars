import { store } from "@/app/store";

import { PlayerSkins, PlayerSkinsTypes, PlayerState, SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { ShootingObject } from "../ShootingObject/ShootingObject";
import { shootingObjectProps } from "../ShootingObject/types";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { BonusTimeouts, PoweredShootingInterval } from "@/shared/constants";
import { Sprite } from "../../ui/Sprite/Sprite";

export class Player extends ShootingObject {
  public bonusState = PlayerState.DEFAULT;
  private bonusTimeout: TimeoutId | null = null;
  private shootInterval: TimeoutId | null = null;

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

  private clearBonusInterval() {
    if (this.shootInterval) {
      clearInterval(this.shootInterval);
    }
  }

  private clearBonusTimeout() {
    if (this.bonusTimeout) {
      clearTimeout(this.bonusTimeout);
    }
  }

  public updateBonusState(newBonusState: PlayerState.POWER | PlayerState.SHIELD) {
    this.bonusState = newBonusState;
    this.clearBonusTimeout();
    this.clearBonusInterval();

    if (this.bonusState === PlayerState.POWER) {
      this.shootInterval = setInterval(() => {
        this.shoot();
      }, PoweredShootingInterval);
    }

    this.bonusTimeout = setTimeout(() => {
      this.bonusState = PlayerState.DEFAULT;
      this.clearBonusInterval();
    }, BonusTimeouts[this.bonusState]);
  }

  private get shieldSprite() {
    const shieldSize = {
      height: this.size.height,
      width: this.size.height,
    };
    return new Sprite({
      canvas: this.scene,
      objectSize: shieldSize,
      spriteType: SpriteConstants.SHIELD,
      objectPosition: this.position,
    });
  }

  protected draw() {
    super.draw();
    if (this.bonusState === PlayerState.SHIELD) {
      const shieldPosition = {
        x: this.position.x - 7, //TODO
        y: this.position.y,
      };
      this.shieldSprite.draw(shieldPosition);
    }
  }

  public update() {
    this.draw();
    this.watchProjectilesGone();
    this.position.x += this.velocity.dx;
    this.updateSkin();
    this.watchWallsProtection();
  }

  public clear() {
    super.clear();
    this.clearBonusInterval();
    this.clearBonusTimeout();
    this.bonusState = PlayerState.DEFAULT;
    this.position = this.startPosition;
    this.velocity.dx = 0;
  }
}
