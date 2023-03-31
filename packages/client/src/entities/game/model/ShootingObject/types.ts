import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { baseObjectProps } from "../BaseObject/types";

export type shootingObjectProps = {
  projectileSpeed: number;
  projectileType: SpriteConstants;
} & baseObjectProps;
