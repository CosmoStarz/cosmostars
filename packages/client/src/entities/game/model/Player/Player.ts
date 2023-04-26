import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

import { store } from "@/app/store";
import {
  BonusTimeouts,
  PlayerState,
  PoweredShootingInterval,
} from "@/shared/constants";

import { Sprite } from "../../ui/Sprite/Sprite";
import {
  PlayerSkins,
  PlayerSkinsTypes,
  SpriteConstants,
} from "../../ui/Sprite/SpriteConfig";
import { ShootingObject } from "../ShootingObject/ShootingObject";
import { shootingObjectProps } from "../ShootingObject/types";

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

  public get shieldSize() {
    const shieldRoundSize = Math.max(this.size.height, this.size.width);

    return {
      width: shieldRoundSize,
      height: shieldRoundSize,
    };
  }

  private calculateShieldPosition(
    objectSize: number,
    shieldSize: number,
    objectPosition: number
  ) {
    if (objectSize !== shieldSize) {
      const deviation = Math.round((shieldSize - objectSize) / 2);
      return objectPosition - deviation;
    }

    return objectPosition;
  }

  public get shieldPosition() {
    return {
      x: this.calculateShieldPosition(
        this.size.width,
        this.shieldSize.width,
        this.position.x
      ),
      y: this.calculateShieldPosition(
        this.size.height,
        this.shieldSize.height,
        this.position.y
      ),
    };
  }

  private updateSkin() {
    if (this.sprite) {
      this.sprite.image.src = Object.values(PlayerSkinsTypes).includes(
        this.lives
      )
        ? PlayerSkins[this.lives as PlayerSkinsTypes]
        : PlayerSkins[PlayerSkinsTypes.BASE];
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

  public updateBonusState(
    newBonusState: PlayerState.POWER | PlayerState.SHIELD
  ) {
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
    return new Sprite({
      canvas: this.scene,
      objectSize: this.shieldSize,
      spriteType: SpriteConstants.SHIELD,
      objectPosition: this.position,
    });
  }

  protected draw() {
    super.draw();
    if (this.bonusState === PlayerState.SHIELD) {
      this.shieldSprite.draw(this.shieldPosition);
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
