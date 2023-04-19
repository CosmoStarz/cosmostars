import { store } from "@/app/store";
import {
  InitialSizes,
  PlayerLives,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { BaseObject } from "../../model/BaseObject/BaseObject";
import { Player } from "../../model/Player/Player";
import { Canvas } from "../../ui/Canvas/Canvas";
import { PlayerState, SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { BonusControllerType } from "./types";
import { incrementLives } from "../../model/store";

export class BonusController {
  private scene: Canvas;
  private player: Player;
  public bonuses: BaseObject[] = [];

  constructor(props: BonusControllerType) {
    this.scene = props.scene;
    this.player = props.player;
  }

  private get randomBonusType() {
    const minBonusType = this.player.lives < PlayerLives.MAX ? SpriteConstants.BONUS_LIVE : SpriteConstants.BONUS_POWER;

    return getRandomNumber(minBonusType, SpriteConstants.BONUS_SHIELD);
  }

  private get randomBonus(): BaseObject {
    const type = this.randomBonusType;
    const size = InitialSizes[type];

    return new BaseObject({
      scene: this.scene,
      type,
      velocity: {
        dx: 0,
        dy: 2, //TODO
      },
      position: {
        x: getRandomNumber(0, this.scene.width - size.width),
        y: 0,
      },
      size,
    });
  }

  public createBonus() {
    this.bonuses.push(this.randomBonus);
  }

  public getBonusResult(bonus: BaseObject) {
    switch (bonus.type) {
      case SpriteConstants.BONUS_LIVE: {
        store.dispatch(incrementLives(PlayerLives.MIN));
        return false;
      }
      case SpriteConstants.BONUS_POWER: {
        this.player.updateBonusState(PlayerState.POWER);
        return false;
      }
      case SpriteConstants.BONUS_SHIELD: {
        this.player.updateBonusState(PlayerState.SHIELD);
        return false;
      }
    }
  }

  public watchBonusGone() {
    this.bonuses.forEach((bonus, index) => {
      if (bonus.position.y >= this.scene.height) {
        this.bonuses = this.bonuses.filter(
          (item, idx) => idx !== index
        );
      } else {
        bonus.update();
      }
    });
  }

  public clear() {
    this.bonuses = [];
  }
}
