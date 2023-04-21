import { store } from "@/app/store";
import {
  BonusVelocity,
  InitialSizes,
  PlayerLives,
  PlayerState,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { BaseObject } from "../../model/BaseObject/BaseObject";
import { Player } from "../../model/Player/Player";
import { incrementLives, resetLives } from "../../model/store";
import { Canvas } from "../../ui/Canvas/Canvas";
import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { BonusControllerType } from "./types";

export class BonusController {
  private scene: Canvas;
  private player: Player;
  public bonuses: BaseObject[] = [];

  constructor(props: BonusControllerType) {
    this.scene = props.scene;
    this.player = props.player;
  }

  private get randomBonusType() {
    const minBonusType =
      this.player.lives < PlayerLives.MAX
        ? SpriteConstants.BONUS_LIFE
        : SpriteConstants.BONUS_POWER;

    return getRandomNumber(minBonusType, SpriteConstants.BONUS_SHIELD);
  }

  private get randomBonus(): BaseObject {
    const type = this.randomBonusType;
    const size = InitialSizes[SpriteConstants.BONUS_POWER];

    return new BaseObject({
      scene: this.scene,
      type,
      velocity: {
        dx: BonusVelocity.dx,
        dy: BonusVelocity.dy,
      },
      position: {
        x: getRandomNumber(0, this.scene.width - size.width),
        y: 0,
      },
      size,
    });
  }

  public createBonus() {
    if (
      this.player.bonusState === PlayerState.DEFAULT &&
      this.bonuses.length !== 1
    ) {
      this.bonuses.push(this.randomBonus);
    }
  }

  public getBonusResult(bonus: BaseObject) {
    switch (bonus.type) {
      case SpriteConstants.BONUS_LIFE: {
        return store.dispatch(incrementLives(PlayerLives.MIN));
      }
      case SpriteConstants.BONUS_POWER: {
        return this.player.updateBonusState(PlayerState.POWER);
      }
      case SpriteConstants.BONUS_SHIELD: {
        return this.player.updateBonusState(PlayerState.SHIELD);
      }
      case SpriteConstants.BONUS_HEALTH: {
        return store.dispatch(resetLives());
      }
      default:
        return;
    }
  }

  public watchBonusGone() {
    this.bonuses.forEach((bonus, index) => {
      if (bonus.position.y >= this.scene.height) {
        this.bonuses = this.bonuses.filter((item, idx) => idx !== index);
      } else {
        bonus.update();
      }
    });
  }

  public clear() {
    this.bonuses = [];
  }
}
